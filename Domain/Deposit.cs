using System;

namespace Domain
{
    public class Deposit
    {
         public Guid Id { get; set; }
        
        public string Account { get; set; }

        public string Amount{ get; set; }

        public DateTime Date { get; set; }

        public string Payee { get; set; }

    }
}