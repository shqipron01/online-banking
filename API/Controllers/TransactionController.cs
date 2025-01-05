using System;
using System.Threading.Tasks;
using Application.Transactions;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TransactionController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult> GetTransactions([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetTransaction(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransaction(Transaction transaction){

            return HandleResult(await Mediator.Send(new Create.Command{Transaction = transaction }));
        }

  
        [HttpPut("{id}")]
        public async Task<IActionResult> EditTransaction(Guid id,Transaction transaction){
            transaction.Id=id;
            return  HandleResult(await Mediator.Send(new Edit.Command{Transaction = transaction}));
        }

     
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(Guid id){
             return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
        
       
    }
}

