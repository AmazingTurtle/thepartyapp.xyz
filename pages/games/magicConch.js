import React, {useCallback, useState} from 'react';
import Button from '../../components/button';
import Layout from '../../components/layout';
import {TitleText} from '../../components/titleText';
import magicConch from './magicConch.json';

function MagicConchPage() {

    const [answer, setAnswer] = useState('Frag die magische Miesmuschel ein Ja/Nein Antwort und drücke auf den unteren Button!');
    const onClick = useCallback(() => {
        setAnswer(magicConch.answers[Math.floor(Math.random() * magicConch.answers.length)]);
    }, []);

    return (
        <Layout game="magicConch">
            <TitleText>
                Die magische Miesmuschel
            </TitleText>
            <TitleText className="magicConch__answer">{answer}</TitleText>
            <div className="magicConch__conch"/>
            <Button onClick={onClick}>Gib mir eine Antwort</Button>
        </Layout>
    );
}

export default MagicConchPage;
