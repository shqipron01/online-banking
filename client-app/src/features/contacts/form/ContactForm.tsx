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
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Contact } from "../../../app/models/contact";


export default observer(function ContactForm() {
    const history = useHistory();
    const { contactStore } = useStore();
    const { createContact, updateContact, loading, loadContact, loadingInitial } = contactStore;
    const { id } = useParams<{ id: string }>();
    const [contact,setContact] = useState<Contact>({
        id: '',
        name: '',
        surname: '',
        email: '',
        phoneNumber:'',
        message: '',
        date:null
    });
   const validationSchema = Yup.object({
       name:Yup.string().required('Name is required'),
       surname:Yup.string().required('Surname is required'),
       email:Yup.string().required('Email is required'),
       phoneNumber:Yup.string().required('Phone number is required'),
       message:Yup.string().required('Message is required'),
       date:Yup.string().required('Date is required')
    })


    useEffect(() =>{
        if (id) loadContact(id).then(contact => setContact(contact!));
    },[id,loadContact])


    function handleFormSubmit(contact : Contact){

        if(contact.id.length === 0 ){
            let newContact ={
                ...contact,
                id:uuid()
            };

            createContact(newContact).then(() => history.push(`/contact/${newContact.id}`))
        }else{
            updateContact(contact).then(() => history.push(`/contact/${contact.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading contact...' />

    return (
        <Segment clearing>
            <Header content='Contact Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={contact} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                <MyTextInput  placeholder="Name" name="name" />
                <MyTextInput  placeholder="Surname"   name="surname"/>
                <MyTextInput type="email"  placeholder="Email"  name="email"/>
                <MyTextInput  placeholder="Phone Number"   name="phoneNumber" />
                <MyTextArea rows={10} placeholder="Report the problem" name="message"  />
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
                        <Button as={Link} to='/contact' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})