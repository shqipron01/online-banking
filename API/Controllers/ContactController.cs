using System;

using System.Threading.Tasks;
using Application.Contact;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;



namespace API.Controllers
{
    public class ContactController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult> GetContacts([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetContact(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateContact(Contacts contacts){
            return HandleResult(await Mediator.Send(new Create.Command{Contacts = contacts}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditContact(Guid id,Contacts contacts){
            contacts.Id=id;
            return  HandleResult(await Mediator.Send(new Edit.Command{Contacts = contacts}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(Guid id){
             return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
        
    }
}