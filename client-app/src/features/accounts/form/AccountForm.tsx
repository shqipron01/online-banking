import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { accountCategoryOptions } from "../../../app/common/options/accountCategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Account } from "../../../app/models/account";


export default observer(function AccountForm() {
    const history = useHistory();
    const { accountStore } = useStore();
    const { createAccount, updateAccount, loading, loadAccount, loadingInitial } = accountStore;
    const { id } = useParams<{ id: string }>();
    const [account, setAccount] = useState<Account>({
        id: '',
        name: '',
        surname: '',
        accountNumber: '',
        accountType: '',
        openDate: null,
        balance: ''
    });

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        surname: Yup.string().required('Surname is required'),
        accountNumber: Yup.string().required('Account number is required'),
        accountType: Yup.string().required('Account type is required'),
        openDate: Yup.string().required('Date is required').nullable(),
        balance: Yup.string().required('Balance is required'),
    })

    useEffect(() => {
        if (id) loadAccount(id).then(account => setAccount(account!))
    }, [id, loadAccount]);


    function handleFormSubmit(account: Account) {
        if (account.id.length === 0) {
            let newAccount = {
                ...account,
                id: uuid()
            };
            createAccount(newAccount).then(() => history.push(`/accounts/${newAccount.id}`))
        } else {
            updateAccount(account).then(() => history.push(`/accounts/${account.id}`))
        }
    }


    if (loadingInitial) return <LoadingComponent content='Loading account...' />

    return (
        <Segment clearing>
            <Header content='Account Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={account} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='name' placeholder='Name' />
                        <MyTextInput  placeholder='Surname' name='surname'  />
                        <MyTextInput placeholder='Account Number' name='accountNumber'  />
                        <MySelectInput options={accountCategoryOptions} placeholder='Account Type' name='accountType'  />
                        <MyDateInput
                            placeholderText='Open Date' 
                            name='openDate'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                            />
                        <MyTextInput placeholder='Balance' name='balance'  />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' 
                            positive type='submit' content='Submit' />
                        <Button as={Link} to='/accounts' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})