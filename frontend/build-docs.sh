rm -r ./dist
mkdir ./dist

rm -r ../docs
mkdir ../docs

npm run build

cp -r ./dist/* ../docs/