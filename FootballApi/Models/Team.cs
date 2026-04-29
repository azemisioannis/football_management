namespace FootballApi.Models;

public class Team
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public int? LeagueId { get; set; } // Nullable γιατί στην αρχή μπορεί να μην έχει λίγκα
    public int UserId { get; set; }    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}