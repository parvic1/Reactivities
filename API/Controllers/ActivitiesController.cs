using System;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        public readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            _context = context;
        }

     [HttpGet]
     public async Task<ActionResult<List<Activity>>> GetActivities() 
     {

        return await _context.Activities.ToListAsync();
     }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id) {

        return await _context.Activities.FindAsync(id);
    }


    }
}