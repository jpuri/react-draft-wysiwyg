git checkout master
git checkout -b tmp-gh-pages

npm run build

git commit -am 'add files'

git subtree split --prefix dist -b gh-pages
git push -f origin gh-pages:gh-pages
git checkout master
git branch -D tmp-gh-pages
git branch -D gh-pages
