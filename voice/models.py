from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from api.models import PrimeUser
import uuid

class UploadedFile(models.Model):
    file = models.FileField(upload_to="uploads/")
    userStatus = models.ForeignKey(PrimeUser,on_delete=models.CASCADE)
    description = models.CharField(max_length=255,blank=True)
    upload_date = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    file_name = models.CharField(max_length=255,blank=True,unique=True)


    def __str__(self):
        return self.file.name

