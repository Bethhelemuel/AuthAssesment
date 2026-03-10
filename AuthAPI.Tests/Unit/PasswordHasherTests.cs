using Xunit;

namespace AuthAPI.Tests.Unit
{
    public class PasswordHasherTests
    {
        [Fact]
        public void HashPassword_ReturnsHashedString()
        {
            // Arrange
            var password = "Password123";
             
            // Act
            var hash = BCrypt.Net.BCrypt.HashPassword(password);

            // Assert
            Assert.NotNull(hash);
            Assert.NotEqual(password, hash);
        }

        [Fact]
        public void HashPassword_SamePassword_ReturnsDifferentHashes()
        {
            // Arrange
            var password = "Password123";

            // Act
            var hash1 = BCrypt.Net.BCrypt.HashPassword(password);
            var hash2 = BCrypt.Net.BCrypt.HashPassword(password);

            // Assert — BCrypt uses salt so hashes should never be identical
            Assert.NotEqual(hash1, hash2);
        }

        [Fact]
        public void VerifyPassword_CorrectPassword_ReturnsTrue()
        {
            // Arrange
            var password = "Password123";
            var hash = BCrypt.Net.BCrypt.HashPassword(password);

            // Act
            var result = BCrypt.Net.BCrypt.Verify(password, hash);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public void VerifyPassword_WrongPassword_ReturnsFalse()
        {
            // Arrange
            var password = "Password123";
            var hash = BCrypt.Net.BCrypt.HashPassword(password);

            // Act
            var result = BCrypt.Net.BCrypt.Verify("WrongPassword", hash);

            // Assert
            Assert.False(result);
        }
    }
}