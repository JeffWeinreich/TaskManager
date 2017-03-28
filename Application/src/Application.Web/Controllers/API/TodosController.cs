using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Web.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Application.Web.Controllers.API
{
    [Produces("application/json")]
    [Authorize]
    public class TodosController : Controller
    {
        private readonly OrganizerContext _context;
        private UserManager<ApplicationUser> _userManager { get; set; }

        public TodosController(UserManager<ApplicationUser> userManager, OrganizerContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPut]
        [Route("~/api/todos/{id}")]
        public async Task<IActionResult> PutTodo(int id, [FromBody] Todo todo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }          

            var list = _context.Lists.FirstOrDefaultAsync(p => p.Id == todo.Id);

            _context.Entry(todo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!TodoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }
       
        [HttpPost("~/api/lists/{listId}/todos")]
        public async Task<IActionResult> PostTodo(int listId, [FromBody] Todo todo)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var list = _context.Lists.FirstOrDefault(p => p.Id == listId);
                      
            list.Todos.Add(todo);
 
           await _context.SaveChangesAsync();
        
           return Ok (todo);
        }

        private bool TodoExists(int id)
        {
            var userId = _userManager.GetUserId(User);
            return _context.Lists.Any(e => e.Id == id);
        }

    }
}
