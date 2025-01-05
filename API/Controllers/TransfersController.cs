using System;
using System.Threading.Tasks;
using Application.Core;
using Application.Transfers;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TransfersController: BaseApiController
    {  


        [HttpGet]
        public async Task<IActionResult> GetTransfers([FromQuery]PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransfer(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransfer(Transfer transfer)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Transfer = transfer}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTransfer(Guid id, Transfer transfer)
        {
            transfer.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Transfer = transfer}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransfer(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}