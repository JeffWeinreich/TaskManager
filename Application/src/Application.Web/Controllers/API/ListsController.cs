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

            var lists = _context.Lists.Include(q => q.Todos)
                .Where(q => _context.Permissions.Any(r => r.List.Id == q.Id && r.User.Id == userId)).ToList();

            return lists;
        }

        [HttpGet]
        [Route("~/api/lists/{id}")]
        public IActionResult GetList(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = _userManager.GetUserId(User);

            var list = _context.Lists.Include(q => q.Todos)
                .Where(q => _context.Permissions.Any(r => r.List.Id == id && r.User.Id == userId))
                .FirstOrDefault(p => p.Id == id);

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

            var existinglist = _context.Lists
                .Include(q => q.Todos)
                .FirstOrDefault(q => _context.Lists.Any(r => r.Id == id));

            existinglist.IsDone = list.IsDone;
            existinglist.Name = list.Name;



            _context.Entry(list).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return Ok(existinglist);

        }

        [HttpPost]
        [Route("~/api/lists")]
        public async Task<IActionResult> PostList([FromBody]List list)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = _userManager.GetUserAsync(User);


            list.TimeStamp = DateTime.UtcNow;
            _context.Lists.Add(list);

            var permission = new Permission();
            permission.List = list;

            var user = await _userManager.GetUserAsync(User);
            permission.User = user;

            _context.Permissions.Add(permission);

            await _context.SaveChangesAsync();
            return Ok(list);
        }

        [HttpPost("~/api/lists/{id}/share")]
        public async Task<IActionResult> PostList(int id,[FromBody] List list)
        {
            var userId = _userManager.GetUserId(User);

                list = _context.Lists.Include(q => q.Todos)
               .Where(q => _context.Permissions.Any(r => r.List.Id == id && r.User.Id == userId))
               .FirstOrDefault(p => p.Id == id);
           
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);

            var permission = new Permission();
            permission.List = list;
            permission.User = user;
            _context.Permissions.Add(permission);

            _context.SaveChanges();
            return Ok(User);

        }


        [HttpDelete]
        [Route("~/api/lists/{id}")]
        public async Task<IActionResult> DeleteList(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = _userManager.GetUserAsync(User);

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
            var userId = _userManager.GetUserAsync(User);
            return _context.Lists.Any(e => e.Id == id);
        }


    }
}
