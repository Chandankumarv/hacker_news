FROM node:12 as builder
WORKDIR /opt/mount1/build/hacker_news
COPY ./ ./
RUN npm ci
RUN npm run build:ssr

FROM node:12
WORKDIR /opt/mount1/hacker_news
COPY --from=builder /opt/mount1/build/hacker_news/dist ./dist/
COPY --from=builder /opt/mount1/build/hacker_news/package*.json ./
EXPOSE 4000

CMD ["npm", "run", "serve:ssr"]
