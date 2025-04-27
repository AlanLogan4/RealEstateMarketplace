using System;
namespace RealEstate.Models

{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Role { get; set; } // "Realtor" or "Customer"

        public string Password { get; set; }
    }

    public class LogInRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

}
