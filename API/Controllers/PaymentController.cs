using System;
using System.Threading.Tasks;
using Application.Payments;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PaymentController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult> GetPayments([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetPayment(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePayment(Payment payment){

            return HandleResult(await Mediator.Send(new Create.Command{Payment = payment }));
        }

  
        [HttpPut("{id}")]
        public async Task<IActionResult> EditPayment(Guid id,Payment payment){
            payment.Id=id;
            return  HandleResult(await Mediator.Send(new Edit.Command{Payment = payment}));
        }

     
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(Guid id){
             return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}

