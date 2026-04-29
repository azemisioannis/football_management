using System.Security.Cryptography;
using System.Text;

namespace FootballApi.Helpers
{
    public static class PasswordHasher
    {
        public static string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(password);
                var hash = sha256.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }

        public static bool VerifyPassword(string password, string hashedPassword)
        { 
            // Κάνουμε hash το password που έδωσε ο χρήστης τώρα
            string newHash = HashPassword(password);
            // Το συγκρίνουμε με αυτό που ήρθε από τη βάση
            return newHash == hashedPassword;
        }
    }
}