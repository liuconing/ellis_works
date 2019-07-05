#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下 
cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f #!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下 
cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f https://github.com/liuconing/ellis_works.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/liuconing/ellis_works.git master:gh-pages

cd - master

# 部署到 https://<USERNAME>.github.io/<REPO>
# git push -f https://github.com/liuconing/ellis_works.git master:gh-pages

cd -
# $ npm run build
# $ git checkout -b gh-pages
# $ git add -f dist
# $ git commit -m 'create project'
# $ git subtree push --prefix dist origin gh-pages