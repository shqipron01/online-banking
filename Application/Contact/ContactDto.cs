using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Contact
{
    public class ContactDto
    {
        
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname{ get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Message{ get; set; }
        public DateTime Date { get; set; }


    }
}