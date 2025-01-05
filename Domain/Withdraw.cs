using System;

namespace Domain
{
    public class Withdraw
    {
        public Guid Id{ get; set; }
        
        public string AccountNumber { get; set; }

        public string Amount{ get; set; }

        public DateTime Date { get; set; }

        public string Pin{ get; set; }
    }
}