cd climate-express;
rm -rf view;

cd ../web-client;
rm -rf dist;

npm install;
npm run build;
mv dist ../climate-express/view;

cd ../climate-express;
npm install;
npm run serve;