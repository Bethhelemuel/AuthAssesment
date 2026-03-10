using System.IdentityModel.Tokens.Jwt;
using AuthAPI.Models;
using AuthAPI.Service;
using Microsoft.Extensions.Configuration;

namespace AuthAPI.Tests.Unit
{
    public class JwtServiceTests
    {
        private readonly JwtService _jwtService;

        public JwtServiceTests()
        {
            // Mock IConfiguration with in-memory settings
            var config = new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string>
                {
                    { "JwtSettings:SecretKey", "74328HJSFK3432JHK3J2KH42J3KH4KJ23H4KJ23H4KJHKJK" },
                    { "JwtSettings:Issuer", "TestIssuer" },
                    { "JwtSettings:Audience", "TestAudience" },
                    { "JwtSettings:ExpiryDays", "1" }
                })
                .Build();

            _jwtService = new JwtService(config);
        }


        // ------------------------------------ GENERATE TOKEN FOR VALID USER  ------------------------------------
        [Fact]
        public void GenerateToken_ValidUser_ReturnsToken()
        {
            // Arrange
            var user = new User
            {
                Id = 1,
                FirstName = "John",
                LastName = "Doe",
                Email = "john@test.com",
                PasswordHash = "hashedpassword",
                CreatedAt = DateTime.UtcNow
            };

            // Act
            var token = _jwtService.GenerateToken(user);

            // Assert
            Assert.NotNull(token);
            Assert.NotEmpty(token);
        }


        // ------------------------------------ TOKEN HAS CORRECT EMAIL  ------------------------------------
        [Fact]
        public void GenerateToken_ContainsCorrectEmail()
        {
            // Arrange
            var user = new User
            {
                Id = 1,
                FirstName = "John",
                LastName = "Doe",
                Email = "john@test.com",
                PasswordHash = "hashedpassword",
                CreatedAt = DateTime.UtcNow
            };

            // Act
            var token = _jwtService.GenerateToken(user);

            
            var handler = new JwtSecurityTokenHandler();
            var decoded = handler.ReadJwtToken(token);
            var emailClaim = decoded.Claims
                .FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;

            // Assert
            Assert.Equal("john@test.com", emailClaim);
        }

        // ------------------------------------ TOKEN HAS CORRECT USER ID  ------------------------------------
        [Fact]
        public void GenerateToken_ContainsCorrectUserId()
        {
            // Arrange
            var user = new User
            {
                Id = 1,
                FirstName = "John",
                LastName = "Doe",
                Email = "john@test.com",
                PasswordHash = "hashedpassword",
                CreatedAt = DateTime.UtcNow
            };

            // Act
            var token = _jwtService.GenerateToken(user);

         
            var handler = new JwtSecurityTokenHandler();
            var decoded = handler.ReadJwtToken(token);
            var idClaim = decoded.Claims
    .FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;

            // Assert
            Assert.Equal("1", idClaim);
        }


        // ---------------------------------- GENERATED TOKEN IS NOT EXPIRED  ----------------------------------
        [Fact]
        public void GenerateToken_TokenIsNotExpired()
        {
            // Arrange
            var user = new User
            {
                Id = 1,
                FirstName = "John",
                LastName = "Doe",
                Email = "john@test.com",
                PasswordHash = "hashedpassword",
                CreatedAt = DateTime.UtcNow
            };

            // Act
            var token = _jwtService.GenerateToken(user);

            
            var handler = new JwtSecurityTokenHandler();
            var decoded = handler.ReadJwtToken(token);

            // Assert
            Assert.True(decoded.ValidTo > DateTime.UtcNow);
        }
    }
}