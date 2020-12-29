import React from "react";
import Layout from "../components/layout";
import Button from "../components/button";
import {TitleText} from "../components/titleText";
import './index.scss';

function IndexPage() {
    return (
        <Layout>
            <TitleText>Pick a game</TitleText>
            <div className="games-list">
                <Button className="button--opacity-low" click="/games/never">Never Ever</Button>
                <Button className="button--opacity-low" click="/games/truthOrDare">Truth or Dare</Button>
                <Button className="button--opacity-low" click="/games/magicConch">Magic Conch</Button>
                <Button className="button--opacity-low" click="/games/comingSoon">...</Button>
            </div>
            <div className="author">
                an App by <a href="https://github.com/AmazingTurtle" target="_blank">Felix Faust</a>
            </div>
        </Layout>
    );
}

export default IndexPage
