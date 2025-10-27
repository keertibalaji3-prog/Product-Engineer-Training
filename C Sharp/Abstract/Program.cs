using System;

using System.Collections.Generic;
using System.Runtime.CompilerServices;

Console.WriteLine("Shapes Area & Perimeter: \n");

var shapes = new List<Shape>
{
    new Rectangle {Width = 5, Height = 10},
    new Triangle {x = 5, y = 4, z = 5},
    new Circle {Radius = 8}
};

double totArea = 0;
double totPerimeter = 0;

foreach(var shape in shapes)
{
    double area = shape.GetArea();
    double perimeter = shape.GetPerimeter();

    totArea += area;
    totPerimeter += perimeter;

    Console.WriteLine($"{shape.GetType().Name}:");
    Console.WriteLine($"Area = {area: F2}");
    Console.WriteLine($"Perimeter = {perimeter:F2}\n");

}

Console.WriteLine($"Total Area of all shapes: {totArea:F2}");
Console.WriteLine($"Total Perimeter of all shapes: {totPerimeter:F2}");

public abstract class Shape
{
    public abstract double GetArea();
    public abstract double GetPerimeter();
}

public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }

    public override double GetArea() => Width * Height;
    public override double GetPerimeter() => 2 * (Width + Height);

}

public class Triangle : Shape
{
    public double x, y, z;

    public override double GetArea()
    {
        double s = (x + y + z) / 2;
        return Math.Sqrt(s * (s - x) * (s - y) *  (s - z));

    }

    public override double GetPerimeter() => x + y + z;
}

public class Circle : Shape
{
    public double Radius;

    public override double GetArea() => Math.PI * Radius * Radius;
    public override double GetPerimeter() => 2 * Math.PI * Radius;
}