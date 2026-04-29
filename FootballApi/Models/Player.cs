namespace FootballApi.Models;

public class Player
{
    //In DB as id
    public int Id { get; set; }
    //In DB as 'first_name'
    public string FirstName { get; set; } = string.Empty;
    //In DB as 'last_name'
    public string LastName { get; set; } = string.Empty;
    //In DB as position (ENUM), here as string
    public string Position { get; set; } = string.Empty;
    //In DB as team_id (foreign key)
    public int TeamId { get; set; }
    //In DB as created_at
    public DateTime CreatedAt { get; set; }
}