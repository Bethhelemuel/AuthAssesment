namespace AuthAPI.DTOs
{
    // ------------------------------------ REGISTER REQUEST  ------------------------------------
    public class RegisterDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    // ------------------------------------ LOGIN REQUEST  ------------------------------------
    public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
