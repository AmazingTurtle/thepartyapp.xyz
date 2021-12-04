import React, {useCallback} from 'react';
import {TitleText} from '../components/titleText';
import Layout from '../components/layout';

export default function Utils() {
    const textareaRef = React.useRef(null);

    const onClickTransformJson = useCallback(() => {
        const text = textareaRef.current.value;
        const lines = text.split(/[\r\n]+/g);
        const output = [];
        for (const line of lines) {
            const rawLine = line.replace(/^(-|(\d+\.?))\s*(Ich habe? noch nie)?\s*(.*?)$/, '$4').trim();
            if (rawLine.length > 1) {
                output.push({question: rawLine, level: 0});
            }
        }
        console.log(output);
    }, [textareaRef]);

    return (
        <Layout>
            <TitleText>Utils</TitleText>
            <textarea style={{display: 'block', width: '100%'}} rows={20} ref={textareaRef}/>
            <button onClick={onClickTransformJson} type="button">Transform JSON to console</button>
        </Layout>
    )

}
