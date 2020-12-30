// next.config.js
const withSass = require('@zeit/next-sass');
const withPWA = require('next-pwa');
module.exports = withSass(
    {
        postcssLoaderOptions: {
            plugins: [require('autoprefixer')({})]
        },
        ...withPWA({
            pwa: {
                dest: 'public'
            }
        })
    }
);
