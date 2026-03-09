using AuthAPI.Data;
using AuthAPI.Data.AuthAPI.Data;
using AuthAPI.DTOs;
using AuthAPI.Interface;
using AuthAPI.Models;
using AuthAPI.Service;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace AuthAPI.Tests.Unit
{
    public class AuthServiceTests
    {
        private readonly Mock<IJwtService> _jwtServiceMock;
        private readonly AppDbContext _context;
        private readonly AuthService _authService;

        public AuthServiceTests()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);
            _jwtServiceMock = new Mock<IJwtService>();
            _authService = new AuthService(_context, _jwtServiceMock.Object);
        }

        // ─── REGISTER ─────────────────────────────────────────────

        [Fact]
        public async Task Register_ValidUser_ReturnsToken()
        {
            // Arrange
            var dto = new RegisterDTO
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "john@test.com",
                Password = "Password123"
            };

            _jwtServiceMock
                .Setup(j => j.GenerateToken(It.IsAny<User>()))
                .Returns("fake-jwt-token");

            // Act
            var token = await _authService.Register(dto);

            // Assert
            Assert.Equal("fake-jwt-token", token);
        }

        [Fact]
        public async Task Register_SavesUserToDatabase()
        {
            // Arrange
            var dto = new RegisterDTO
            {
                FirstName = "Jane",
                LastName = "Doe",
                Email = "jane@test.com",
                Password = "Password123"
            };

            _jwtServiceMock
                .Setup(j => j.GenerateToken(It.IsAny<User>()))
                .Returns("fake-jwt-token");

            // Act
            await _authService.Register(dto);

            // Assert
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == "jane@test.com");
            Assert.NotNull(user);
            Assert.Equal("Jane", user.FirstName);
        }

        [Fact]
        public async Task Register_DuplicateEmail_ThrowsException()
        {
            // Arrange
            _context.Users.Add(new User
            {
                FirstName = "Existing",
                LastName = "User",
                Email = "duplicate@test.com",
                PasswordHash = "hashedpassword",
                CreatedAt = DateTime.UtcNow
            });
            await _context.SaveChangesAsync();

            var dto = new RegisterDTO
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "duplicate@test.com",
                Password = "Password123"
            };

            // Act & Assert
            var ex = await Assert.ThrowsAsync<Exception>(
                () => _authService.Register(dto));
            Assert.Equal("Email already exists", ex.Message);
        }

        [Fact]
        public async Task Register_PasswordIsHashed()
        {
            // Arrange
            var dto = new RegisterDTO
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "hash@test.com",
                Password = "Password123"
            };

            _jwtServiceMock
                .Setup(j => j.GenerateToken(It.IsAny<User>()))
                .Returns("fake-jwt-token");

            // Act
            await _authService.Register(dto);

            // Assert
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == "hash@test.com");
            Assert.NotNull(user);
            Assert.NotEqual("Password123", user.PasswordHash);
            Assert.True(BCrypt.Net.BCrypt.Verify("Password123", user.PasswordHash));
        }

        // ─── LOGIN ────────────────────────────────────────────────

        [Fact]
        public async Task Login_ValidCredentials_ReturnsToken()
        {
            // Arrange
            var passwordHash = BCrypt.Net.BCrypt.HashPassword("Password123");
            _context.Users.Add(new User
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "login@test.com",
                PasswordHash = passwordHash,
                CreatedAt = DateTime.UtcNow
            });
            await _context.SaveChangesAsync();

            _jwtServiceMock
                .Setup(j => j.GenerateToken(It.IsAny<User>()))
                .Returns("fake-jwt-token");

            var dto = new LoginDTO
            {
                Email = "login@test.com",
                Password = "Password123"
            };

            // Act
            var token = await _authService.Login(dto);

            // Assert
            Assert.Equal("fake-jwt-token", token);
        }

        [Fact]
        public async Task Login_WrongPassword_ThrowsException()
        {
            // Arrange
            var passwordHash = BCrypt.Net.BCrypt.HashPassword("Password123");
            _context.Users.Add(new User
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "wrong@test.com",
                PasswordHash = passwordHash,
                CreatedAt = DateTime.UtcNow
            });
            await _context.SaveChangesAsync();

            var dto = new LoginDTO
            {
                Email = "wrong@test.com",
                Password = "WrongPassword"
            };

            // Act & Assert
            var ex = await Assert.ThrowsAsync<Exception>(
                () => _authService.Login(dto));
            Assert.Equal("Invalid email or password", ex.Message);
        }

        [Fact]
        public async Task Login_EmailNotFound_ThrowsException()
        {
            // Arrange
            var dto = new LoginDTO
            {
                Email = "notfound@test.com",
                Password = "Password123"
            };

            // Act & Assert
            var ex = await Assert.ThrowsAsync<Exception>(
                () => _authService.Login(dto));
            Assert.Equal("Invalid email or password", ex.Message);
        }
    }
}