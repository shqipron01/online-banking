using System;

namespace Application.Withdraws
{
    public class WithdrawDto
    {
        public Guid Id{ get; set; }
        
        public string AccountNumber { get; set; }

        public string Amount{ get; set; }

        public DateTime Date { get; set; }

        public string Pin{ get; set; }
    }
}