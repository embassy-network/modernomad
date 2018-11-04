FROM python:3.6.6-alpine3.8

# So Pillow can find zlib
ENV LIBRARY_PATH /lib:/usr/lib

RUN apk add --no-cache \
  build-base \
  jpeg \
  jpeg-dev \
  libxslt \
  libxslt-dev \
  libxml2 \
  libxml2-dev \
  nodejs \
  npm \
  postgresql-dev \
  postgresql-libs \
  zlib \
  zlib-dev

RUN npm install -g less

# Only copy requirements so cache isn't busted by changes in the app
RUN mkdir -p /app
COPY requirements.txt requirements.test.txt /app/
WORKDIR /app
RUN pip install --no-cache-dir -r requirements.txt -r requirements.test.txt

# Same, but for client
RUN mkdir -p /app/client
COPY client/package.json /app/client/
RUN cd client && npm install && npm cache clean --force

# Build client before copying everything so changes in Django don't trigger a
# re-build
COPY client /app/client
RUN cd client && node_modules/.bin/webpack --config webpack.prod.config.js

# Set configuration last so we can change this without rebuilding the whole
# image
ENV DJANGO_SETTINGS_MODULE modernomad.settings.production
# Number of gunicorn workers
ENV WEB_CONCURRENCY 3
EXPOSE 8000
CMD ["gunicorn", "modernomad.wsgi"]

# Copy all files last, because this is most likely to change
COPY . /app/

RUN SECRET_KEY=unset ./manage.py collectstatic --noinput
RUN SECRET_KEY=unset ./manage.py compress
