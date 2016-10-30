git subtree split --prefix docs/dist -b gh-pages
git push -f origin gh-pages:gh-pages
git branch -D gh-pages
