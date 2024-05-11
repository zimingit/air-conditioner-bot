FROM node:18

# Create app directory
WORKDIR /app

COPY climate-express /app/climate-express
COPY web-client /app/web-client
COPY deploy.sh /app


CMD ["bash", "deploy.sh"]

# COPY climate-express/package-lock.json app/
# COPY climate-express/package.json app/

# RUN npm install

# Bundle app source
# COPY climate-express /app

# EXPOSE 8000
# CMD [ "node", "index.js" ]