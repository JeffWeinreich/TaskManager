using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Application.Web.Data;
using Application.Web.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Application.Web.Controllers.API
{
    [Produces("application/json")]
  
    public class AccountsController : Controller
    {
        public SignInManager<ApplicationUser> SignInManager { get; set; }
        public UserManager<ApplicationUser> UserManager { get; set; }

        public AccountsController(UserManager<ApplicationUser> usermanager, SignInManager<ApplicationUser> signinmanager)
        {
            UserManager = usermanager;
            SignInManager = signinmanager;
        }


        [HttpGet]
        [Route("~/api/accounts/login")]
        public IActionResult GetLogin()
        {
            return Ok(new { IsAuthenticated = User.Identity.IsAuthenticated, Name = User.Identity.Name });
        }

        [HttpPost]
        [Route("~/api/accounts/login")]
        public async Task<IActionResult> Login([FromBody]LoginRequest model)
        {
            var user = await UserManager.FindByEmailAsync(model.Email);

            if (user != null)
            {
                var result = await SignInManager.PasswordSignInAsync(user, model.Password, false, true);
             if (result.Succeeded)
                {
                  return Ok(new { IsAuthenticated = true, Name = user.Email });
                }
             else
                {
                    return Ok (new { IsAuthenticated = false });
                }
                
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("~/api/accounts/register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            var user = new ApplicationUser();
            user.Email = user.UserName = model.Email;

            var result = await UserManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("~/api/logout")]
        public async Task<IActionResult> Logout()
        {
            await SignInManager.SignOutAsync();

            return Redirect("~/");
        }

    }
}

