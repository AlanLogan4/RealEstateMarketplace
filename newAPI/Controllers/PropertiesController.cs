using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RealEstate.Models;
using RealEstate.Services;

namespace RealEstate.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(DataStore.Properties);

    [HttpPost("add")]
    public async Task<IActionResult> AddProperty([FromForm] string propertyJson, [FromForm] List<IFormFile> images)
    {
        var property = JsonConvert.DeserializeObject<Property>(propertyJson);

        property.Id = DataStore.Properties.Count + 1;

        // Save images
        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        foreach (var image in images)
        {
            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            property.ImageFileNames.Add(uniqueFileName);
        }

        DataStore.Properties.Add(property);
        DataStore.SaveAll();

        return Ok(property);
    }

}
