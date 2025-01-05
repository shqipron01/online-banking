import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
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
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Loan } from "../../../app/models/loan";
import { loanCategoryOptions } from "../../../app/common/options/loanCategoryOptions";


export default observer(function LoanForm() {
    const history = useHistory();

    const {loanStore} = useStore();
    const {createLoan,updateLoan,loading,loadLoan,loadingInitial} = loanStore;
    const {id} = useParams<{id:string}>();
   const [loan,setLoan]= useState<Loan>({
    id: '',
    name: '',
    surname:'',
    accNumber:'',
    type:'',
    amount: '',
    duration:'',
    loanDate: null,
    payments: ''
    });


    const validationSchema = Yup.object({
        name:Yup.string().required('Name is required'),
        surname:Yup.string().required('Surname is required'),
        accNumber:Yup.string().required('Account number is required'),
        type:Yup.string().required('Type is required'),
        amount:Yup.string().required('Amount is required'),
        duration:Yup.string().required('Duration is required'),
        loanDate:Yup.string().required('Loan date is required'),
        payments:Yup.string().required('Payment is required')
    })

    useEffect(() =>{
        if (id) loadLoan(id).then(loan => setLoan(loan!));
    },[id,loadLoan])


    function handleFormSubmit(loan: Loan){

        if(loan.id.length === 0 ){
            let newLoan ={
                ...loan,
                id:uuid()
            };

            createLoan(newLoan).then(() =>history.push(`/loan/${newLoan.id}`))
        }else{
            updateLoan(loan).then(() =>history.push(`/loan/${loan.id}`))

        }
    }
  
    if (loadingInitial) return <LoadingComponent content='Loading Loan' />
    return (
        <Segment clearing>
            <Header content='Loan Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={loan}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                      
                        <MyTextInput placeholder="Name"  name="name" />
                        <MyTextInput  placeholder="Surname"  name="surname" />
                        <MyTextInput   placeholder="Account Number"   name="accNumber"/>
                        <MySelectInput options={loanCategoryOptions} placeholder='Type' name='type' />
                        <MyTextInput placeholder="Amount"  name="amount" />
                        <MyTextInput  placeholder="Duration"  name="duration" />
                        <MyDateInput
                            placeholderText='Loan Date'
                            name='loanDate'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                         <MyTextInput  placeholder="Payments"  name="payments" />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right'
                            positive type='submit' content='Submit' />
                        <Button as={Link} to='/loan' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})