using System;
using System.Threading.Tasks;
using Application.BankUsers;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class BankUserController :  BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetBankUsers([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetBankUser(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateBankUser(BankUser bankuser){
            return HandleResult(await Mediator.Send(new Create.Command{BankUser = bankuser}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBankUser(Guid id,BankUser bankuser){
            bankuser.Id=id;
            return  HandleResult(await Mediator.Send(new Edit.Command{BankUser = bankuser}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBankUser(Guid id){
             return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
        
    }
}
  