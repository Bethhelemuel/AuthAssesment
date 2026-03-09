using AuthAPI.DTOs;

namespace AuthAPI.Interface
{
    public interface IUserService
    {
        Task<UserResponseDTO> GetProfile(int userId); 
    }
}