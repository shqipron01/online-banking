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
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Transaction } from "../../../app/models/transaction";
import { transactionCategoryOptions } from "../../../app/common/options/transactionCategoryOptions";


export default observer(function TransactionForm() {
    const history = useHistory();
    const { transactionStore } = useStore();
    const { createTransaction, updateTransaction, loading, loadTransaction, loadingInitial } = transactionStore;
    const { id } = useParams<{ id: string }>();
    const [transaction, setTransaction] = useState<Transaction>({
        id:'',
        type:'',
        amount: '',
        date: null,
        payee:''
    });

 

    const validationSchema = Yup.object({
        type:Yup.string().required('Type is required'),
        amount:Yup.string().required('Amount is required'),
        date:Yup.string().required('Date is required'),
       payee:Yup.string().required('Payee is required'),
   
    })


    useEffect(() =>{
        if (id) loadTransaction(id).then(transaction => setTransaction(transaction!));
    },[id,loadTransaction])


    function handleFormSubmit(transaction : Transaction){

        if(transaction.id.length === 0 ){
            let newTransaction ={
                ...transaction,
                id:uuid()
            };

            createTransaction(newTransaction).then(() => history.push(`/transaction/${newTransaction.id}`))
        }else{
            updateTransaction(transaction).then(() => history.push(`/transaction/${transaction.id}`))

        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading transaction...' />

    return (
        <Segment clearing>
            <Header content='Transaction Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={transaction} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                       <MySelectInput options={transactionCategoryOptions} placeholder='Type' name='type'  />
                        <MyTextInput  placeholder="Amount"  name="amount" />
                        <MyDateInput
                            placeholderText='Date' 
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                            />
                               <MyTextInput  placeholder="Payee" name="payee" />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' 
                            positive type='submit' content='Submit' />
                        <Button as={Link} to='/transaction' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})