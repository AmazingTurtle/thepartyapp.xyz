import React from 'react';
import Button from '../components/button';
import Layout from '../components/layout';
import {TitleText} from '../components/titleText';

function IndexPage() {
    return (
        <Layout>
            <TitleText>Wähle ein Spiel</TitleText>
            <div className="games-list">
                <Button className="button--opacity-low" click="/games/never">Ich hab noch nie</Button>
                <Button className="button--opacity-low" click="/games/truthOrDare">Wahrheit oder Pflicht</Button>
                {/*<Button className="button--opacity-low" click="/games/bigKingsCup">Big Kings Cup</Button>*/}
                <Button className="button--opacity-low" click="/games/magicConch">Magische Miesmuschel</Button>
            </div>
            <div className="author">
                eine App von <a href="https://github.com/AmazingTurtle" target="_blank">Felix Faust</a>
            </div>
        </Layout>
    );
}

export default IndexPage;
