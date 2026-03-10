using Xunit;

namespace AuthAPI.Tests.Unit
{
    public class PasswordHasherTests
    {

        // ------------------------------------ HASH PASSWORD RETURNS STRING ------------------------------------
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

        // ------------------------------------ DIFFERENT HAS SAME PASSWORD -----------------------------------
        [Fact]
        public void HashPassword_SamePassword_ReturnsDifferentHashes()
        {
            // Arrange
            var password = "Password123";

            // Act
            var hash1 = BCrypt.Net.BCrypt.HashPassword(password);
            var hash2 = BCrypt.Net.BCrypt.HashPassword(password);

            // Assert 
            Assert.NotEqual(hash1, hash2);
        }

        // ------------------------------------ VERIFY PASSWORD AFTER HASH -----------------------------------
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

        // --------------------------------- INCORRECT PASSWORD RETURNS FALSE ---------------------------------
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