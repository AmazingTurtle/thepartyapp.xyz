import React, {useCallback, useState} from 'react';
import Layout from '../../components/layout';
import {TitleText} from '../../components/titleText';
import {BigKingsCupCards} from '../../components/bigKingsCupCards';
import bigKingsCup from './bigKingsCup.json';
import {shuffle} from '../../utils/shuffle';

export default function BigKingsCupPage() {

    const [availableCards, setAvailableCards] = useState([]);
    const [currentCard, setCurrentCard] = useState(undefined);
    const [showInfo, setShowInfo] = useState(false);

    const newCard = useCallback(() => {
        if (showInfo) {
            setShowInfo(false);
        } else {
            const _availableCards = availableCards.length === 0 ? shuffle([...bigKingsCup.cards]) : availableCards;
            const nextCard = _availableCards.pop();
            setAvailableCards(_availableCards);
            setCurrentCard(nextCard);
        }
    }, [showInfo, availableCards, setAvailableCards, setCurrentCard, setShowInfo]);

    return (
        <Layout>
            <div className="bigKingsCup">
                <TitleText>
                    Big King's Cup
                </TitleText>
                <BigKingsCupCards
                    currentCard={currentCard}
                    newCard={newCard}
                    showInfo={showInfo}
                    setShowInfo={setShowInfo}
                />
            </div>
        </Layout>
    );
}
