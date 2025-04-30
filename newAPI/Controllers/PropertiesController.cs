using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RealEstate.Models;
using RealEstate.Services;

namespace RealEstate.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    [HttpGet("get")]
    public IActionResult GetAll() => Ok(DataStore.Properties);

    [HttpGet("{id}")]
    public IActionResult GetPropertyById(int id)
    {
        var property = DataStore.Properties.FirstOrDefault(p => p.Id == id);
        if (property == null)
        {
            return NotFound(new { message = $"Property with ID {id} not found." });
        }

        return Ok(property);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddProperty([FromForm] string propertyJson, [FromForm] IFormFile coverImage, [FromForm] List<IFormFile> images)
    {
        var property = JsonConvert.DeserializeObject<Property>(propertyJson);

        property.Id = DataStore.Properties.Count + 1;

        // Save images
        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }
        if (coverImage != null)
        {
            var coverFileName = Guid.NewGuid() + Path.GetExtension(coverImage.FileName);
            var coverPath = Path.Combine(uploadsFolder, coverFileName);
            using (var stream = new FileStream(coverPath, FileMode.Create))
            {
                await coverImage.CopyToAsync(stream);
            }
            property.CoverImage = coverFileName;
        }

        foreach (var image in images)
        {
            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            property.PropertyImages.Add(uniqueFileName);
        }

        DataStore.Properties.Add(property);
        DataStore.SaveAll();

        return Ok(property);
    }

}
