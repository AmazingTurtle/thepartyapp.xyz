// next.config.js
const PHASE_PRODUCTION_BUILD = require('next/constants');

const withPWA = require('next-pwa');

module.exports = (phase) => {

    let baseConfiguration = {
        postcssLoaderOptions: {
            plugins: [require('autoprefixer')({})]
        }
    };

    if (phase === PHASE_PRODUCTION_BUILD) {
        baseConfiguration = {
            ...baseConfiguration,
            ...withPWA({
                pwa: {
                    dest: 'public'
                }
            })
        };
    }

    return baseConfiguration;

};
