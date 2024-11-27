FROM python:3.11.10-alpine3.20

RUN mkdir /home/app
COPY ./requirements.txt /app/requirements.txt

RUN pip install --upgrade pip
RUN pip install  --no-cache-dir --upgrade --force-reinstall  -r /app/requirements.txt

COPY ./src .
