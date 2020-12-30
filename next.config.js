// next.config.js
const withSass = require('@zeit/next-sass');
const withOffline = require('next-offline');
module.exports = withSass(
    {
        postcssLoaderOptions: {
            plugins: [require('autoprefixer')({})]
        },
        ...withOffline({
            workboxOpts: {
                runtimeCaching: [
                    {
                        urlPattern: /^https?.*/,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'offlineCache',
                            expiration: {
                                maxEntries: 200
                            }
                        }
                    }
                ]
            }
        })
    }
);
