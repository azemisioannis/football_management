using Npgsql;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// 1. CONNECTION WITH DB
builder.Services.AddScoped<IDbConnection>(sp => 
    new NpgsqlConnection(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. CORS POLICY (Η άδεια για τη React)
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Το default port της React
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 3. JWT AUTHENTICATION SETTINGS
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("Jwt:Key").Value!)),
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration.GetSection("Jwt:Issuer").Value,
            ValidateAudience = true,
            ValidAudience = builder.Configuration.GetSection("Jwt:Audience").Value,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero 
        };
    });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// 4. SWAGGER CONFIGURATION WITH JWT SUPPORT
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Επικόλλησε το Token σου (χωρίς το 'Bearer ' μπροστά)."
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 5. MIDDLEWARE PIPELINE (Η ΣΕΙΡΑ ΕΙΝΑΙ ΚΡΙΣΙΜΗ!)
app.UseCors("ReactPolicy");     // 1ο: Δίνουμε άδεια στον browser (React)
app.UseAuthentication();        // 2ο: Ελέγχουμε ΠΟΙΟΣ είναι (Token)
app.UseAuthorization();         // 3ο: Ελέγχουμε ΤΙ μπορεί να κάνει

app.MapControllers();

app.Run();