using System;

namespace Domain
{
    public class Transaction
    {
         public Guid Id { get; set; }
        
        public string Type { get; set; }

        public string Amount{ get; set; }

        public DateTime Date { get; set; }

        public string Payee { get; set; }

    }
}