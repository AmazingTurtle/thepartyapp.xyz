import React from "react";
import './titleText.scss';

export const TitleText = ({className, children}) => (
    <div className={`titleText ${className || ''}`}>
        {children}
    </div>
);
