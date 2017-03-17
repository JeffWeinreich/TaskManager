using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Data
{
    public class ApplicationUser : IdentityUser
    {
        public List<List> Lists { get; set; }
    }
}
