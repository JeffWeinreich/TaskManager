using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Web.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Application.Web.Controllers.API
{
    [Produces("application/json")]
    //[Authorize]

    public class TodosController : Controller
    {
        private readonly OrganizerContext _context;
        private UserManager<ApplicationUser> _userManager { get; set; }

        public TodosController(UserManager<ApplicationUser> userManager, OrganizerContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        //[HttpGet]
        //[Route("~/api/lists")]
        //public IEnumerable<List> GetList()
        //{
        //    var userId = _userManager.GetUserId(User);
        //    return _context.Lists.Where(q => q.Owner.Id == userId).ToList();
        //}

        //[HttpGet]
        //[Route("~/api/lists/{listsId}/todos/{todosId}")]
        //public async Task<IActionResult> GetSingleTodo(int listId, int todosId)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    var userId = _userManager.GetUserId(User);
        //    var todo = await _context.Lists
        //        .FirstOrDefaultAsync(q => q.Id == todosId);

        //    if (todo = null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(todo);
        //}

        [HttpPut]
        [Route("~/api/todos/{id}")]
        public async Task<IActionResult> PutTodo(int id, [FromBody] Todo todo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }
            if(id != todo.Id)
            {
                return BadRequest();

            }

            //todo.List = await _userManager.GetUserAsync();
            _context.Entry(todo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }

            catch(DbUpdateConcurrencyException)
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
        [HttpPost]
        [Route("~/api/lists/{listsId}/todos")]

        public async Task<IActionResult> PostTodo(int listId, [FromBody] Todo todo)
        {
            var list = _context.Lists.FirstOrDefault(q => q.Id == listId);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }

            //todo.List = await _userManager.GetUserAsync(User);
            todo.List = list;

            _context.Lists.Add(todo.List);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TodoExists(todo.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }
            return CreatedAtAction("GetTodo", new { id = todo.Id }, todo);
        }
        

        private bool TodoExists(int id)
        {
            var userId = _userManager.GetUserId(User);
            return _context.Lists.Any(e => e.Id == id);
        }

    }
}
