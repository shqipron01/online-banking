using System;

using System.Threading.Tasks;
using Application.Loans;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LoanController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetLoans([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetLoan(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }
        [HttpPost]
        public async Task<IActionResult> CreateLoan(Loan loan){

            return HandleResult(await Mediator.Send(new Create.Command{Loan = loan }));
        }

     
        [HttpPut("{id}")]
        public async Task<IActionResult> EditLoan(Guid id,Loan loan){
            loan.Id=id;
            return  HandleResult(await Mediator.Send(new Edit.Command{Loan = loan}));
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoan(Guid id){
             return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
        
      

    }
}