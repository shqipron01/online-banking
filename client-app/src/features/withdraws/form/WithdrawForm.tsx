import { observer } from "mobx-react-lite";
import React,{useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import { withdrawCategoryOptions } from "../../../app/common/options/withdrawCategoryOptions";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Withdraw } from "../../../app/models/withdraw";


export default observer(function WithdrawForm() {
    const history = useHistory();
    const { withdrawStore } = useStore();
    const { createWithdraw, updateWithdraw, loading, loadWithdraw, loadingInitial } = withdrawStore;
    const { id } = useParams<{ id: string }>();
    const [withdraw, setWithdraw] = useState<Withdraw>({
        id: '',
        accountNumber: '',
        amount: '',
        date: null,
        pin: ''
    });

    const validationSchema = Yup.object({
        accountNumber: Yup.string().required('Account number is required'),
        amount: Yup.string().required('Amount is required'),
        date: Yup.string().required('Date is required').nullable(),
        pin: Yup.string().required('PIN is required'),
    })

    useEffect(() => {
        if (id) loadWithdraw(id).then(withdraw => setWithdraw(withdraw!))
    }, [id, loadWithdraw]);




    function handleFormSubmit(withdraw: Withdraw) {
        if (withdraw.id.length === 0) {
            let newWithdraw = {
                ...withdraw,
                id: uuid()
            };
            createWithdraw(newWithdraw).then(() => history.push(`/withdraws/${newWithdraw.id}`))
        } else {
            updateWithdraw(withdraw).then(() => history.push(`/withdraws/${withdraw.id}`))
        }
    }


    if (loadingInitial) return <LoadingComponent content='Loading withdraw...' />

    return (
        <Segment clearing>
            <Header content='Withdraw Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema} 
                enableReinitialize 
                initialValues={withdraw} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='Account Number' name='accountNumber' />
                        <MySelectInput options={withdrawCategoryOptions} placeholder='Amount'  name='amount'  />
                        <MyDateInput 
                            placeholderText='Date'  
                            name='date' 
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <MyTextInput type="password" placeholder='Pin'  name='pin'  />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid} 
                            loading={loading} floated='right' 
                            positive type='submit' content='Submit' />
                        <Button as={Link} to='/withdraw' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})