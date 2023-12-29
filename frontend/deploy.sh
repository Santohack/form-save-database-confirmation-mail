echo "Switching to frontend directory"
git checkout master
echo "Building App...."
npm install
npm run build
echo "deploying file to server...."
scp -r * domcontact@domcontact.com:/var/www/html/domcontact.com/


echo "Done."