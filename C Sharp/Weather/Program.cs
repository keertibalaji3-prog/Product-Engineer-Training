// See https://aka.ms/new-console-template for more information

using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;



class WeatherForecastApp
{
    static readonly HttpClient httpClient = new HttpClient();
    static readonly string apiKey = "2cb9f1294d3c6674cc72a9ec1b87affb";
    static async Task Main(string[] args)
    {
        Console.WriteLine("Enter city name:");
        string input = Console.ReadLine();
        string[] cities = input.Split(',');
        var tasks = new List<Task>();
        foreach (var city in cities)
        {
            tasks.Add(DisplayWeatherAsync(city.Trim()));
        }

        await Task.WhenAll(tasks);
        Console.WriteLine("\nAll weather data fetched. Press any key to exit.");
        Console.ReadKey();
    }
    static async Task DisplayWeatherAsync(string city)
    {
        try
        {
            var weather = await GetWeatherAsync(city);
            Console.WriteLine($"\n !!! Weather in {city} !!!");
            Console.WriteLine($"Temperature: {weather.Temp}°C");
            Console.WriteLine($"Condition: {weather.Description}");
            Console.WriteLine($"Humidity: {weather.Humidity}%");
            Console.WriteLine($"Wind Speed: {weather.WindSpeed} m/s");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"\nError fetching weather for {city}: {ex.Message}");
        }
    }
    static async Task<WeatherInfo> GetWeatherAsync(string city)
    {
        string url = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&units=metric";
        HttpResponseMessage response = await httpClient.GetAsync(url);
        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"HTTP {(int)response.StatusCode}: {response.ReasonPhrase}");
        }

        string content = await response.Content.ReadAsStringAsync();
        JObject json = JObject.Parse(content);
        return new WeatherInfo
        {
            Temp = json["main"]["temp"]!.Value<float>(),
            Description = json["weather"][0]["description"]!.Value<string>(),
            Humidity = json["main"]["humidity"]!.Value<int>(),
            WindSpeed = json["wind"]["speed"]!.Value<float>()
        };

    }
    class WeatherInfo
    {
        public float Temp { get; set; }
        public required string Description { get; set; }
        public int Humidity { get; set; }
        public float WindSpeed { get; set; }
    }

}