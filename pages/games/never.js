import React, {useCallback, useEffect, useMemo, useState} from "react";
import never from "./never.json";
import Layout from "../../components/layout";
import Button from "../../components/button";
import {TitleText} from "../../components/titleText";
import './never.scss';

function NeverPage() {
    const [questionsToPick, setQuestionsToPick] = useState(never.questions);
    const [questionFilter, setQuestionFilter] = useState(0);
    const [question, setQuestion] = useState({question: '...', level: 0});

    const newQuestionCallback = useCallback(() => {
        let filteredQuestions = questionFilter !== undefined ? questionsToPick.filter(question => question.level === questionFilter) : questionsToPick;

        // de-duplicate
        if (filteredQuestions.length === 0) {
            setQuestionsToPick(never.questions);
            filteredQuestions = never.questions;
        } else {
            setQuestionsToPick(oldQuestionsToPick => {
                oldQuestionsToPick.splice(oldQuestionsToPick.indexOf(picked), 1);
                return oldQuestionsToPick;
            });
        }

        const picked = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];

        setQuestion(picked);
    }, [questionFilter]);

    useEffect(newQuestionCallback, [questionFilter]);

    const menu = useMemo(() => [{
        click: () => setQuestionFilter(0),
        content: 'kids'
    }, {
        click: () => setQuestionFilter(1),
        content: '18+'
    } , {
        click: () => setQuestionFilter(undefined),
        content: 'alle'
    }], [questionFilter]);

    return (
        <Layout menu={menu}>
            <div className={`never never--level-${question.level}`}>
                <TitleText className="never__ihavenever">
                    <span className="emoji" />I have never
                </TitleText>
                <div className="never__question">{question.question}</div>
                <Button className="never__next" click={newQuestionCallback}>Next</Button>
            </div>
        </Layout>
    );
}

export default NeverPage
