using System;
using System.Threading.Tasks;
using Application.Balances;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BalancesController: BaseApiController
    {  

        [HttpGet]
        public async Task<IActionResult> GetBalances([FromQuery]PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBalance(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateBalance(Balance balance)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Balance = balance}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBalance(Guid id, Balance balance)
        {
            balance.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Balance = balance}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBalance(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}