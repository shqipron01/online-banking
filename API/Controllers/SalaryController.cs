using System;
using System.Threading.Tasks;
using Application.Salarys;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SalaryController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult> GetSalarys([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetSalary(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateSalary(Salary salary){

            return HandleResult(await Mediator.Send(new Create.Command{Salary = salary }));
        }

  
        [HttpPut("{id}")]
        public async Task<IActionResult> EditSalary(Guid id,Salary salary){
            salary.Id=id;
            return  HandleResult(await Mediator.Send(new Edit.Command{Salary = salary}));
        }

     
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSalary(Guid id){
             return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}

