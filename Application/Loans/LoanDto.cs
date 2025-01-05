using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Loans
{
    public class LoanDto
    {
        
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname{ get; set; }
        public string AccNumber { get; set; }
        public string Type { get; set; }
        public string Amount { get; set; }
        public string Duration { get; set; }
        public DateTime LoanDate { get; set; }
        public string Payments { get; set; }
       
      
    }
}