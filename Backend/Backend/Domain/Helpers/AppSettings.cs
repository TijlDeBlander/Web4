namespace Backend.Domain.Helpers
{
    public class AppSettings : IAppSettings
    {
       public string key { get; set; } 
    }

    public interface IAppSettings
    {
        string key { get; set; }
    }
}