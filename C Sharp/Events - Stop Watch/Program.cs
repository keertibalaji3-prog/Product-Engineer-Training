// See https://aka.ms/new-console-template for more information

using System;
using System.Timers;

public class Clock
{
    public event EventHandler OnTick;
    private System.Timers.Timer timer;

    public Clock()
    {
        timer = new System.Timers.Timer(1000); // 1000 ms = 1 second
        timer.Elapsed += TimerElapsed;
        timer.AutoReset = true;
    }

    public void Start()
    {
        timer.Start();
    }

    private void TimerElapsed(object sender, ElapsedEventArgs e)
    {
        OnTick?.Invoke(this, EventArgs.Empty);
    }
}



public class Display
{
    public void Subscribe(Clock clock)
    {
        clock.OnTick += ShowTime;
    }

    private void ShowTime(object sender, EventArgs e)
    {
        Console.WriteLine("Current Time: " + DateTime.Now.ToLongTimeString());
    }
}

class Program
{
    static void Main()
    {
        Clock clock = new Clock();
        Display display = new Display();

        display.Subscribe(clock);
        clock.Start();

        Console.ReadLine();
        Console.WriteLine("Press Enter to exit...");
        
    }
}


