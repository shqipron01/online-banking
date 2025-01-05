using System;
using System.Threading.Tasks;
using Application.Accounts;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountsController: BaseApiController
    {  

        [HttpGet]
        public async Task<IActionResult> GetAccounts([FromQuery]PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccount(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAccount(Account account)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Account = account}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAccount(Guid id, Account account)
        {
            account.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Account = account}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}