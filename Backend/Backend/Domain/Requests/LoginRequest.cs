using System.ComponentModel.DataAnnotations;

namespace Backend.Domain.Requests
{
    public class LoginRequest
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

        public LoginRequest()
        {
            
        }
    }
}