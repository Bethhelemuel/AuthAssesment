using AuthAPI.DTOs;

namespace AuthAPI.Interface
{
    public interface IAuthService
    {
        Task<string> Register(RegisterDTO register);
        Task<string> Login(LoginDTO login);
    }
}