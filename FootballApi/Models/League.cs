namespace FootballApi.Models;

public class League
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public int UserId { get; set; }    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}