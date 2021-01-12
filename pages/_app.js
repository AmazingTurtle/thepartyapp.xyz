import './_app.scss';
import Head from 'next/head';

export default function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-15TP6HJEBM"/>
                <script dangerouslySetInnerHTML={{
                    __html: 'window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'G-15TP6HJEBM\');'
                }}>

                </script>
            </Head>
            <Component {...pageProps} />
        </>
    );
}
