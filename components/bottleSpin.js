import React from "react";
import styled, {keyframes} from 'styled-components';

const spinAnimation = spin => keyframes`
        0% { transform: rotate(0deg); }
      100% { transform: rotate(${spin}deg); }
    `;
const StyledDiv = styled.div`
      animation: ${props => spinAnimation(props.spin)} 2s ease forwards;
    `;

function BottleSpin({spin}) {
    return (
        <StyledDiv
            className="truthOrDare__bottle"
            spin={spin}
        >
            <img alt="bottle" src="/icons/bottle.svg" />
        </StyledDiv>
    );
}

export default BottleSpin;
