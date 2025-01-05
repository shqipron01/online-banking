using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Salarys
{
    public class SalaryDto
    {
        
        public Guid Id { get; set; }
        public string AccountNumber { get; set; }
        public string AnualSalary{ get; set; }
        public string MonthlyPayment { get; set; }
        public DateTime Date { get; set; }
    }
}