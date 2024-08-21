To Release:

1) Correct all URL paths to endpoints
Local : https://localhost:2324
  Dev : https://mdm-app-dev:2324
 Prod : https://mdm-app-prd1:2324

Prod1 and Prod2 servers could self point, or to eachother.  VIP not tested (8.06)

> web\src\constants\BASE_URL.tsx

2) Be sure to include all correct cert files for deployment
> web\certs 
  + cert.pem
  + key.pem
> api\certs
  + cert.pem
  + key.pem

3) In the API folder, correctly import the .env file, it should never be committed to server.
> api\
  + .env

4) The following commands should always be ran before starting the service on a release
> npm i      -> Install all packages after a pull
> npm update -> Update all packages after a pull (Local and Development servers only)
> npm run dev -> All launch commands should be standard for development launches.  Use this before prod launch to validate service runs before executing PM2 launch commands.
> npm run pm2_start -> Launch command will start either API or WEB depending on current folder.
  + cd api -> npm run pm2_start || npm run dev
  + cd web -> npm run pm2_start || npm run dev