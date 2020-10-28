from django.contrib import admin
from .models import CustomUser

class CustomUserAdmin(admin.ModelAdmin):
    search_fields = ['__all__']

admin.site.register(CustomUser, CustomUserAdmin)
