import { createContext,  useContext } from "react";
import AccountStore from "./accountStore";
import BalanceStore from "./balanceStore";
import BankUserStore from "./bankUserStore";
import BranchStore from "./branchStore";
import CardStore from "./cardStore";
import CommonStore from "./commonStore";
import ContactStore from "./contactStore";
import CustomerStore from "./customerStore";
import DepositStore from "./depositStore";
import InterestStore from "./interestStore";
import LoanStore from "./loanStore";
import ModalStore from "./modalStore";
import PaymentStore from "./paymentStore";
import ProfileStore from "./profileStore";
import SalaryStore from "./salaryStore";
import TransactionStore from "./transactionStore";
import TransferStore from "./transferStore";
import UserStore from "./userStore";
import WithdrawStore from "./withdrawStore";

interface Store{
    accountStore: AccountStore;
    balanceStore: BalanceStore;
    bankuserStore: BankUserStore;
    branchStore:BranchStore;
    cardStore: CardStore;
    contactStore: ContactStore;
    customerStore:CustomerStore;
    depositStore:DepositStore;
    interestStore:InterestStore;
    loanStore:LoanStore;
    paymentStore:PaymentStore;
    salaryStore:SalaryStore;
    transactionStore:TransactionStore;
    transferStore: TransferStore;
    withdrawStore: WithdrawStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;

}

export const store: Store = {
    accountStore: new AccountStore(),
    balanceStore: new BalanceStore(),
    bankuserStore: new BankUserStore(),
    branchStore:new BranchStore(),
    cardStore:new  CardStore(),
    contactStore:new ContactStore(),
    customerStore:new CustomerStore(),
    depositStore:new DepositStore(),
    interestStore:new InterestStore(),
    loanStore:new LoanStore(),
    paymentStore:new PaymentStore(),
    salaryStore:new SalaryStore(),
    transactionStore:new TransactionStore(),
    transferStore: new TransferStore(),
    withdrawStore:new WithdrawStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext)
}