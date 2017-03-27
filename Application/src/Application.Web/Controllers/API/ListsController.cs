using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Web.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Application.Web.Controllers.API
{
    [Produces("application/json")]
    [Authorize]
    public class ListController : Controller
    {
        private readonly OrganizerContext _context;
        private UserManager<ApplicationUser> _userManager { get; set; }

        public ListController(UserManager<ApplicationUser> userManager, OrganizerContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        [Route("~/api/lists")]
        public IEnumerable<List> GetList()
        {

            var userId = _userManager.GetUserId(User);
            var lists = _context.Permissions.Where(p => p.User.Id == userId).Select(p => p.List);
            return lists;
        }

        [HttpGet]
        [Route("~/api/lists/{id}")]
        public async Task<IActionResult> GetList(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = _userManager.GetUserId(User);
            var lists = _context.Permissions.Where(p => p.User.Id == userId);

            List list = await _context.Lists
                .Where(p => p.Name == userId)
                .Include(p => p.Todos)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (list == null)
            {
                return NotFound();
            }

            return Ok(list);
        }

        [HttpPut]
        [Route("~/api/lists/{id}")]
        public async Task<IActionResult> PutList(int id, [FromBody] List list)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = _userManager.GetUserId(User);

            var lists = _context.Permissions.Where(p => p.User.Id == userId)               
                .FirstOrDefaultAsync(p => p.List == list);

            _context.Entry(list).State = EntityState.Modified;

            //await _context.SaveChangesAsync();
            try
            {
                await _context.SaveChangesAsync();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!ListExists(id))
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
        [Route("~/api/lists")]
        public async Task<IActionResult> PostList([FromBody]List list)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = _userManager.GetUserId(User);
            var lists = _context.Permissions.Where(p => p.User.Id == userId);
            list.TimeStamp = DateTime.UtcNow;
            _context.Lists.Add(list);

            await _context.SaveChangesAsync();
            return Ok();
            //return CreatedAtAction("GetList", new { id = list.Id, list });
        }


        [HttpDelete]
        [Route("~/api/lists/{id}")]
        public async Task<IActionResult> DeleteList(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = _userManager.GetUserId(User);

            List list = await _context.Lists
                .FirstOrDefaultAsync(h => h.Id == id);
            foreach (var todo in list.Todos)
            {
                list.Todos.Remove(todo);
            }

            if (list == null)
            {
                return NotFound();
            }
            _context.Lists.Remove(list);
            await _context.SaveChangesAsync();

            return Ok(list);
        }

        private bool ListExists(int id)
        {
            var userId = _userManager.GetUserId(User);
            return _context.Lists.Any(e => e.Id == id);
        }


    }
}
