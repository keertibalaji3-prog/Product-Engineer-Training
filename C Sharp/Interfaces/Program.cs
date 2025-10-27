// See https://aka.ms/new-console-template for more information

public interface ILogger
{
    void Loginfo(string message);
    void LogWarning(string message);
    void LogError(string message);
}

public class ConsoleLogger : ILogger
{
    public void Loginfo(string message)
    {
        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine($"INFO: {message}");
        Console.ResetColor();
    }

    public void LogWarning(string message)
    {
        Console.ForegroundColor = ConsoleColor.Yellow;
        Console.WriteLine($"WARNING: {message}");
        Console.ResetColor();
    }

    public void LogError(string message)
    {
        Console.ForegroundColor= ConsoleColor.Red;
        Console.WriteLine($"ERROR: {message}");
        Console.ResetColor();
    }
}

public class Filelogger : ILogger
{
    private readonly string _filePath;
    public Filelogger(string filePath)
    {
        _filePath = filePath;
    }

    public void Loginfo(string message)
    {
        WriteToFile($"INFO: {message}");
    }

    public void LogWarning(string message)
    {
        WriteToFile($"WARNING: {message}");
    }

    public void LogError(string message)
    {
        WriteToFile($"ERROR: {message}");
    }

    private void WriteToFile(string message)
    {
        File.AppendAllText(_filePath, $"{DateTime.Now}:{message} {Environment.NewLine}");
    }

}

public class Application
{
    private readonly ILogger _logger; 
    public Application(ILogger logger)
    {
        _logger = logger;
    }

    public void Run()
    {
        _logger.Loginfo("Application started");
        _logger.LogWarning("Low Disk Space");
        _logger.LogError("Unhandled exception occurred");

    }

}

class Program
{
    static void Main(string[] args)
    {
        ILogger logger = new ConsoleLogger();
        //ILogger logger = new Filelogger("log.txt");

        var app = new Application(logger); ;
        app.Run();
    }
}












