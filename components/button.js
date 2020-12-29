import Link from "next/link";
import React from "react";
import "./button.scss";

function Button({click, children, className}) {
    return typeof click === 'string' && (
        <Link href={click}>
            <a className={`button ${className || ''}`}>{children}</a>
        </Link>
    ) || (
        <a className={`button ${className || ''}`} href="#" onClick={click}>{children}</a>
    );
}

export default Button;
