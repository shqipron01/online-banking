using System;

namespace Domain
{
    public class Contacts
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
 