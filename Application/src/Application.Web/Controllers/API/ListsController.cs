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
            return _context.Lists.Where(q => q.Owner.Id == userId).ToList();
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
            List list = await _context.Lists
                .SingleOrDefaultAsync(p => p.Id == id);

            if (list == null)
            {
                return NotFound();
            }

            return Ok(list);

        }

        [HttpPut]
        [Route("~/api/lits/{id}")]
        public async Task<IActionResult> PutList(int id, [FromBody] List list)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != list.Id)
            {
                return BadRequest();
            }
            list.Owner = await _userManager.GetUserAsync(User);
            _context.Entry(list).State = EntityState.Modified;

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
        [Route("~/api/list")]
        public async Task<IActionResult> PostList(int id, [FromBody]List list)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            list.Owner = await _userManager.GetUserAsync(User);
            list.TimeStamp = DateTime.UtcNow;
            _context.Lists.Add(list);


            await _context.SaveChangesAsync();
            return CreatedAtAction("GetList", new { id = list.Id, list });
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
                .Where(q => q.Owner.Id == userId)
                .SingleOrDefaultAsync(h => h.Id == id);

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
