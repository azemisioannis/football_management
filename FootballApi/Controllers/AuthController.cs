using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt; 
using System.Security.Claims;
using System.Text; 
using System.Data;
using Dapper;
using FootballApi.Models;
using FootballApi.Helpers;

namespace FootballApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IDbConnection _db;
    private readonly IConfiguration _configuration;

    // Ενημερωμένος Constructor για να δέχεται και το Configuration
    public AuthController(IDbConnection db, IConfiguration configuration)
    {
        _db = db;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] UserRegister userRegister)
    {
        var passwordHash = PasswordHasher.HashPassword(userRegister.Password);

        // 1. Εισαγωγή στον πίνακα users
        var sql = "INSERT INTO users (username, password_hash, role) VALUES (@UserName, @PasswordHash, @Role::user_role) RETURNING id;";

        int newId = _db.QuerySingle<int>(sql, new 
        {
            userRegister.UserName, 
            PasswordHash = passwordHash, 
            userRegister.Role 
        });

        // 2. Δημιουργία Profile ανάλογα με τον ρόλο
        if(userRegister.Role.ToLower() == "league")
        {
            var sqlLeague = "INSERT INTO leagues (name, region, user_id) VALUES (@Name, @Region, @UserId)";
            _db.Execute(sqlLeague, new { 
                Name = userRegister.UserName, 
                Region = "Default Region", 
                UserId = newId 
            });
        }
        else if(userRegister.Role.ToLower() == "team")
        {
            var sqlTeam = "INSERT INTO teams (name, city, league_id, user_id) VALUES (@Name, @City, @LeagueId, @UserId)";
            _db.Execute(sqlTeam, new { 
                Name = userRegister.UserName, 
                City = "Athens", 
                LeagueId = 1, 
                UserId = newId 
            });
        }

        return Ok(new { Message = "Επιτυχής εγγραφή!" });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLogin request)
    {
        // 1. Αναζήτηση χρήστη στη βάση (φέρνουμε και το Role για το Token)
        var sql = "SELECT id, username, password_hash AS PasswordHash, role FROM users WHERE username = @UserName";
        var user = _db.QueryFirstOrDefault<User>(sql, new { UserName = request.UserName });

        if (user == null)
        {
            return BadRequest("Ο χρήστης δεν βρέθηκε.");
        }

        // 2. Έλεγχος κωδικού
        if (!PasswordHasher.VerifyPassword(request.Password, user.PasswordHash))
        {
            return BadRequest("Λάθος στοιχεία σύνδεσης.");
        }

        // 3. Δημιουργία και επιστροφή του Token
        var token = CreateToken(user);

        return Ok(new { Token = token });
    }

    // Η μέθοδος που "χτίζει" το ψηφιακό κλειδί (JWT)
    private string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim("userId", user.Id.ToString())
        };

        // Παίρνουμε το Secret Key από το appsettings.json
        var keyStr = _configuration.GetSection("Jwt:Key").Value;
        if (string.IsNullOrEmpty(keyStr)) throw new Exception("JWT Key is missing from configuration!");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyStr));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        var tokenDescriptor = new JwtSecurityToken(
            issuer: _configuration.GetSection("Jwt:Issuer").Value,
            audience: _configuration.GetSection("Jwt:Audience").Value,
            claims: claims,
            expires: DateTime.Now.AddDays(1), // Λήξη σε 24 ώρες
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
    }
}