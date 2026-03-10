using AuthAPI.Data;
using AuthAPI.Data.AuthAPI.Data;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Xunit;

namespace AuthAPI.Tests.Integration
{
    public class UserControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;
        private readonly WebApplicationFactory<Program> _factory;

        public UserControllerTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    // Remove real DB
                    var descriptor = services.SingleOrDefault(
                        d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));
                    if (descriptor != null) services.Remove(descriptor);

                    // Add in-memory DB with shared name
                    services.AddDbContext<AppDbContext>(options =>
                        options.UseInMemoryDatabase("IntegrationTestDb_User"));
                });
            });

            _client = _factory.CreateClient();
        }

        // Helper — register and return JWT token
        private async Task<string> RegisterAndGetToken(string email = "profile@integration.com")
        {
            var payload = new
            {
                firstName = "Profile",
                lastName = "User",
                email,
                password = "Password123"
            };

            var response = await _client.PostAsJsonAsync("/api/auth/register", payload);
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();
            return body.GetProperty("token").GetString()!;
        }

        // ─── GET PROFILE ──────────────────────────────────────────────────────────

        [Fact]
        public async Task GetProfile_WithValidToken_Returns200WithUserData()
        {
            // Arrange
            var token = await RegisterAndGetToken("validtoken@integration.com");
            _client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);

            // Act
            var response = await _client.GetAsync("/api/user/profile");
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.True(body.TryGetProperty("firstName", out var firstName));
            Assert.Equal("Profile", firstName.GetString());
            Assert.True(body.TryGetProperty("email", out var email));
            Assert.Equal("validtoken@integration.com", email.GetString());
        }

        [Fact]
        public async Task GetProfile_WithoutToken_Returns401()
        {
            // Arrange — no auth header
            _client.DefaultRequestHeaders.Authorization = null;

            // Act
            var response = await _client.GetAsync("/api/user/profile");

            // Assert
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task GetProfile_WithInvalidToken_Returns401()
        {
            // Arrange
            _client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", "this.is.not.a.valid.token");

            // Act
            var response = await _client.GetAsync("/api/user/profile");

            // Assert
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task GetProfile_ReturnsCorrectFields()
        {
            // Arrange
            var token = await RegisterAndGetToken("fields@integration.com");
            _client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);

            // Act
            var response = await _client.GetAsync("/api/user/profile");
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.True(body.TryGetProperty("firstName", out _));
            Assert.True(body.TryGetProperty("lastName", out _));
            Assert.True(body.TryGetProperty("email", out _));
            Assert.True(body.TryGetProperty("createdAt", out _));
        }
    }
}