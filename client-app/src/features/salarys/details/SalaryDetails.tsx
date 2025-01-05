import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import SalaryDetailedInfo from "./SalaryDetailedInfo";
import SalaryDetaledHeader from "./SalaryDetaledHeader";


export default observer (function SalaryDetails(){
    const {salaryStore} = useStore();
    const {selectedSalary: salary, loadSalary, loadingInitial} = salaryStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadSalary(id);
    }, [id, loadSalary])

    if(loadingInitial || !salary) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={9}>
                <SalaryDetaledHeader salary={salary} />
            </Grid.Column>
            <Grid.Column width={7}>
                <SalaryDetailedInfo salary={salary}/>
            </Grid.Column>
        </Grid>
    )
})