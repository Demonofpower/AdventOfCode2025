using System;
using System.IO;

var start = 50;
var secret = 0;
var lines = File.ReadAllLines("input.txt");

foreach (var line in lines)
{
    var value = int.Parse(line.Substring(1));
    var delta = line[0] == 'R' ? value : -value;
    var fullCircles = Math.Abs(delta) / 100;
    var remainder = Math.Abs(delta) % 100;
    var crossesZero = 0;
    
    if (delta > 0 && start + remainder >= 100) crossesZero = 1;
    if (delta < 0 && start > 0 && start - remainder <= 0) crossesZero = 1;
    
    secret += fullCircles + crossesZero;
    start = (start + delta % 100 + 100) % 100;
}

Console.WriteLine(secret);