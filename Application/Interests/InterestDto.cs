using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Interests
{
    public class InterestDto
    {
        
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Amount{ get; set; }
        public string InterestRate { get; set; }
        public string MonthsNumber { get; set; }
        public DateTime Date { get; set; }
    }
}