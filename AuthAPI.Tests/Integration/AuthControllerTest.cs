using AuthAPI.Data;
using AuthAPI.Data.AuthAPI.Data;
using AuthAPI.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Xunit;

namespace AuthAPI.Tests.Integration
{
    public class AuthControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;
        private readonly WebApplicationFactory<Program> _factory;

        public AuthControllerTests(WebApplicationFactory<Program> factory)
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
                        options.UseInMemoryDatabase("IntegrationTestDb_Auth"));
                });
            });

            _client = _factory.CreateClient();
        }


        // ------------------------------------------- REGISTER USER 200  ----------------------------------------
        [Fact]
        public async Task Register_ValidUser_Returns200WithToken()
        {
            // Arrange
            var payload = new
            {
                firstName = "John",
                lastName = "Doe",
                email = "john@integration.com",
                password = "Password123"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/auth/register", payload);
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.True(body.TryGetProperty("token", out var token));
            Assert.False(string.IsNullOrEmpty(token.GetString()));
        }

        // ------------------------------------ REGISTER DUPLICATE EMAIL 500  ------------------------------------
        [Fact]
        public async Task Register_DuplicateEmail_Returns500WithMessage()
        {
            // Arrange — register first user
            var payload = new
            {
                firstName = "Jane",
                lastName = "Doe",
                email = "duplicate@integration.com",
                password = "Password123"
            };

            await _client.PostAsJsonAsync("/api/auth/register", payload);

            // Act — register same email again
            var response = await _client.PostAsJsonAsync("/api/auth/register", payload);
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();

            // Assert
            Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
            Assert.True(body.TryGetProperty("message", out var message));
            Assert.Equal("Email already exists", message.GetString());
        }


        // ------------------------------- REGISTER MISSING FIELDS  400  -----------------------------
        [Fact]
        public async Task Register_MissingFields_Returns400()
        {
            // Arrange — no email
            var payload = new
            {
                firstName = "John",
                lastName = "Doe",
                password = "Password123"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/auth/register", payload);

            // Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }


        // ------------------------------------ LOGIN VALID 200  ------------------------------------
        [Fact]
        public async Task Login_ValidCredentials_Returns200WithToken()
        {
            // Arrange — register first
            var registerPayload = new
            {
                firstName = "Login",
                lastName = "User",
                email = "logintest@integration.com",
                password = "Password123"
            };
            await _client.PostAsJsonAsync("/api/auth/register", registerPayload);

            var loginPayload = new
            {
                email = "logintest@integration.com",
                password = "Password123"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/auth/login", loginPayload);
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.True(body.TryGetProperty("token", out var token));
            Assert.False(string.IsNullOrEmpty(token.GetString()));
        }


        // ------------------------------------ LOGIN WRONG PASSWORD 500  ------------------------------------
        [Fact]
        public async Task Login_WrongPassword_Returns500WithMessage()
        {
            // Arrange — register first
            var registerPayload = new
            {
                firstName = "Wrong",
                lastName = "Pass",
                email = "wrongpass@integration.com",
                password = "Password123"
            };
            await _client.PostAsJsonAsync("/api/auth/register", registerPayload);

            var loginPayload = new
            {
                email = "wrongpass@integration.com",
                password = "WrongPassword"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/auth/login", loginPayload);
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();

            // Assert
            Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
            Assert.True(body.TryGetProperty("message", out var message));
            Assert.Equal("Invalid email or password", message.GetString());
        }

        
        // ------------------------------------ LOGIN EMAIL NOT FOUND 500  ------------------------------------
        [Fact]
        public async Task Login_EmailNotFound_Returns500WithMessage()
        {
            // Arrange
            var loginPayload = new
            {
                email = "notfound@integration.com",
                password = "Password123"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/auth/login", loginPayload);
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();

            // Assert
            Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
            Assert.True(body.TryGetProperty("message", out var message));
            Assert.Equal("Invalid email or password", message.GetString());
        }
    }
} 