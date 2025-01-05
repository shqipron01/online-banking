import React from "react"
import { Grid } from "semantic-ui-react"
import WithPermission from "../../app/layout/WithPermissions"
import AccountList from "./AccountList"
import BalanceList from "./BalanceList"
import BankUserList from "./BankUserList"
import BranchList from "./BranchList"
import CardList from "./CardList"
import ContactList from "./ContactList"
import CustomerList from "./CustomerList"
import DepositList from "./DepositList"
import InterestList from "./InterestList"
import LoanList from "./LoanList"
import PaymentList from "./PaymentList"
import SalaryList from "./SalaryList"
import TransactionList from "./TransactionList"
import TransferList from "./TransferList"
import WithdrawList from "./WithdrawList"



const Dashboard = () => (

	<WithPermission roleRequired="ADMIN"  message="Only Admin can view this">
		<h1>Dashboard </h1>
		<AccountList  />
		<BalanceList />
		<BranchList/>
		<CardList/>
		<ContactList/>
		<CustomerList/>
		<DepositList/>
		<InterestList/>
		<LoanList/>
		<PaymentList/>
		<SalaryList/>
		<TransactionList/>
		<TransferList/>
		<BankUserList/>
		<WithdrawList/>
	</WithPermission>
)

export default Dashboard