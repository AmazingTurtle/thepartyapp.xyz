import React from "react";
import {Frame} from "framer";

function BottleSpin({spin}) {
    return (
        <Frame
            className="truthOrDare__bottle"
            animate={{
                rotate: spin
            }}
            transition={{
                duration: 2
            }}
        >
            <img alt="bottle" src="/icons/bottle.png" />
        </Frame>
    );
}

export default BottleSpin;
