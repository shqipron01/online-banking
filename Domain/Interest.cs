using System;

namespace Domain
{
    public class Interest
    {
         public Guid Id { get; set; }
        
        public string Type { get; set; }

        public string Amount{ get; set; }

        public string InterestRate { get; set; }

        public string MonthsNumber { get; set; }

        public DateTime Date { get; set; }
    }
}