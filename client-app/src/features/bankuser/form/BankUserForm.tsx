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
import { BankUser } from "../../../app/models/bankuser";


export default observer(function AccountForm() {
    const history = useHistory();
    const { bankuserStore } = useStore();
    const { createBankUser, updateBankUser, loading, loadBankUser, loadingInitial } = bankuserStore;
    const { id } = useParams<{ id: string }>();
    const [bankuser, setBankUser] = useState<BankUser>({
        id:'',
        name:'',
        surname: '',
        username: '',
        email:'',
        password:'',
        date:null
    });

    const validationSchema = Yup.object({
        name:Yup.string().required('Name is required'),
        surname:Yup.string().required('Surname is required'),
        username:Yup.string().required('Username is required'),
        email:Yup.string().required('Email is required'),
        password:Yup.string().required('Password is required'),
        date:Yup.string().required('Date is required'),
    })

    useEffect(() =>{
        if (id) loadBankUser(id).then(bankuser => setBankUser(bankuser!));
    },[id,loadBankUser])


    function handleFormSubmit(bankuser : BankUser){

        if(bankuser.id.length === 0 ){
            let newBankUser ={
                ...bankuser,
                id:uuid()
            };

            createBankUser(newBankUser).then(() => history.push(`/bankuser/${newBankUser.id}`))
        }else{
            updateBankUser(bankuser).then(() => history.push(`/bankuser/${bankuser.id}`))

        }
    }
    
    if (loadingInitial) return <LoadingComponent content='Loading user...' />

    return (
        <Segment clearing>
            <Header content='User Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={bankuser} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='name' placeholder='Name' />
                        <MyTextInput placeholder='Surname' name='surname'  />
                        <MyTextInput placeholder='Username' name='username'  />
                        <MyTextInput type='email' placeholder='Email' name='email'  />
                        <MyTextInput type="password" placeholder='Password' name='password'  />
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
                        <Button as={Link} to='/bankuser' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})