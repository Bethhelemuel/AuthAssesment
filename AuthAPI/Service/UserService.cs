using AuthAPI.Data;
using AuthAPI.Data.AuthAPI.Data;
using AuthAPI.DTOs;
using AuthAPI.Interface;
using Microsoft.EntityFrameworkCore;

namespace AuthAPI.Service
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<UserResponseDTO> GetProfile(int userId)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                throw new KeyNotFoundException("User not found");

            return new UserResponseDTO
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                CreatedAt = user.CreatedAt
            };
        }
    }
}