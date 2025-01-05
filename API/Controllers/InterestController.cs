using System;
using System.Threading.Tasks;
using Application.Interests;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class InterestController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult> GetInterests([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetInterest(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateInterest(Interest interest){

            return HandleResult(await Mediator.Send(new Create.Command{Interest = interest }));
        }

  
        [HttpPut("{id}")]
        public async Task<IActionResult> EditInterest(Guid id,Interest interest){
            interest.Id=id;
            return  HandleResult(await Mediator.Send(new Edit.Command{Interest = interest}));
        }

     
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInterest(Guid id){
             return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}

