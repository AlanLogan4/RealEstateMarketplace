using Microsoft.AspNetCore.Mvc;
using RealEstate.Models;
using RealEstate.Services;

namespace RealEstate.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpPost("register")]
    public IActionResult Register([FromBody] User user)
    {
        user.Id = DataStore.Users.Count + 1;
        DataStore.Users.Add(user);
        DataStore.SaveAll();
        return Ok(user);
    }

    [HttpGet("{id}")]
    public IActionResult GetUser(int id)
    {
        var user = DataStore.Users.FirstOrDefault(u => u.Id == id);
        return user == null ? NotFound() : Ok(user);
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LogInRequest request)
    {
        var users = JsonDataService.LoadUsers();

        var user = DataStore.Users.FirstOrDefault(u => u.Username == request.Username && u.Password == request.Password);
        if(user == null)
        {
            return Unauthorized(new { message = "Invalid username or password" });
        }
        return Ok(new { message = "Login successful", user });
    }
}
