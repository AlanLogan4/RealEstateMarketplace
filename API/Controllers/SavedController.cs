using Microsoft.AspNetCore.Mvc;
using RealEstate.Models;
using RealEstate.Services;

namespace RealEstate.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SavedController : ControllerBase
{
    [HttpPost]
    public IActionResult SaveProperty([FromBody] SavedProperty saved)
    {
        DataStore.SavedProperties.Add(saved);
        DataStore.SaveAll();
        return Ok(saved);
    }

    [HttpGet("user/{userId}")]
    public IActionResult GetSaved(int userId)
    {
        var savedProps = DataStore.SavedProperties
            .Where(sp => sp.CustomerId == userId)
            .Select(sp => DataStore.Properties.FirstOrDefault(p => p.Id == sp.PropertyId))
            .ToList();

        return Ok(savedProps);
    }
}
