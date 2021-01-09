import React, {useCallback, useState} from 'react';
import Layout from '../../components/layout';
import {TitleText} from '../../components/titleText';
import bigKingsCup from './bigKingsCup.json';

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function BigKingsCupCards({currentCard, newCard, showInfo, setShowInfo}) {

    const clickInfoCallback = useCallback((e) => {
        console.log('clicked info for', currentCard);
        setShowInfo(oldShowInfo => !oldShowInfo);
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, [currentCard, setShowInfo]);

    if (currentCard === undefined) {
        return (
            <>
                <div className="bigKingsCup__subtitle">Drücken um Karte zu ziehen</div>
                <div className="bigKingsCup__cards" onClick={newCard}>
                    <div className="bigKingsCup__cards__stack">
                        <div className="bigKingsCup__cards__stack__card" />
                        <div className="bigKingsCup__cards__stack__card" />
                        <div className="bigKingsCup__cards__stack__card" />
                        <div className="bigKingsCup__cards__stack__card" />
                        <div className="bigKingsCup__cards__stack__card" />
                    </div>
                </div>
            </>
        );
    } else {

        const cardType = currentCard.split('_')[1];
        const cardInfo = bigKingsCup.explain[cardType];

        return (
            <>
                <div className="bigKingsCup__subtitle">Drücken um Karte zu ziehen</div>
                <div className="bigKingsCup__cards bigKingsCup__cards--state-active" onClick={newCard}>
                    <div className="bigKingsCup__cards__stack bigKingsCup__cards__stack--state-behind">
                        <div className="bigKingsCup__cards__stack__card" />
                        <div className="bigKingsCup__cards__stack__card" />
                        <div className="bigKingsCup__cards__stack__card" />
                        <div className="bigKingsCup__cards__stack__card" />
                        <div className="bigKingsCup__cards__stack__card" />
                    </div>
                    <div className="bigKingsCup__cards__current-card">
                        <svg
                            width="170"
                            height="245"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {showInfo ? (
                                <use href={`/icons/card.svg#alternate-back`} x="0" y="0"/>
                            ) : (
                                <use href={`/icons/card.svg#${currentCard}`} x="0" y="0"/>
                            )}
                        </svg>
                        <div className="bigKingsCup__cards__current-card__info-button" onClick={clickInfoCallback} />
                        {showInfo && (
                            <div className="bigKingsCup__cards__current-card__info-text">
                                <h1>{cardInfo?.title}</h1>
                                <p>{cardInfo?.text}</p>
                            </div>
                        )}
                    </div>
                </div>

            </>
        );
    }
}

function BigKingsCupPage() {

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

export default BigKingsCupPage;
