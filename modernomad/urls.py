from django.conf.urls import patterns, include, url
import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

media_url = settings.MEDIA_URL.lstrip('/').rstrip('/')

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'modernomad.views.index'),
    url(r'^about/$', 'modernomad.views.about'),
    url(r'^community/$', 'modernomad.views.community'),
    url(r'^membership/$', 'modernomad.views.membership'),

    # TODO(mdh): Rework the core package's URLs.
    url(r'^core/', include('core.urls')),
    url(r'^api/', include('api.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)

# media url hackery. TODO does new-django have a better way to do this?
urlpatterns += patterns('',
    (r'^%s/(?P<path>.*)$' % media_url, 'django.views.static.serve',
     { 'document_root': settings.MEDIA_ROOT }),
)

