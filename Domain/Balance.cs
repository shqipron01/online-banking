using System;

namespace Domain
{
    public class Balance
    {
        public Guid Id { get; set; }

        public string AccountNumber { get; set; }

        public string AccountType { get; set; }

        public string Amount { get; set; }
        
        public DateTime Date { get; set; }     
    }
}

