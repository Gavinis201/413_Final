namespace Entertainment.Models;

public class EntertainerDto
{
    public int EntertainerId { get; set; }
    public string? EntStageName { get; set; }
    public int BookingCount { get; set; }
    public DateOnly? LastBookedDate { get; set; }
} 