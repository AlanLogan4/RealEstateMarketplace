using System;
namespace RealEstate.Models
{


    public class Property
    {
        public int Id { get; set; } // ID of the property
        public decimal Price { get; set; }
        public string Address { get; set; }
        public int Year { get; set; } //year that it was built
        public int RealtorID { get; set; } // ID of the realtor that is selling this property
        public int NumberOfRooms { get; set; }
        public int NumberOfBathrooms { get; set; }
        public string Description { get; set; } // What is special about this property
        public int PropertySize { get; set; } // in square feet (sqft)
        public string PropertyType { get; set; } // True = it's a house, false = it's an apartment
        public List<string> PropertyImages { get; set; } // List of URLs to images of the property
        public string CoverImage { get; set; } // URL to the cover image of the property
    }

}