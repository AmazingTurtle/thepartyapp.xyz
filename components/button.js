import Link from "next/link";
import React from "react";

function Button({onClick, children, className}) {
    return typeof onClick === 'string' && (
        <Link href={onClick}>
            <a className={`button ${className || ''}`}>{children}</a>
        </Link>
    ) || (
        <a className={`button ${className || ''}`} href="#" onClick={onClick}>{children}</a>
    );
}

export default Button;
