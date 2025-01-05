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
import { Salary } from "../../../app/models/salary";


export default observer(function SalaryForm() {
    const history = useHistory();
    const { salaryStore } = useStore();
    const { createSalary, updateSalary, loading, loadSalary, loadingInitial } = salaryStore;
    const { id } = useParams<{ id: string }>();
    const [salary, setSalary] = useState<Salary>({
        id:'',
    accountNumber:'',
    anualSalary: '',
    monthlyPayment: '',
    date:null
    });

    const validationSchema = Yup.object({
        accountNumber:Yup.string().required('Account number is required'),
        anualSalary:Yup.string().required('Anual salary is required'),
        monthlyPayment:Yup.string().required('Monthly payment is required'),
        date:Yup.string().required('Date is required'),
    })


    useEffect(() =>{
        if (id) loadSalary(id).then(salary => setSalary(salary!));
    },[id,loadSalary])


    function handleFormSubmit(salary : Salary){

        if(salary.id.length === 0 ){
            let newSalary ={
                ...salary,
                id:uuid()
            };

            createSalary(newSalary).then(() => history.push(`/salary/${newSalary.id}`))
        }else{
            updateSalary(salary).then(() => history.push(`/salary/${salary.id}`))

        }
    }


    if (loadingInitial) return <LoadingComponent content='Loading salary...' />

    return (
        <Segment clearing>
            <Header content='Salary Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={salary} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                          <MyTextInput  placeholder="Account Number"  name="accountNumber" />
                          <MyTextInput  placeholder="Anual Salary"  name="anualSalary" />
                          <MyTextInput  placeholder="Monthly Payment"   name="monthlyPayment" />
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
                        <Button as={Link} to='/salary' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})