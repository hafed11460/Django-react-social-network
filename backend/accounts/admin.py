# from accounts.forms import VendorRegistrationForm
from accounts.models import Profile, User, UserProfileImage
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Register your models here.
class UserAdmin(UserAdmin):
    list_display = ('id','email', 'firstname','lastname', 'is_staff','is_active', )
    search_fields = ('email',)
    ordering= ()
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'firstname','lastname', 'password1', 'password2','is_active',),
        }),
    )
class UserProfileImageAdmin(admin.ModelAdmin):
    list_display = ('id','image',  )


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user','bio')

admin.site.register(User, UserAdmin)
admin.site.register(UserProfileImage, UserProfileImageAdmin)
admin.site.register(Profile, ProfileAdmin)
# admin.site.register(AccountProfileImage)
