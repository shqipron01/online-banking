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
import { Interest } from "../../../app/models/interest";
import { interestCategoryOptions } from "../../../app/common/options/interestCategoryOptions";


export default observer(function InterestForm() {
    const history = useHistory();
    const { interestStore } = useStore();
    const { createInterest, updateInterest, loading, loadInterest, loadingInitial } = interestStore;
    const { id } = useParams<{ id: string }>();
    const [interest, setInterest] = useState<Interest>({
        id: '',
        type: '',
        amount: '',
        interestRate: '',
        monthsNumber: '',
        date: null
    });

    const validationSchema = Yup.object({
        type: Yup.string().required('Type is required'),
        amount: Yup.string().required('Amount is required'),
        interestRate: Yup.string().required('Interest rate is required'),
        monthsNumber: Yup.string().required('Months number is required'),
        date: Yup.string().required('Date is required').nullable(),
    
    })

    useEffect(() => {
        if (id) loadInterest(id).then(interest => setInterest(interest!));
    }, [id, loadInterest])


    function handleFormSubmit(interest: Interest) {

        if (interest.id.length === 0) {
            let newInterest = {
                ...interest,
                id: uuid()
            };

            createInterest(newInterest).then(() => history.push(`/interest/${newInterest.id}`))
        } else {
            updateInterest(interest).then(() => history.push(`/interest/${interest.id}`))

        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading interest...' />
    return (
        <Segment clearing>
            <Header content='Interest Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={interest}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MySelectInput options={interestCategoryOptions} placeholder='Type' name='type' />
                        <MyTextInput placeholder="Amount" name="amount" />
                        <MyTextInput placeholder="Interest Rate" name="interestRate" />
                        <MyTextInput placeholder="Months Number" name="monthsNumber" />
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
                        <Button as={Link} to='/interest' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})