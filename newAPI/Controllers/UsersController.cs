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
}
