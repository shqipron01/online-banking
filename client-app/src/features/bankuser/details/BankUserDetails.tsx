import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import BankUserDetailedHeader from "./BankUserDetailedHeader";
import BankUserDetailedInfo from "./BankUserDetailedInfo";



export default observer (function BankUserDetails(){
    const {bankuserStore} = useStore();
    const {selectedBankUser: bankuser, loadBankUser, loadingInitial} = bankuserStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadBankUser(id);
    }, [id, loadBankUser])

    if(loadingInitial || !bankuser) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={9}>
                <BankUserDetailedHeader bankuser={bankuser} />
            </Grid.Column>
            <Grid.Column width={7}>
                <BankUserDetailedInfo bankuser={bankuser}/>
            </Grid.Column>
        </Grid>
    )
})