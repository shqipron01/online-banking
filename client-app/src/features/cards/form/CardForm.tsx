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
import { cardCategoryOptions } from "../../../app/common/options/cardCategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Cards } from "../../../app/models/card";


export default observer(function CardForm() {
    const history = useHistory();
    const { cardStore } = useStore();
    const { createCard, updateCard, loading, loadCard, loadingInitial } = cardStore;
    const { id } = useParams<{ id: string }>();
    const [card, setCard] = useState<Cards>({
        id: '',
        accountNumber: '',
        cardType: '',
        cardNumber: '',
        expirationDate: null
    });

    const validationSchema = Yup.object({
        accountNumber: Yup.string().required('Account number is required'),
        cardType: Yup.string().required('Card type is required'),
        cardNumber: Yup.string().required('Card number is required'),
        expirationDate: Yup.string().required('Expiration date is required').nullable(),
    })

    useEffect(() => {
        if (id) loadCard(id).then(card => setCard(card!))
    }, [id, loadCard]);



    function handleFormSubmit(card: Cards) {
        if (card.id.length === 0) {
            let newCard = {
                ...card,
                id: uuid()
            };
            createCard(newCard).then(() => history.push(`/cards/${newCard.id}`))
        } else {
            updateCard(card).then(() => history.push(`/cards/${card.id}`))
        }
    }


    if (loadingInitial) return <LoadingComponent content='Loading card...' />

    return (
        <Segment clearing>
            <Header content='Card Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema} 
                enableReinitialize 
                initialValues={card} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='Account Number' name='accountNumber' />
                        <MySelectInput options={cardCategoryOptions} placeholder='Card Type'  name='cardType'  />
                        <MyTextInput placeholder='Card Number' name='cardNumber'  />
                        <MyDateInput 
                            placeholderText='Expiration Date' 
                            name='expirationDate' 
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                         />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid} 
                            loading={loading} floated='right' 
                            positive type='submit' content='Submit' />
                        <Button as={Link} to='/cards' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})