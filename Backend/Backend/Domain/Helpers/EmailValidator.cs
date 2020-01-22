using System.ComponentModel.DataAnnotations;

namespace Backend.Domain.Helpers
{
    public class EmailValidator
    {
        public static bool IsValidEmail(string email)
        {
            return new EmailAddressAttribute().IsValid(email);
        }
    }
}