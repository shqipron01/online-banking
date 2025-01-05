using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Branches
{
    public class BranchDto
    {
        public Guid Id { get; set; }
        public string Bank { get; set; }
        public string BranchNumber{ get; set; }
        public string Country { get; set; }
        public string City{ get; set; }
        public string Address { get; set; }
        public DateTime Date { get; set; }
        
     
    }
}