from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from core.models import Endorsement, House, Resource, UserProfile


class ResourceInline(admin.TabularInline):
    model = Resource

class HouseAdmin(admin.ModelAdmin):
    inlines = [ResourceInline]

class EndorsementInline(admin.TabularInline):
    model = Endorsement

class UserProfileInline(admin.StackedInline):
    model = UserProfile
 
class UserProfileAdmin(UserAdmin):
    inlines = [UserProfileInline, EndorsementInline]


admin.site.register(House, HouseAdmin)

admin.site.unregister(User)
admin.site.register(User, UserProfileAdmin)
