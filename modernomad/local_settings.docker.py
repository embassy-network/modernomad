# copy this file to local_settings.py. it should be exluded from the repo
# (ensure local_settings.py is in .gitignore)

# Make this unique, and don't share it with anybody.
SECRET_KEY = 'secret'

ADMINS = (
          ('Your Name', 'your@email.com'),
          )

ALLOWED_HOSTS=['domain.com']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'modernomadb',
        'USER': 'postgres',
        'HOST': 'db',
        'PORT': 5432
    }
}

MEDIA_ROOT = "/var/lib/modernomad/media/"
BACKUP_ROOT= "/var/lib/modernomad/backups/"
BACKUP_COUNT = 30

# use XS_SHARING_ALLOWED_ORIGINS = '*' for all domains
XS_SHARING_ALLOWED_ORIGINS = "http://localhost:8989/"
XS_SHARING_ALLOWED_METHODS = ['POST','GET', 'PUT', 'OPTIONS', 'DELETE']
XS_SHARING_ALLOWED_HEADERS = ["Content-Type"]

# what mode are we running in? use this to trigger different settings.
DEVELOPMENT = 0
PRODUCTION = 1

# default mode is production. change to dev as appropriate.
MODE = PRODUCTION

# how many days should people be allowed to make a reservation request for?
MAX_RESERVATION_DAYS = 14

# how many days ahead to send the welcome email to guests with relevan house
# info.
WELCOME_EMAIL_DAYS_AHEAD = 2

# this should be a TEST or PRODUCTION key depending on whether this is a local
# test/dev site or production!
STRIPE_SECRET_KEY = "sk_XXXXX"
STRIPE_PUBLISHABLE_KEY = "pk_XXXXX"

# Discourse discussion group
DISCOURSE_BASE_URL = 'http://your-discourse-site.com'
DISCOURSE_SSO_SECRET = 'paste_your_secret_here'

MAILGUN_API_KEY = "key-XXXX"

LIST_DOMAIN = "somedomain.com"

if MODE == DEVELOPMENT:
	EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
	DEBUG=True
else:
	EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
	EMAIL_USE_TLS = True
	EMAIL_HOST = 'somehost'
	EMAIL_PORT = 587
	EMAIL_HOST_USER = 'some@email.com'
	EMAIL_HOST_PASSWORD = 'password'
	DEBUG=False

TEMPLATE_DEBUG = DEBUG

# fill in any local template directories. any templates with the same name WILL
# OVERRIDE included templates. don't forget the trailing slash in the path, and
# a comma at the end of the tuple item if there is only one path.
LOCAL_TEMPLATE_DIRS = (
                       # eg, "../local_templates/",
                       )

# celery configuration options
BROKER_URL = 'amqp://'
CELERY_RESULT_BACKEND = 'amqp://'

CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_ENABLE_UTC = True

# Logging
LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {
            'verbose': {
                'format' : "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
                'datefmt' : "%d/%b/%Y %H:%M:%S"
                },
            'simple': {
                'format': '%(levelname)s %(message)s'
                },
            },
        'handlers': {
            'console': {
                'level': 'DEBUG',
                'class': 'logging.StreamHandler',
                },
            'mail_admins': {
                'level': 'ERROR',
                'class': 'django.utils.log.AdminEmailHandler',
                'include_html': True,
                'formatter': 'verbose',
                }
            },
        'loggers': {
            'django': {
                'handlers': ['console'],
                'level': 'INFO',
                'propagate': True,
                },
            'django.request': {
                'handlers': ['console', 'mail_admins'],
                'level': 'INFO',
                'propagate': True,
                },
            'core': {
                'handlers': ['console'],
                'level': 'DEBUG',
                },
            'modernomad': {
                'handlers': ['console'],
                'level': 'DEBUG',
                },
            'gather': {
                'handlers': ['console'],
                'level': 'DEBUG',
                },
            },
        }
