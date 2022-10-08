# from accounts.forms import VendorRegistrationForm
from accounts.models import User
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Register your models here.
class UserAdmin(UserAdmin):
    list_display = ('email', 'firstname','lastname', 'is_staff','is_active', )
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


admin.site.register(User, UserAdmin)
# admin.site.register(AccountProfileImage)
