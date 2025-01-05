import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import SalaryListItem from "./SalaryListItem";



export default observer(function SalaryList() {
    const { salaryStore } = useStore();
    const { groupedSalary } = salaryStore;


    return (
        <>
            {groupedSalary.map(([group, salarys]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {salarys.map(salary => (
                                <SalaryListItem key={salary.id} salary={salary} />
                            ))}
                </Fragment>
            ))}
        </>
    )
})