using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Customers
{
    public class CustomerDto
    {
        
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname{ get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Tel { get; set; }
        public DateTime BirthDate { get; set; }
        public string Gender { get; set; }
        public string Bank { get; set; }
        public string AccNumber { get; set; }
   

    }
}