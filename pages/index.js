import React from 'react';
import Button from '../components/button';
import Layout from '../components/layout';
import {TitleText} from '../components/titleText';
import Link from 'next/link';

function IndexPage() {
    return (
        <Layout>
            <TitleText>Wähle ein Spiel</TitleText>
            <div className="games-list">
                <Button className="button--opacity-low" onClick="/games/never">Ich hab noch nie</Button>
                <Button className="button--opacity-low" onClick="/games/truthOrDare">Wahrheit oder Pflicht</Button>
                <Button className="button--opacity-low" onClick="/games/bigKingsCup">Big King's Cup</Button>
                <Button className="button--opacity-low" onClick="/games/gigalo">Gigalo</Button>
                <Button className="button--opacity-low" onClick="/games/magicConch">Magische Miesmuschel</Button>
            </div>
            <div className="privacy-link">
                <Link href="/privacy"><a>Datenschutz</a></Link>
            </div>
            <div className="author">
                eine App von <a href="https://github.com/AmazingTurtle" target="_blank">Felix Faust </a>
                und <a href="https://juliandik.com/" target="_blank">Julian Dik</a>
            </div>
        </Layout>
    );
}

export default IndexPage;
