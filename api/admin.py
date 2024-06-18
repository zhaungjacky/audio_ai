from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.IflyPostInfo)
admin.site.register(models.PrimeUser)
admin.site.register(models.UserCases)
admin.site.register(models.Faqs)
admin.site.register(models.WorkProcess)
admin.site.register(models.MainpageHtmlContent)
admin.site.register(models.PrimeHtmlContent)
admin.site.register(models.NotesData)
admin.site.register(models.StyleTypes)