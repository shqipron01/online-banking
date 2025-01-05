using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Domain;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
       private readonly UserManager<AppUser> userManager;
       private readonly SignInManager<AppUser> signInManager;
       private readonly TokenService tokenService;
       public AccountController(UserManager<AppUser> userManager,SignInManager<AppUser> signInManager,TokenService tokenService) {
            this.tokenService = tokenService;
            this.signInManager = signInManager;
            this.userManager = userManager;
       } 
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
              var user = await this.userManager.FindByEmailAsync(loginDto.Email);

              if(user == null ) return Unauthorized();

              var result = await this.signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

              if(result.Succeeded){

                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image=null,
                    Token= this.tokenService.CreateToken(user),
                    Username = user.UserName
                };
              } 
              return Unauthorized();
}
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await this.userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email","Email taken");
                return ValidationProblem();
            }
              if (await this.userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username","Username taken");
                return ValidationProblem();

            }
             var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username,
            };
            
            var result = await this.userManager.CreateAsync(user, registerDto.Password);
            var roleResult = await this.userManager.AddToRoleAsync(user, "User");

             if (!roleResult.Succeeded) return BadRequest(result.Errors);
             if (result.Succeeded) {
               
                   return CreateUserObject(user);
             }
             return BadRequest("Problem registering user");
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser(){
                var user = await this.userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
                return CreateUserObject(user);
        }
        private UserDto CreateUserObject(AppUser user){
            return new UserDto{
                    DisplayName= user.DisplayName,
                    Image=null,
                    Token =this.tokenService.CreateToken(user),
                    Username=user.UserName
            };
        }
    }
}

