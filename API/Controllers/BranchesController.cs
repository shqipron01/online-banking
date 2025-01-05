using System;
using System.Threading.Tasks;
using Application.Branches;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{

    public class BranchesController : BaseApiController
    {
    
        [HttpGet]
        public async Task<IActionResult> GetBranches([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }
     
        [HttpGet("{id}")]
        public async Task<ActionResult> GetBranch(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateBranch(Branch branch){
            return HandleResult(await Mediator.Send(new Create.Command{Branch= branch}));
        }
      
        [HttpPut("{id}")]
        public async Task<IActionResult> EditBranch(Guid id,Branch branch){
            branch.Id=id;
            return  HandleResult(await Mediator.Send(new Edit.Command{Branch = branch}));
        }
 
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBranch(Guid id){
             return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
      
    }
}