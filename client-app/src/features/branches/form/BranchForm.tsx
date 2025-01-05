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
import { Branch } from "../../../app/models/branch";
import { branchCategoryOptions } from "../../../app/common/options/branchCategoryOptions";


export default observer(function BranchForm() {
    const history = useHistory();
    const { branchStore } = useStore();
    const { createBranch, updateBranch, loading, loadBranch, loadingInitial } = branchStore;
    const { id } = useParams<{ id: string }>();
    const [branch, setBranch] = useState<Branch>({
        id: "",
        bank:"",
        branchNumber: "",
        country: "",
        city: "",
        address: "",
        date:null

    });

    const validationSchema = Yup.object({

        bank:Yup.string().required('Bank name is required'),
        branchNumber:Yup.string().required('Branch number is required'),
        country:Yup.string().required('Country is required'),
        city:Yup.string().required('City is required'),
        address:Yup.string().required('Address is required'),
        date:Yup.string().required('Date is required')
    })

    useEffect(() => {
        if (id) loadBranch(id).then(branch => setBranch(branch!))
    }, [id, loadBranch]);


    function handleFormSubmit(branch : Branch){
        if(branch.id.length === 0 ){
            let newBranch ={
                ...branch,
                id:uuid()
            };
            createBranch(newBranch).then(() => history.push(`/branches/${newBranch.id}`))
        }else{
            updateBranch(branch).then(() => history.push(`/branches/${branch.id}`))
        }
    }


    if (loadingInitial) return <LoadingComponent content='Loading branch...' />

    return (
        <Segment clearing>
            <Header content='Branches Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={branch} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='bank' placeholder='Bank' />
                        <MyTextInput placeholder='Branch Number' name='branchNumber'  />
                        <MyTextInput placeholder='Country' name='country'  />
                        <MySelectInput options={branchCategoryOptions} placeholder='City' name='city'  />
                        <MyTextInput placeholder='Address' name='address'  />
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
                        <Button as={Link} to='/branches' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})