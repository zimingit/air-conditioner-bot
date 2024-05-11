FROM node:18

# Create app directory
WORKDIR /app

COPY climate-express /app/climate-express
COPY web-client /app/web-client
COPY deploy.sh /app


CMD ["bash", "deploy.sh"]

# EXPOSE 8000
# CMD [ "node", "index.js" ]