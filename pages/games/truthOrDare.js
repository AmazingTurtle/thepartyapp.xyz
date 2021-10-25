import dynamic from 'next/dynamic';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Button from '../../components/button';
import Layout from '../../components/layout';
import {TitleText} from '../../components/titleText';
import truthOrDare from './truthOrDare.json';

const BottleSpin = dynamic(() => import('../../components/bottleSpin'), {
    ssr: false
});

const ROLL_THE_DICE_INITIAL = 0;
const ROLL_THE_DICE_RESTART = 1;

export default function TruthOrDarePage() {
    const [rollTheDice, setRollTheDice] = useState(ROLL_THE_DICE_RESTART);
    const [randomRotation, setRandomRotation] = useState(0);

    const [currentTruthOrDare, setCurrentTruthOrDare] = useState({
        text: '...',
        category: 'truth'
    });

    const actuallyRollIt = useMemo(() => () => {
        const numberOfRandomSpins = 5;
        const numberOfAlwaysSpins = 2;
        const circleRad = 360;
        setRandomRotation(Math.floor((Math.random() + numberOfAlwaysSpins) * circleRad + (numberOfRandomSpins * Math.random() * circleRad)));
        setRollTheDice(ROLL_THE_DICE_INITIAL);
    }, []);

    const rollTheDiceContinue = useCallback(() => {
        if (rollTheDice === ROLL_THE_DICE_INITIAL) {
            setRollTheDice(ROLL_THE_DICE_RESTART);
        } else if (rollTheDice === ROLL_THE_DICE_RESTART) {
            actuallyRollIt();
        }
    }, [setRollTheDice, actuallyRollIt, rollTheDice]);


    const truthCallback = useCallback(() => {
        setCurrentTruthOrDare({
            text: truthOrDare.truth[Math.floor(Math.random() * truthOrDare.truth.length)],
            category: 'truth'
        });
        rollTheDiceContinue();
    }, [rollTheDice]);
    const dareCallback = useCallback(() => {
        setCurrentTruthOrDare({
            text: truthOrDare.dare[Math.floor(Math.random() * truthOrDare.dare.length)],
            category: 'dare'
        });
        rollTheDiceContinue();
    }, [rollTheDice]);
    const randomCallback = useCallback(() => {
        const isTruth = Math.random() < 0.5;
        if (isTruth) {
            truthCallback();
        } else {
            dareCallback();
        }
    }, [rollTheDice]);

    const rollTheDiceHot = useCallback(() => {
        actuallyRollIt();
    }, []);
    useEffect(randomCallback, []);

    if (rollTheDice === ROLL_THE_DICE_INITIAL) {
        return (
            <Layout>
                <div className="truthOrDare truthOrDare--state-roll-the-dice-initial">
                    <div className="truthOrDare__bottle_wrapper">
                        <BottleSpin spin={randomRotation}/>
                    </div>

                    <Button className="button--opacity-low truthOrDare__next truthOrDare__next--type-truth"
                            onClick={truthCallback}>Wahrheit</Button>
                    <Button className="button--opacity-low truthOrDare__next truthOrDare__next--type-dare"
                            onClick={dareCallback}>Pflicht</Button>
                    <Button className="button--opacity-low truthOrDare__next truthOrDare__next--type-random"
                            onClick={randomCallback}>Zufall</Button>

                    <div className="truthOrDare__rules">
                        <h1>Es gibt Regeln?</h1>
                        <ul>
                            <li>Eine Pflicht überspringen geht - kostet aber einen Shot</li>
                            <li>Radler ist kein Alkohol, trink das was die anderen auch trinken!</li>
                            <li>Du darfst nicht zwei mal hintereinander die Pflicht überspringen</li>
                            <li>Wenn die Wahrheit/Pflicht nicht auf die Zutrifft oder du keine Antwort hast, wähle
                                nochmal aus der Kategorie oder trinke einen.
                            </li>
                        </ul>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="truthOrDare truthOrDare--state-roll-the-dice-restart">
                <TitleText>{currentTruthOrDare.category === 'truth' ? 'Wahrheit' : 'Pflicht'}</TitleText>
                <div className="truthOrDare__text">{currentTruthOrDare.text}</div>
                <div className="truthOrDare__bottle-button" onClick={rollTheDiceHot}>
                    <div className="truthOrDare__bottle-button__button">
                        <img alt="bottle" src="/icons/bottle.svg"/>
                    </div>
                    <Button className="truthOrDare__next truthOrDare__next--type-restart" onClick={rollTheDiceContinue}>Noch
                        mal</Button>
                </div>
            </div>
        </Layout>
    );
}
