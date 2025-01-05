using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Transactions
{
    public class TransactionDto
    {
        
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Amount{ get; set; }
       public DateTime Date { get; set; }
        public string Payee { get; set; }


    }
}