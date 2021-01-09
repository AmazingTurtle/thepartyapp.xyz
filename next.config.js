// next.config.js
const PHASE_PRODUCTION_BUILD = require('next/constants');

const withSass = require('@zeit/next-sass');
const withPWA = require('next-pwa');

module.exports = (phase) => {

    let sassConfiguration = {
        postcssLoaderOptions: {
            plugins: [require('autoprefixer')({})]
        }
    };

    if (phase === PHASE_PRODUCTION_BUILD) {
        sassConfiguration = {
            ...sassConfiguration,
            ...withPWA({
                pwa: {
                    dest: 'public'
                }
            })
        };
    }

    return withSass(sassConfiguration);

};
