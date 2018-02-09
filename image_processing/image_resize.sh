#!/usr/bin/env sh

set -e

IN_IMG_NAME="image_in.jpg"

# PAYLOAD_FILE is env var
URL=`cat ${PAYLOAD_FILE} | jq -r '.url'`
WIDTH=`cat ${PAYLOAD_FILE} | jq -r '.width'`
HEIGHT=`cat ${PAYLOAD_FILE} | jq -r '.height'`
BUCKET=`cat ${PAYLOAD_FILE} | jq -r '.bucket'`
OUTPUT=`cat ${PAYLOAD_FILE} | jq -r '.output'`

# download image
printf "Downloading ${URL} to ${IN_IMG_NAME}\n"
wget -O ${IN_IMG_NAME} ${URL}

# resize with vipsthumbnail
printf "\nResizing image to ${WIDTH}x${HEIGHT}\n"
vipsthumbnail --vips-progress --size ${WIDTH}x${HEIGHT} ${IN_IMG_NAME}

if [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
  # upload to dropbox
  curl -X POST https://content.dropboxapi.com/2/files/upload \
    --header "Authorization: Bearer $DROPBOX_TOKEN" \
    --header "Dropbox-API-Arg: {\"path\": \"/$BUCKET/$OUTPUT\",\"mode\": \"add\",\"autorename\": true,\"mute\": false}" \
    --header "Content-Type: application/octet-stream" \
    --data-binary @tn_${IN_IMG_NAME}
else
 # upload to s3
  printf "\nUploading image to ${BUCKET}/${OUTPUT}\n"
  s3cmd put tn_${IN_IMG_NAME} s3://${BUCKET}/${OUTPUT}
fi
