using AuthAPI.Data;
using AuthAPI.Data.AuthAPI.Data;
using AuthAPI.DTOs;
using AuthAPI.Interface;
using AuthAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthAPI.Service
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IJwtService _jwtService;


        public AuthService(AppDbContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;

        }

        // ------------------------------------ CREATE USER  ------------------------------------
        public async Task<string> Register(RegisterDTO register)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == register.Email);

            if (existingUser != null) 
                throw new Exception("Email already exists");

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(register.Password);

            var user = new User
            {
                FirstName = register.FirstName,
                LastName = register.LastName,
                Email = register.Email,
                PasswordHash = passwordHash,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return _jwtService.GenerateToken(user);
        }

        // ------------------------------------ LOGIN USER  ------------------------------------
        public async Task<string> Login(LoginDTO login)
        {
            
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == login.Email);

            if (user == null)
                throw new Exception("Invalid email or password");

            
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(login.Password, user.PasswordHash);

            if (!isPasswordValid)
                throw new Exception("Invalid email or password");


            return _jwtService.GenerateToken(user);
        }
    }
}