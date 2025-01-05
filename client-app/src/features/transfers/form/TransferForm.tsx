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
import { transferCategoryOptions } from "../../../app/common/options/transferCategoryOptions";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Transfer } from "../../../app/models/transfer";


export default observer(function TransferForm() {
    const history = useHistory();
    const { transferStore } = useStore();
    const { createTransfer, updateTransfer, loading, loadTransfer, loadingInitial } = transferStore;
    const { id } = useParams<{ id: string }>();
    const [transfer, setTransfer] = useState<Transfer>({
        id: '',
        transferNumber: '',
        accountNumber: '',
        amount: '',
        payee: '',
        date: null
    });

    const validationSchema = Yup.object({
        transferNumber: Yup.string().required('Transfer number is required'),
        accountNumber: Yup.string().required('Account number is required'),
        amount: Yup.string().required('Amount is required'),
        payee: Yup.string().required('Payee is required'),
        date: Yup.string().required('Date is required').nullable(),
    })

    useEffect(() => {
        if (id) loadTransfer(id).then(transfer => setTransfer(transfer!))
    }, [id, loadTransfer]);



    function handleFormSubmit(transfer: Transfer) {
        if (transfer.id.length === 0) {
            let newTransfer = {
                ...transfer,
                id: uuid()
            };
            createTransfer(newTransfer).then(() => history.push(`/transfers/${newTransfer.id}`))
        } else {
            updateTransfer(transfer).then(() => history.push(`/transfers/${transfer.id}`))
        }
    }


    if (loadingInitial) return <LoadingComponent content='Loading transfer...' />

    return (
        <Segment clearing>
            <Header content='Transfer Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema} 
                enableReinitialize 
                initialValues={transfer} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='Transfer Number' name='transferNumber' />
                        <MyTextInput placeholder='Account Number'  name='accountNumber'  />
                        <MySelectInput options={transferCategoryOptions} placeholder='Amount'  name='amount'  />
                        <MyTextInput placeholder='Payee'  name='payee'  />
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
                        <Button as={Link} to='/transfers' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})