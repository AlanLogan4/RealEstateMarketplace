using Microsoft.AspNetCore.Mvc;
using RealEstate.Models;
using RealEstate.Services;

namespace RealEstate.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(DataStore.Properties);

    [HttpPost]
    public IActionResult AddProperty([FromBody] Property property)
    {
        property.Id = DataStore.Properties.Count + 1;
        DataStore.Properties.Add(property);
        DataStore.SaveAll();
        return Ok(property);
    }
}
