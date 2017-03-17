using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Data
{
    public class List
    {
        public int Id { get; set; }
        public string Name { get; set; }     
        public virtual List<Todo> Todos { get; set; }
        public ApplicationUser Owner { get; set; }

        public List()
        {
            var Todos = new List<Todo>();
        }
    }
}
