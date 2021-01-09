import React, {useMemo} from "react";
import Link from "next/link";
import Head from "next/head";

function MenuEntry({click, children}) {
    return (
        <div className="layout__container__menu__entry">
            <div>
                {typeof click === 'string' && (
                    <Link href={click}>
                        <a>{children}</a>
                    </Link>
                ) || (
                    <a href="#" onClick={click}>{children}</a>
                )}
            </div>
        </div>
    );
}

function Layout({children, menu, game}) {

    const menuRender = useMemo(() => {
        return menu && menu.map((menuEntry, index) => (
            <MenuEntry click={menuEntry.click} key={menuEntry.key || `layout-menu-entry-${index}`}>
                {menuEntry.content}
            </MenuEntry>
        )) || null;
    }, [menu]);

    return (
        <>
            <Head>
                <title>The Party App</title>
                <meta name="description" content="The Party App" />
                <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" />

                <link rel="manifest" href="/pwa.webmanifest" />
                <meta name="theme-color" content="#242424" />
                <link rel="shortcut icon" href="/logo.png" />
                <link rel="apple-touch-icon" href="/logo.png" />
                <meta name="apple-mobile-web-app-title" content="The Party App" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="mobile-web-app-capable" content="yes" />
            </Head>
            <div className={`layout layout--menu-${menu && 'defined' || 'undefined'} ${game ? `layout--game-${game}` : ''}`}>
                <div className="layout__background" />
                <div className="layout__container">
                    <Link href="/">
                        <div className="layout__container__header">
                            <img alt="Back" src="/icons/back.svg" className="layout__container__header__back"  />
                            <img alt="The Party App" src="/logo.svg" className="layout__container__header__logo" />
                        </div>
                    </Link>
                    <div className="layout__container__content">
                        {children}
                    </div>
                    {menuRender && (
                        <div className="layout__container__menu">
                            {menuRender}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Layout
