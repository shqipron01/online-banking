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
import { Deposit } from "../../../app/models/deposit";
import { depositCategoryOptions } from "../../../app/common/options/depositCategoryOptions";


export default observer(function AccountForm() {
    const history = useHistory();
    const { depositStore } = useStore();
    const { createDeposit, updateDeposit, loading, loadDeposit, loadingInitial } = depositStore;
    const { id } = useParams<{ id: string }>();
    const [deposit, setDeposit] = useState<Deposit>({
        id: '',
        account: '',
        amount: '',
        date: null,
        payee: ''
    });

    const validationSchema = Yup.object({
        account: Yup.string().required('Account is required'),
        amount: Yup.string().required('Amount is required'),
        date: Yup.string().required('Date is required'),
        payee: Yup.string().required('Payee is required'),
    })


    useEffect(() => {
        if (id) loadDeposit(id).then(deposit => setDeposit(deposit!));
    }, [id, loadDeposit])


    function handleFormSubmit(deposit: Deposit) {

        if (deposit.id.length === 0) {
            let newDeposit = {
                ...deposit,
                id: uuid()
            };

            createDeposit(newDeposit).then(() => history.push(`/deposit/${newDeposit.id}`))
        } else {
            updateDeposit(deposit).then(() => history.push(`/deposit/${deposit.id}`))

        }
    }


    if (loadingInitial) return <LoadingComponent content='Loading deposit...' />

    return (
        <Segment clearing>
            <Header content='Deposit Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={deposit}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder="Account" name="account" />
                        <MySelectInput options={depositCategoryOptions} placeholder="Amount" name="amount" />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <MyTextInput placeholder="Payee" name="payee" />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right'
                            positive type='submit' content='Submit' />
                        <Button as={Link} to='/deposit' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})