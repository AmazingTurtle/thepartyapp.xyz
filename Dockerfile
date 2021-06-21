ARG BUILD_TAG
ARG TARGET_TAG
FROM node:${BUILD_TAG} as base

WORKDIR /usr/base
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

FROM base as build

COPY . .

RUN yarn build

FROM node:${TARGET_TAG} as target

WORKDIR /usr/app

COPY --from=build /usr/base/.next ./.next/
COPY --from=build /usr/base/public ./public/
COPY --from=build /usr/base/node_modules ./node_modules/

RUN addgroup -g 1001 -S nodejs \
 && adduser -S app -u 1001 \
 && chown -R app:nodejs /usr/app

RUN ls -la

USER app

CMD [ "npx", "next", "start" ]
