using System;

namespace Application.Transfers
{
    public class TransferDto
    {
        public Guid Id{ get; set; }
        
        public string TransferNumber { get; set; }

        public string AccountNumber{ get; set; }

        public string Amount { get; set; }

        public string Payee{ get; set; }

        public DateTime Date { get; set; }    
    }
}