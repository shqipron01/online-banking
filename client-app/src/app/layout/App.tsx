import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Link, Route, Router, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import AccountForm from '../../features/accounts/form/AccountForm';
import AccountDashboard from '../../features/accounts/dashboard/AccountDashboard';
import AccountDetails from '../../features/accounts/details/AccountDetils';
import BalanceDetails from '../../features/balances/details/BalanceDetails';
import BalanceDashboard from '../../features/balances/dashboard/BalanceDashboard';
import BalanceForm from '../../features/balances/form/BalanceForm';
import CardForm from '../../features/cards/form/CardForm';
import CardDashboard from '../../features/cards/dashboard/CardDashboard';
import CardDetails from '../../features/cards/details/CardDetails';
import TransferForm from '../../features/transfers/form/TransferForm';
import TransferDashboard from '../../features/transfers/dashboard/TransferDashboard';
import TransferDetails from '../../features/transfers/details/TransferDetails';
import WithdrawForm from '../../features/withdraws/form/WithdrawForm';
import WithdrawDashboard from '../../features/withdraws/dashboard/WithdrawDashboard';
import WithdrawDetails from '../../features/withdraws/details/WithdrawDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';
import BankUserDashboard from '../../features/bankuser/dashboard/BankUserDashboard';
import BranchDashboard from '../../features/branches/dashboard/BranchDashboard';
import ContactDashboard from '../../features/contacts/dashboard/ContactDashboard';
import CustomerDashboard from '../../features/customers/dashboard/CustomerDashboard';
import DepositDashboard from '../../features/deposits/dashboard/DepositDashboard';
import InterestDashboard from '../../features/interests/dashboard/InterestDashboard';
import PaymentDashboard from '../../features/payments/dashboard/PaymentDashboard';
import SalaryDashboard from '../../features/salarys/dashboard/SalaryDashboard';
import TransactionDashboard from '../../features/transaction/dashboard/TransactionDashboard';
import BankUserDetails from '../../features/bankuser/details/BankUserDetails';
import BranchDetails from '../../features/branches/details/BranchDetails';
import ContactDetails from '../../features/contacts/details/ContactDetails';
import CustomerDetails from '../../features/customers/details/CustomerDetails';
import DepositDetails from '../../features/deposits/details/DepositDetails';
import TransactionDetails from '../../features/transaction/details/TransactionDetails';
import InterestDetails from '../../features/interests/details/InterestDetails';
import PaymentDetails from '../../features/payments/details/PaymentDetails';
import SalaryDetails from '../../features/salarys/details/SalaryDetails';
import BankUserForm from '../../features/bankuser/form/BankUserForm';
import BranchForm from '../../features/branches/form/BranchForm';
import CustomerForm from '../../features/customers/form/CustomerForm';
import ContactForm from '../../features/contacts/form/ContactForm';
import DepositForm from '../../features/deposits/form/DepositForm';
import InterestForm from '../../features/interests/form/InterestForm';
import TransactionForm from '../../features/transaction/form/TransactionForm';
import PaymentForm from '../../features/payments/form/PaymentForm';
import SalaryForm from '../../features/salarys/form/SalaryForm';
import LoanDashboard from '../../features/loan/dashboard/LoanDashboard';
import LoanDetails from '../../features/loan/details/LoanDetails';
import LoanForm from '../../features/loan/form/LoanForm';
import Dashboard from '../../features/dashboard/Dashboard';
import AuthRoute from './AuthRoute';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();


  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...'/>
  const routes = [
    {  path: "/dashboard", component:"ComponentA",roleRequired:"ADMIN" },
  ];
  return (
    
    <>
    
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
   
      <Route
        path={'/(.+)'}
        render={() => {
          return (
            <>
              <NavBar />
              
              <Container style={{ marginTop: '7em' }}>
             
                <Switch>
                  
                  <PrivateRoute exact path='/accounts' component={AccountDashboard} />
                  <PrivateRoute exact path='/balances' component={BalanceDashboard} />
                  <PrivateRoute exact path='/bankuser' component={BankUserDashboard} />
                  <PrivateRoute exact path='/branches' component={BranchDashboard} />
                  <PrivateRoute exact path='/cards' component={CardDashboard} />
                  <PrivateRoute exact path='/contact' component={ContactDashboard} />
                  <PrivateRoute exact path='/customer' component={CustomerDashboard} />
                  <PrivateRoute exact path='/deposit' component={DepositDashboard} />
                  <PrivateRoute exact path='/interest' component={InterestDashboard} />
                  <PrivateRoute exact path='/loan' component={LoanDashboard} />
                  <PrivateRoute exact path='/payment' component={PaymentDashboard} />
                  <PrivateRoute exact path='/salary' component={SalaryDashboard} />
                  <PrivateRoute exact path='/transaction' component={TransactionDashboard} />`
                  <PrivateRoute exact path='/transfers' component={TransferDashboard} />
                  <PrivateRoute exact path='/withdraw' component={WithdrawDashboard} />
                  
                  <PrivateRoute path='/accounts/:id' component={AccountDetails} />
                  <PrivateRoute path='/balances/:id' component={BalanceDetails} />
                  <PrivateRoute path='/bankuser/:id' component={BankUserDetails} />
                  <PrivateRoute path='/branches/:id' component={BranchDetails} />
                  <PrivateRoute path='/cards/:id' component={CardDetails} />
                  <PrivateRoute path='/contact/:id' component={ContactDetails} />
                  <PrivateRoute path='/customer/:id' component={CustomerDetails} />
                  <PrivateRoute path='/deposit/:id' component={DepositDetails} />
                  <PrivateRoute path='/interest/:id' component={InterestDetails} />
                  <PrivateRoute path='/loan/:id' component={LoanDetails} />
                  <PrivateRoute path='/payment/:id' component={PaymentDetails} />
                  <PrivateRoute path='/salary/:id' component={SalaryDetails} />
                  <PrivateRoute path='/transaction/:id' component={TransactionDetails} />
                  <PrivateRoute path='/transfers/:id' component={TransferDetails} />
                  <PrivateRoute path='/withdraws/:id' component={WithdrawDetails} />
                 
                  <PrivateRoute key={location.key} path={['/createAccount', '/manageAccount/:id']} component={AccountForm} />
                  <PrivateRoute path={['/createBankUser', '/manageBankUser/:id']} component={BankUserForm} />
                  <PrivateRoute path={['/createBalance', '/manageBalance/:id']} component={BalanceForm} />
                  <PrivateRoute path={['/createBranch', '/manageBranch/:id']} component={BranchForm} />
                  <PrivateRoute path={['/createCard', '/manageCard/:id']} component={CardForm} />
                  <PrivateRoute path={['/createContact', '/manageContact/:id']} component={ContactForm} />
                  <PrivateRoute path={['/createCustomer', '/manageCustomer/:id']} component={CustomerForm} />
                  <PrivateRoute path={['/createDeposit', '/manageDeposit/:id']} component={DepositForm} />
                  <PrivateRoute path={['/createInterest', '/manageInterest/:id']} component={InterestForm} />
                  <PrivateRoute path={['/createLoan', '/manageLoan/:id']} component={LoanForm} />
                  <PrivateRoute path={['/createPayment', '/managePayment/:id']} component={PaymentForm} />
                  <PrivateRoute path={['/createSalary', '/manageSalary/:id']} component={SalaryForm} />
                  <PrivateRoute path={['/createTransaction', '/manageTransaction/:id']} component={TransactionForm} />
                  <PrivateRoute path={['/createTransfer', '/manageTransfer/:id']} component={TransferForm} />
                  <PrivateRoute path={['/createWithdraw', '/manageWithdraw/:id']} component={WithdrawForm} />
                  <PrivateRoute path='/profiles/:username' component={ProfilePage} />
               
                  <PrivateRoute path='/errors' component={TestErrors} />
                  <Route path='/server-error' component={ServerError} />
                  
                  <Switch>
                  <PrivateRoute path='/dashboard' component={Dashboard} />
                  <AuthRoute roleRequired="ADMIN" />
                  </Switch>
               
                  <Route path='*' component={NotFound} />
               
                </Switch>
              </Container>
            
            </>
          );
        }}
      />
    </>
  );
}

export default observer(App);