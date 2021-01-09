import React from "react";

export const TitleText = ({className, children}) => (
    <div className={`titleText ${className || ''}`}>
        {children}
    </div>
);
