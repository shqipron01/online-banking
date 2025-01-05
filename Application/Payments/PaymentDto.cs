using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Payments
{
    public class PaymentDto
    {
        
        public Guid Id { get; set; }
        public string Account { get; set; }
        public string Amount{ get; set; }
        public DateTime Date { get; set; }
        public string Payee { get; set; }
    }
}