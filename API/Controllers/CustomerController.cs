using System;
using System.Threading.Tasks;
using Application.Customers;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CustomerController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult> GetCustomers([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetCustomer(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));

        }
        [HttpPost]
        public async Task<IActionResult> CreateCustomer(Customer customer){

            return HandleResult(await Mediator.Send(new Create.Command{Customer = customer }));
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditCustomer(Guid id,Customer  customer){
            customer.Id=id;
            return  HandleResult(await Mediator.Send(new Edit.Command{Customer = customer}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(Guid id){
             return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
        
        
    }
}

