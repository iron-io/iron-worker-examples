# Quick & Simple Example for a image recognition

[Tensorflow](https://www.tensorflow.org/) is an open source software library for numerical computation using data flow graphs. In other words, the best way to build deep learning models.

This example shows how to recognize image with tensorflow.

[classify_image.py](https://github.com/tensorflow/models/blob/master/tutorials/image/imagenet/classify_image.py) was modified, added ability to download image from web.   

## Getting started

- Be sure you've followed the base [getting started instructions on the top level README](https://github.com/iron-io/iron-worker-examples)

## Sending an Email

- Package and upload the worker from command line.
```bash
zip classify_image.zip classify_image.py
iron worker upload --zip classify_image.zip --name classify_image tensorflow/tensorflow:nightly python classify_image.py --image_url "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
```

- Launch worker. You should you your own cluster (contact iron.io support), because public cluster does not allow to use docker images larger than 256mb:
```bash
iron worker queue --wait --cluster YOUR_CLUSTER classify_image
```

PS. You can also use instance with GPU in your cluster (contact iron.io support to get more information)
