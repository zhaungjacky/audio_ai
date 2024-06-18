from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import UploadedFile
from api.models import PrimeUser
from api.serializers import PrimeUserSerializer

class UploadedFileSerializer(ModelSerializer):
    userStatus = PrimeUserSerializer()
    class Meta:
        model = UploadedFile
        fields = "__all__"