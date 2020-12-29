import React, {useCallback, useEffect, useState, useMemo} from "react";
import Layout from "../../components/layout";
import truthOrDare from "./truthOrDare.json";
import dynamic from 'next/dynamic'
import Button from "../../components/button";
import './truthOrDare.scss';
import {TitleText} from "../../components/titleText";

const BottleSpin = dynamic(() => import('../../components/bottleSpin'), {
    ssr: false
});

const ROLL_THE_DICE_INITIAL = 0;
const ROLL_THE_DICE_PICK = 1;
const ROLL_THE_DICE_RESTART = 2;

function TruthOrDarePage() {
    const [rollTheDice, setRollTheDice] = useState(ROLL_THE_DICE_INITIAL);
    const [randomRotation, setRandomRotation] = useState(0);

    const [currentTruthOrDare, setCurrentTruthOrDare] = useState({
        text: '...',
        category: 'truth'
    });

    const actuallyRollIt = useMemo(() => () => {
        const numberOfRandomSpins = 4;
        const numberOfAlwaysSpins = 1;
        const circleRad = 360;
        setRandomRotation(Math.floor((Math.random() + numberOfAlwaysSpins) * circleRad + (numberOfRandomSpins * Math.random() * 360)));
        setRollTheDice(ROLL_THE_DICE_INITIAL);
    }, []);

    const rollTheDiceContinue = useCallback(() => {
        if (rollTheDice === ROLL_THE_DICE_INITIAL) {
            setRollTheDice(ROLL_THE_DICE_PICK);
        } else if (rollTheDice === ROLL_THE_DICE_PICK) {
            setRollTheDice(ROLL_THE_DICE_RESTART);
        } else if (rollTheDice === ROLL_THE_DICE_RESTART) {
            actuallyRollIt();
        }
    }, [rollTheDice]);


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
                    <TitleText>Spinning...</TitleText>
                    <div className="truthOrDare__bottle_wrapper">
                        <BottleSpin spin={randomRotation} />
                    </div>
                    <Button className="button--opacity-low truthOrDare__next truthOrDare__next--type-pick" click={rollTheDiceContinue}>Next</Button>
                </div>
            </Layout>
        );
    }
    else if (rollTheDice === ROLL_THE_DICE_PICK) {
        return (
            <Layout>
                <div className="truthOrDare truthOrDare--state-roll-the-dice-pick">
                    <TitleText>Truth or Dare</TitleText>
                    <div className="truthOrDare__icons">
                        <div className="truthOrDare__icons__angle" />
                        <div className="truthOrDare__icons__devil" />
                    </div>
                    <Button className="button--opacity-low truthOrDare__next truthOrDare__next--type-truth" click={truthCallback}>Truth</Button>
                    <Button className="button--opacity-low truthOrDare__next truthOrDare__next--type-dare" click={dareCallback}>Dare</Button>
                    <Button className="button--opacity-low truthOrDare__next truthOrDare__next--type-random" click={randomCallback}>Be Lucky</Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="truthOrDare truthOrDare--state-roll-the-dice-restart">
                <TitleText>{currentTruthOrDare.category === 'truth' ? 'Truth' : 'Dare'}</TitleText>
                <div className="truthOrDare__text">{currentTruthOrDare.text}</div>
                <div className="truthOrDare__bottle-button" onClick={rollTheDiceHot}>
                    <div className="truthOrDare__bottle-button__button">
                        <img alt="bottle" src="/icons/bottle.png" />
                    </div>
                    <Button className="truthOrDare__next truthOrDare__next--type-restart">Press to rotate bottle</Button>
                </div>
            </div>
        </Layout>
    );
}

export default TruthOrDarePage
