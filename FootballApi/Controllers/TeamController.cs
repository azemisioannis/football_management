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
}