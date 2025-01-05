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
import { balanceCategoryOptions } from "../../../app/common/options/balanceCategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Balance } from "../../../app/models/balance";


export default observer(function BalanceForm() {
    const history = useHistory();
    const { balanceStore } = useStore();
    const { createBalance, updateBalance, loading, loadBalance, loadingInitial } = balanceStore;
    const { id } = useParams<{ id: string }>();
    const [balance, setBalance] = useState<Balance>({
        id: '',
        accountNumber: '',
        accountType: '',
        amount: '',
        date: null
    });

    const validationSchema = Yup.object({
        accountNumber: Yup.string().required('Account number is required'),
        accountType: Yup.string().required('Account type is required'),
        amount: Yup.string().required('Amount is required'),
        date: Yup.string().required('Date is required').nullable(),
    })

    useEffect(() => {
        if (id) loadBalance(id).then(balance => setBalance(balance!))
    }, [id, loadBalance]);


    function handleFormSubmit(balance: Balance) {
        if (balance.id.length === 0) {
            let newBalance = {
                ...balance,
                id: uuid()
            };
            createBalance(newBalance).then(() => history.push(`/balances/${newBalance.id}`))
        } else {
            updateBalance(balance).then(() => history.push(`/balances/${balance.id}`))
        }
    }


    if (loadingInitial) return <LoadingComponent content='Loading balance...' />


    return (
        <Segment clearing>
            <Header content='Balance Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema} 
                enableReinitialize 
                initialValues={balance} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='Account Number' name='accountNumber' />
                        <MySelectInput options={balanceCategoryOptions} placeholder='Account Type'  name='accountType'  />
                        <MyTextInput placeholder='Amount'  name='amount'  />
                        <MyDateInput 
                            placeholderText='Date'  
                            name='date' 
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                         />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid} 
                            loading={loading} floated='right' 
                            positive type='submit' content='Submit' />
                        <Button as={Link} to='/balances' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})