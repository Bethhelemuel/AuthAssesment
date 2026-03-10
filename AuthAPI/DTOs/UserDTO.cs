namespace AuthAPI.DTOs
{

    // ------------------------------------ GET PROFILE REQUEST  ------------------------------------
    public class UserResponseDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
