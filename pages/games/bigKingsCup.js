import React from 'react';
import Layout from '../../components/layout';
import {TitleText} from '../../components/titleText';

function BigKingsCupPage() {
    return (
        <Layout>
            <div className="bigKingsCup">
                <TitleText>
                    Big Kings Cup
                </TitleText>
                <div className="bigKingsCup__subtitle">Drücken um Karte zu ziehen</div>
            </div>
        </Layout>
    );
}

export default BigKingsCupPage;
