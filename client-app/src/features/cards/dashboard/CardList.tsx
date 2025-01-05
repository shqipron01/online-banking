import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import CardListItem from "./CardListItem";


export default observer(function CardList() {
    const { cardStore } = useStore();
    const { groupedCards } = cardStore;

    return (
        <>
            {groupedCards.map(([group, cards]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {cards.map(card => (
                                <CardListItem key={card.id} card={card} />
                            ))}
                </Fragment>
            ))}
        </>
    )
})