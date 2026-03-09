using AuthAPI.Models;

namespace AuthAPI.Interface
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}