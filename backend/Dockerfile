FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /django
COPY requirements.txt /django/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY .  /django/