using Microsoft.AspNetCore.Mvc;
using Dapper;
using System.Data;
using FootballApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace FootballApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class LeagueController : ControllerBase
{
    private readonly IDbConnection _db;

    public LeagueController(IDbConnection db)
    {
        _db = db;
    }

    // Ανάκτηση όλων των διοργανώσεων
    [HttpGet]
    public async Task<ActionResult<IEnumerable<League>>> GetAllLeagues()
    {
        var sql = "SELECT id AS Id, name AS Name, region AS Region, user_id AS UserId, created_at AS CreatedAt FROM leagues";
        var leagues = await _db.QueryAsync<League>(sql);
        return Ok(leagues);
    }

    // Ανάκτηση διοργάνωσης βάσει ID
    [HttpGet("{id}")]
    public async Task<ActionResult<League>> GetLeagueById(int id)
    {
        var sql = "SELECT id AS Id, name AS Name, region AS Region, user_id AS UserId FROM leagues WHERE id = @id";
        var league = await _db.QueryFirstOrDefaultAsync<League>(sql, new { id });
        if (league == null) return NotFound();
        return Ok(league);
    }

    // Προσθήκη νέας διοργάνωσης
    [HttpPost]
    public async Task<ActionResult<League>> AddLeague([FromBody] League league)
    {
        var sql = "INSERT INTO leagues (name, region, user_id) VALUES (@Name, @Region, @UserId) RETURNING id;";
        var newId = await _db.QuerySingleAsync<int>(sql, league);
        league.Id = newId;
        return Ok(league);
    }

    // Διαγραφή διοργάνωσης βάσει ID
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLeague(int id)
    {
        var sql = "DELETE FROM leagues WHERE id = @id";
        var rowsAffected = await _db.ExecuteAsync(sql, new { id });
        if (rowsAffected == 0) return NotFound($"Η Λίγκα με ID: {id} δεν βρέθηκε!");
        return NoContent();
    }

    // Ανάκτηση διοργανώσεων συγκεκριμένου χρήστη
    [HttpGet("user/{userId}")]
public async Task<ActionResult<IEnumerable<League>>> GetUserLeagues(int userId)
{
    // Χρησιμοποιούμε LEFT JOIN για να μετρήσουμε πόσες ομάδες έχουν το ID αυτής της λίγκας
    var sql = @"
        SELECT l.id AS Id, l.name AS Name, l.region AS Region, l.user_id AS UserId, 
               COUNT(t.id) AS TeamsCount
        FROM leagues l
        LEFT JOIN teams t ON l.id = t.league_id
        WHERE l.user_id = @userId
        GROUP BY l.id, l.name, l.region, l.user_id";

    var leagues = await _db.QueryAsync<League>(sql, new { userId });
    return Ok(leagues);
}

    // Ενημέρωση υπάρχουσας διοργάνωσης
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateLeague(int id, [FromBody] League leagueData)
    {
        var sql = "UPDATE leagues SET name = @Name, region = @Region WHERE id = @id";
        
        // Εκτέλεση της ενημέρωσης με χρήση του ID από το URL και των δεδομένων από το Body
        var rowsAffected = await _db.ExecuteAsync(sql, new { 
            Name = leagueData.Name, 
            Region = leagueData.Region, 
            id = id 
        });

        if (rowsAffected == 0) 
            return NotFound($"Η Λίγκα με ID: {id} δεν βρέθηκε!");

        return Ok(new { message = "Η ενημέρωση ολοκληρώθηκε επιτυχώς!" });
    }

    
}