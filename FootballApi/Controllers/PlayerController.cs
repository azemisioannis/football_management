using Microsoft.AspNetCore.Mvc; // Βιβλιοθήκη για τα API εργαλεία
using Dapper;                 // Βιβλιοθήκη για την SQL
using System.Data;            // Βιβλιοθήκη για τη σύνδεση (IDbConnection)
using FootballApi.Models;     // Για να βλέπει το Player.cs
using Microsoft.AspNetCore.Authorization; // Για το [Authorize] attribute

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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Player>>> GetAllPlayers()
    {

        var sql = "SELECT id, first_name AS FirstName, last_name AS LastName, position, team_id AS TeamId FROM players";


        var players = await _db.QueryAsync<Player>(sql);


        return Ok(players);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Player>> GetPlayerById(int id)
    {
        var sql = "SELECT id, first_name AS FirstName, last_name AS LastName, position AS Position, team_id AS TeamId FROM players WHERE id = @id";
        var player = await _db.QueryFirstOrDefaultAsync<Player>(sql, new { id });

        if (player == null) return NotFound();

        return Ok(player);

    }

    [HttpPost]
    public async Task<ActionResult<Player>> AddPlayer([FromBody] Player player)
    {
        var sql = "INSERT INTO players (first_name, last_name, position, team_id) VALUES (@FirstName, @LastName, @Position :: player_position, @TeamId) RETURNING id;";

        var newId = await _db.QuerySingleAsync<int>(sql, player);

        player.Id = newId;

        return CreatedAtAction(nameof(GetPlayerById), new { id = newId }, player);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePlayer(int id)
    {
        var sql = "DELETE FROM players WHERE id = @id";

        var rowsAffected = await _db.ExecuteAsync(sql, new { id });

        if (rowsAffected == 0) return NotFound($"Ο παίκτης με το id: {id} δεν βρέθηκε!");

        return NoContent();
    }


}