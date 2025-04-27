using RealEstate.Models;

namespace RealEstate.Services
{

    public static class DataStore
    {
        public static List<User> Users = JsonDataService.LoadUsers();
        public static List<Property> Properties = JsonDataService.LoadProperties();
        public static List<SavedProperty> SavedProperties = JsonDataService.LoadSavedProperties();

        public static void SaveAll()
        {
            JsonDataService.SaveUsers(Users);
            JsonDataService.SaveProperties(Properties);
            JsonDataService.SaveSavedProperties(SavedProperties);
        }
    }

}