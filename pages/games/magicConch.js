import React, {useCallback, useState} from "react";
import Layout from "../../components/layout";
import {TitleText} from "../../components/titleText";
import Button from "../../components/button";
import magicConch from "./magicConch.json";
import './magicConch.scss';

function MagicConchPage() {

    const [answer, setAnswer] = useState('Frag einfach und du bekommst eine Antwort!');
    const whatsup = useCallback(() => {
        setAnswer(magicConch.answers[Math.floor(Math.random() * magicConch.answers.length)])
    }, []);

    return (
        <Layout game="magicConch">
            <TitleText>
                Die magische Miesmuschel
            </TitleText>
            <TitleText className="magicConch__answer">{answer}</TitleText>
            <div className="magicConch__conch"/>
            <Button click={whatsup}>What's up</Button>
        </Layout>
    );
}

export default MagicConchPage
