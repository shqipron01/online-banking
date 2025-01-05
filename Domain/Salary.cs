using System;

namespace Domain
{
    public class Salary
    {
         public Guid Id { get; set; }
        
        public string AccountNumber { get; set; }

        public string AnualSalary { get; set; }

        public string MonthlyPayment { get; set; }

        public DateTime Date { get; set; }
    }
}