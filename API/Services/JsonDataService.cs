using Newtonsoft.Json;
using RealEstateDemo.Models;

namespace RealEstateDemo.Services;

public static class JsonDataService
{
    private static readonly string usersPath = "Data/users.json";
    private static readonly string propertiesPath = "Data/properties.json";
    private static readonly string savedPath = "Data/saved.json";

    public static List<User> LoadUsers()
    {
        return LoadFromFile<User>(usersPath);
    }

    public static List<Property> LoadProperties()
    {
        return LoadFromFile<Property>(propertiesPath);
    }

    public static List<SavedProperty> LoadSavedProperties()
    {
        return LoadFromFile<SavedProperty>(savedPath);
    }

    public static void SaveUsers(List<User> users)
    {
        SaveToFile(usersPath, users);
    }

    public static void SaveProperties(List<Property> properties)
    {
        SaveToFile(propertiesPath, properties);
    }

    public static void SaveSavedProperties(List<SavedProperty> saved)
    {
        SaveToFile(savedPath, saved);
    }

    private static List<T> LoadFromFile<T>(string path)
    {
        if (!File.Exists(path)) return new List<T>();
        var json = File.ReadAllText(path);
        return JsonConvert.DeserializeObject<List<T>>(json) ?? new List<T>();
    }

    private static void SaveToFile<T>(string path, List<T> data)
    {
        var json = JsonConvert.SerializeObject(data, Formatting.Indented);
        File.WriteAllText(path, json);
    }
}
