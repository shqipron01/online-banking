using System;

namespace Application.Cards
{
    public class CardDto
    {
        public Guid Id { get; set; }

        public string AccountNumber { get; set; }

        public string CardType { get; set; }

        public string CardNumber { get; set; }

        public DateTime ExpirationDate { get; set; }  
    }
}