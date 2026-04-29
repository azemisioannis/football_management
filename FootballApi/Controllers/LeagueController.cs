using Microsoft.AspNetCore.Mvc;
using Dapper;
using System.Data;
using FootballApi.Models;

namespace FootballApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeagueController : ControllerBase
{
    private readonly IDbConnection _db;

    public LeagueController(IDbConnection db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<League>>> GetAllLeagues()
    {
        var sql = "SELECT id AS Id, name AS Name, region AS Region, user_id AS UserId, created_at AS CreatedAt FROM leagues";
        var leagues = await _db.QueryAsync<League>(sql);
        return Ok(leagues);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<League>> GetLeagueById(int id)
    {
        var sql = "SELECT id AS Id, name AS Name, region AS Region, user_id AS UserId FROM leagues WHERE id = @id";
        var league = await _db.QueryFirstOrDefaultAsync<League>(sql, new { id });
        if (league == null) return NotFound();
        return Ok(league);
    }

    [HttpPost]
    public async Task<ActionResult<League>> AddLeague([FromBody] League league)
{
    var sql = "INSERT INTO leagues (name, region, user_id) VALUES (@Name, @Region, @UserId) RETURNING id;";
    var newId = await _db.QuerySingleAsync<int>(sql, league);
    league.Id = newId;
    return Ok(league);
}

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLeague(int id)
    {
        var sql = "DELETE FROM leagues WHERE id = @id";
        var rowsAffected = await _db.ExecuteAsync(sql, new { id });
        if (rowsAffected == 0) return NotFound($"Η Λίγκα με ID: {id} δεν βρέθηκε!");
        return NoContent();
    }

   [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<League>>> GetUserLeagues(int userId)
{
    // Φέρνουμε όλες τις λίγκες που ανήκουν σε αυτόν τον χρήστη
    var sql = "SELECT id AS Id, name AS Name, region AS Region, user_id AS UserId FROM leagues WHERE user_id = @userId";
    
    var leagues = await _db.QueryAsync<League>(sql, new { userId });
    
    // Επιστρέφουμε τη λίστα (έστω και άδεια [])
    return Ok(leagues);
}


}