FROM codechimpio/vips-alpine

RUN apk -v --update add \
        python \
        py-pip \
        groff \
        mailcap \
        openssl \
        jq \
        curl \
        && \
    pip install --upgrade awscli==1.14.5 s3cmd==2.0.1 python-magic && \
    apk -v --purge del py-pip && \
    rm /var/cache/apk/*

WORKDIR /app
ADD . /app

ENTRYPOINT ["sh", "image_resize.sh"]
