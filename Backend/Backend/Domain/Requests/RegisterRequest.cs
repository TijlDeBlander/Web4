using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Domain.Requests
{
    public class RegisterRequest
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }

        public RegisterRequest()
        {
            
        }
    }
}