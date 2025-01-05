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
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Payment } from "../../../app/models/payment";


export default observer(function PaymentForm() {
    const history = useHistory();
    const { paymentStore } = useStore();
    const { createPayment, updatePayment, loading, loadPayment, loadingInitial } = paymentStore;
    const { id } = useParams<{ id: string }>();
    const [payment, setPayment] = useState<Payment>({
        id:'',
        account:'',
        amount: '',
        date:null,
        payee:'',

        });
    
        
        const validationSchema = Yup.object({
            account:Yup.string().required('Account is required'),
            amount:Yup.string().required('Amount is required'),
            date:Yup.string().required('Date is required'),
            payee:Yup.string().required('Payee is required'),
    
        })

        useEffect(() =>{
            if (id) loadPayment(id).then(payment => setPayment(payment!));
        },[id,loadPayment])
    
    
        function handleFormSubmit(payment : Payment){
    
            if(payment.id.length === 0 ){
                let newPayment ={
                    ...payment,
                    id:uuid()
                };
    
                createPayment(newPayment).then(() => history.push(`/payment/${newPayment.id}`))
            }else{
                updatePayment(payment).then(() => history.push(`/payment/${payment.id}`))
    
            }
        }


    if (loadingInitial) return <LoadingComponent content='Loading payment...' />

    return (
        <Segment clearing>
            <Header content='Payment Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={payment} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput  placeholder="Account"  name="account" />
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
                        <Button as={Link} to='/payment' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})