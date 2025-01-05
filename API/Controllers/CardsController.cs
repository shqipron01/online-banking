using System;
using System.Threading.Tasks;
using Application.Cards;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{   
    public class CardsController: BaseApiController
    {  

        [HttpGet]
        public async Task<IActionResult> GetCards([FromQuery]PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCard(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCard(Card card)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Card = card}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCard(Guid id, Card card)
        {
            card.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Card = card}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCard(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}