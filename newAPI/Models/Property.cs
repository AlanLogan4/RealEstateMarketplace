using System;
namespace RealEstate.Models
{


    public class Property
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public int RealtorId { get; set; }
        public string Location { get; set; }
        public List<string> ImageFileNames { get; set; } = new();
    }

}