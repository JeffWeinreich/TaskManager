using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Data
{
    public class List
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }     
        public virtual List<Todo> Todos { get; set; }
        public ApplicationUser Owner { get; set; }
        public DateTime TimeStamp { get; set; }

        public List()
        {
            var Todos = new List<Todo>();
        }
    }
}
