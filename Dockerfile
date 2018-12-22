FROM gw000/keras:2.1.4-py3

COPY requirements.txt /srv

WORKDIR /srv

RUN pip3 install -r requirements.txt