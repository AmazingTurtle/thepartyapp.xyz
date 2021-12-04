import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Button from '../../components/button';
import Layout from '../../components/layout';
import {TitleText} from '../../components/titleText';
import never from './never.json';

export default function NeverPage() {
    const [questionsToPick, setQuestionsToPick] = useState(never.questions);
    const [questionFilter, setQuestionFilter] = useState(0);
    const [question, setQuestion] = useState({question: '...', level: 0});

    const newQuestionCallback = useCallback(() => {
        let filteredQuestions = questionFilter !== undefined
            ? questionsToPick.filter(question => {
                if (questionFilter === 0) return question.level === questionFilter;
                if (questionFilter === 1) return question.level >= questionFilter;
            })
            : questionsToPick;

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
        onClick: () => setQuestionFilter(0),
        content: 'kids'
    }, {
        onClick: () => setQuestionFilter(1),
        content: '18+'
    }, {
        onClick: () => setQuestionFilter(undefined),
        content: 'alle'
    }], [questionFilter]);

    return (
        <Layout menu={menu}>
            <div className={`never never--level-${question.level}`}>
                <TitleText className="never__ihavenever">
                    <span className="emoji"/>Ich hab noch nie
                </TitleText>
                <div className="never__question">{question.question}</div>
                <Button className="never__next" onClick={newQuestionCallback}>Next</Button>
            </div>
        </Layout>
    );
}
