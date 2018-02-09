# Quick & Simple Example for a image resizing

##### You can upload processed image into S3 or dropbox. To use dropbox set `DROPBOX_TOKEN` env var, to use S3 set aws access key and secret key

1. Register your image with Iron: `iron register -e "DROPBOX_TOKEN=???"  -e "AWS_ACCESS_KEY_ID=???" -e "AWS_SECRET_ACCESS_KEY=???" -e "AWS_DEFAULT_REGION=us-east-1" iron/examples:image-resizer`

2. Change values in `payload.json` file

3. Queue / Schedule jobs for your image: `iron worker queue --payload-file payload.json --wait iron/examples:image-resizer`

### Or you can build docker image by yourself if you want to change something

1. Change something in dockerfile or `image_resize.sh` file

2. Build and push docker image: `docker build -t USERNAME/REPO . && docker push USERNAME/REPO`

3. And then execute the step above (register, change values and queue job)