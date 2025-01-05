using Application.Accounts;
using Application.Balances;
using Application.Cards;
using Application.Transfers;
using Application.Withdraws;
using Application.BankUsers;
using Application.Branches;
using Application.Contact;
using Application.Customers;
using Application.Deposits;
using Application.Interests;
using Application.Loans;
using Application.Payments;
using Application.Salarys;
using Application.Transactions;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Account,Account>();
            CreateMap<Balance,Balance>();
            CreateMap<Card,Card>();
            CreateMap<Transfer,Transfer>();
            CreateMap<Withdraw,Withdraw>();
            CreateMap<Account,AccountDto>();
            CreateMap<Balance,BalanceDto>();
            CreateMap<Card,CardDto>();
            CreateMap<Transfer,TransferDto>();
            CreateMap<Withdraw,WithdrawDto>();
            CreateMap<BankUser,BankUser>();
            CreateMap<Branch,Branch>();
            CreateMap<Contacts,Contacts>();
            CreateMap<Customer,Customer>();
            CreateMap<Deposit,Deposit>();
            CreateMap<BankUser,BankUserDto>();
            CreateMap<Branch,BranchDto>();
            CreateMap<Contacts,ContactDto>();
            CreateMap<Customer,CustomerDto>();
            CreateMap<Deposit,DepositDto>();
            CreateMap<Interest,Interest>();
            CreateMap<Loan,Loan>();
            CreateMap<Payment,Payment>();
            CreateMap<Salary,Salary>();
            CreateMap<Transaction,Transaction>();
            CreateMap<Interest,InterestDto>();
            CreateMap<Loan,LoanDto>();
            CreateMap<Payment,PaymentDto>();
            CreateMap<Salary,SalaryDto>();
            CreateMap<Transaction,TransactionDto>();
            CreateMap<AppUser, Profiles.Profile>();
        }
    }
}