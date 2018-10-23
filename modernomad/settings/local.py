from .common import *  # noqa
from .common import INSTALLED_APPS

DEBUG = True
TEMPLATE_DEBUG = True
INSTALLED_APPS = INSTALLED_APPS + [
    'debug_toolbar'
]
SECRET_KEY = 'local_development'

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
