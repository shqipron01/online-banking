using System;
using System.Collections.Generic;

namespace Domain
{
    public class Branch
    {
        public Guid Id{ get; set; }

        public string Bank { get; set; }

        public string BranchNumber{ get; set; }

        public string Country { get; set; }

        public string City{ get; set; }

        public string Address { get; set; }
        
        public DateTime Date { get; set; }
     
    }
   
}