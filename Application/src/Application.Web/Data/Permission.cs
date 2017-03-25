using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Data
{
    public class Permission
    {
        public int Id { get; set; }
        public List List { get; set; }
        public ApplicationUser User { get; set; }

    }
}
