import React, {useCallback} from 'react';
import bigKingsCup from '../pages/games/bigKingsCup.json';

export function BigKingsCupCards({currentCard, newCard, showInfo, setShowInfo}) {

    const clickInfoCallback = useCallback((e) => {
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
