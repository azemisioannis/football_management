using Microsoft.AspNetCore.Mvc; 
using Dapper;                 
using System.Data;            
using FootballApi.Models;     
using Microsoft.AspNetCore.Authorization; 

namespace FootballApi.Controllers;

[Authorize] 
[ApiController]
[Route("api/[controller]")]
public class PlayerController : ControllerBase
{
    private readonly IDbConnection _db;

    public PlayerController(IDbConnection db)
    {
        _db = db;
    }

    // Επιστροφή όλων των παικτών από τη βάση
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Player>>> GetAllPlayers()
    {
        var sql = "SELECT id, first_name AS FirstName, last_name AS LastName, position, team_id AS TeamId FROM players";
        var players = await _db.QueryAsync<Player>(sql);
        return Ok(players);
    }

    // Αναζήτηση συγκεκριμένου παίκτη βάσει ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Player>> GetPlayerById(int id)
    {
        var sql = "SELECT id, first_name AS FirstName, last_name AS LastName, position AS Position, team_id AS TeamId FROM players WHERE id = @id";
        var player = await _db.QueryFirstOrDefaultAsync<Player>(sql, new { id });

        if (player == null) return NotFound();

        return Ok(player);
    }

    // Προσθήκη νέου παίκτη με casting στη θέση
    [HttpPost]
    public async Task<ActionResult<Player>> AddPlayer([FromBody] Player player)
    {
        var sql = "INSERT INTO players (first_name, last_name, position, team_id) VALUES (@FirstName, @LastName, @Position :: player_position, @TeamId) RETURNING id;";
        var newId = await _db.QuerySingleAsync<int>(sql, player);
        player.Id = newId;

        return CreatedAtAction(nameof(GetPlayerById), new { id = newId }, player);
    }

    // Διαγραφή παίκτη βάσει ID
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePlayer(int id)
    {
        var sql = "DELETE FROM players WHERE id = @id";
        var rowsAffected = await _db.ExecuteAsync(sql, new { id });

        if (rowsAffected == 0) return NotFound($"Ο παίκτης με το id: {id} δεν βρέθηκε!");

        return NoContent();
    }

    // Ανάκτηση όλων των παικτών που ανήκουν σε μια συγκεκριμένη ομάδα
[HttpGet("team/{teamId}")]
public async Task<ActionResult<IEnumerable<Player>>> GetPlayersByTeam(int teamId)
{
    // Χρησιμοποιούμε Aliasing για να ταιριάζουν τα ονόματα με το μοντέλο Player.cs
    var sql = "SELECT id, first_name AS FirstName, last_name AS LastName, position AS Position, team_id AS TeamId FROM players WHERE team_id = @teamId";
    
    var players = await _db.QueryAsync<Player>(sql, new { teamId });
    
    return Ok(players);
}
}