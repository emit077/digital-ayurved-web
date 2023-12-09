#!/usr/bin/env sh
# abort on errors
set -e
# build
npm run build

# configure aws cli
aws configure set aws_access_key_id "AKIAVCHGMA6SWAKNMLOB"
aws configure set aws_secret_access_key "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"
aws configure set region "ap-south-1"
aws configure set output "json"

#
# navigate into the build output directory
#commitMsg="last Production release ::"
#d=`date`
#commitMsg+=d
#git add .
#git commit -m $commitMsg
#git push origin main


#cd dist
#
#git init
#git add -A
#git commit -m 'last deploy'
#git push -f git@github.com:emit077/digital-ayurved-web.git master:dist-pages
#cd -
#
#
## deploy to s3 bucket
aws s3 sync ./dist/ s3://digital-ayurved-web/
#
#
#
