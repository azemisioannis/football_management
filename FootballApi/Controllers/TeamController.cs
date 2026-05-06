using Microsoft.AspNetCore.Mvc;
using Dapper;
using System.Data;
using FootballApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace FootballApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TeamController : ControllerBase
{
    private readonly IDbConnection _db;

    public TeamController(IDbConnection db)
    {
        _db = db;
    }

    // Ανάκτηση όλων των ομάδων
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Team>>> GetAllTeams()
    {
        var sql = "SELECT id AS Id, name AS Name, city AS City, league_id AS LeagueId, user_id AS UserId, created_at AS CreatedAt FROM teams";
        var teams = await _db.QueryAsync<Team>(sql);
        return Ok(teams);
    }

    // Ανάκτηση ομάδας βάσει ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Team>> GetTeamById(int id)
    {
        var sql = "SELECT id AS Id, name AS Name, city AS City, league_id AS LeagueId, user_id AS UserId FROM teams WHERE id = @id";
        var team = await _db.QueryFirstOrDefaultAsync<Team>(sql, new { id });
        if (team == null) return NotFound();
        return Ok(team);
    }

    [HttpGet("user/{userId}")] 
    public async Task<ActionResult<IEnumerable<Team>>> GetUserTeams(int userId)
    {
        var sql = "SELECT id AS Id, name AS Name, city AS City, user_id AS UserId, league_id AS LeagueId FROM teams WHERE user_id = @userId";
        var teams = await _db.QueryAsync<Team>(sql, new { userId });
        return Ok(teams);
    }

    // Δημιουργία νέας ομάδας
    [HttpPost]
    public async Task<ActionResult> AddTeam([FromBody] Team team)
    {
        var sql = @"INSERT INTO teams (name, city, league_id, user_id, created_at) 
                    VALUES (@Name, @City, NULLIF(@LeagueId, 0), @UserId, CURRENT_TIMESTAMP) 
                    RETURNING id;";

        try 
        {
            var newId = await _db.QueryFirstAsync<int>(sql, team);
            return Ok(new { id = newId, message = "Success" });
        }
        catch (Exception ex) 
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTeam(int id)
    {
        var sql = "DELETE FROM teams WHERE id = @id";
        var rowsAffected = await _db.ExecuteAsync(sql, new { id });
        if (rowsAffected == 0) return NotFound();
            return NoContent();
    }

    [HttpPut("{teamId}/join-league/{leagueId}")]
    public async Task<IActionResult> JoinLeague(int teamId, int leagueId)
    {
        // Ενημερώνουμε τη στήλη league_id στον πίνακα teams
        var sql = "UPDATE teams SET league_id = @leagueId WHERE id = @teamId";
        
        var rowsAffected = await _db.ExecuteAsync(sql, new { teamId, leagueId });
        
        if (rowsAffected == 0) return NotFound();
        
        return Ok(new { message = "Η ομάδα συνδέθηκε επιτυχώς!" });
    }

    [HttpGet("league/{leagueId}")]
    public async Task<ActionResult<IEnumerable<Team>>> GetTeamsByLeague(int leagueId)
    {
        var sql = "SELECT id, name, city FROM teams WHERE league_id = @leagueId";
        var teams = await _db.QueryAsync<Team>(sql, new { leagueId });
        return Ok(teams);
    }
}