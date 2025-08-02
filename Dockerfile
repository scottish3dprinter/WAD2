FROM node:24-alpine 

RUN apk add --no-cache \
    curl

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Run the application
CMD ["npm", "start"]
