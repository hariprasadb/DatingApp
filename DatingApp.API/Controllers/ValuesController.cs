using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;


namespace DatingApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class ValuesController : ControllerBase
    {

        private readonly DataContext _context;

        public ValuesController(DataContext context) 
        {
                _context = context;
        }
        [HttpGet]
        public async  Task<IActionResult> GetValues()
        {
           var values =  await _context.Values.ToListAsync();
           
           return Ok(values);
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public  async Task<IActionResult> GetValue(int id)
        {
           var value = await _context.Values.FirstOrDefaultAsync(v=>v.Id==id);
           if  (value == null) return NotFound("Value Not found");
           return Ok(value);
        }

    }
}