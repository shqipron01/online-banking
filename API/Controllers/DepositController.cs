using System;
using System.Threading.Tasks;
using Application.Deposits;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DepositController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult> GetDeposits([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetDeposit(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDeposit(Deposit deposit){

            return HandleResult(await Mediator.Send(new Create.Command{Deposit = deposit }));
        }

  
        [HttpPut("{id}")]
        public async Task<IActionResult> EditDeposit(Guid id,Deposit deposit){
            deposit.Id=id;
            return  HandleResult(await Mediator.Send(new Edit.Command{Deposit = deposit}));
        }

     
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeposit(Guid id){
             return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}

