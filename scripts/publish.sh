git checkout master
git subtree split --prefix dist -b gh-pages
git push -f origin gh-pages:gh-pages
git checkout master
git branch -D gh-pages
