from rest_framework.serializers import ModelSerializer

from .models import (
    IflyPostInfo,
    PrimeUser,
    UserCases,
    Faqs,
    WorkProcess,
    PrimeHtmlContent,
    MainpageHtmlContent,
    NotesData,
    StyleTypes,
)
from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]
        # fields= ['id','username','email','first_name','last_name','is_active','is_staff','is_superuser']

# class PrimeUser(ModelSerializer)
class PrimeUserSerializer(ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = PrimeUser
        fields = "__all__"
        # fields = ["user", "prime", "plus", "vip", "svip"]

class StyleTypesSerializers(ModelSerializer):
    class Meta:
        model = StyleTypes
        fields = ["id","title","context","icon","importString"]

class NotesDataSerializers(ModelSerializer):
    userStatus = PrimeUserSerializer()

    class Meta:
        model = NotesData
        fields = "__all__"


class MainpageHtmlContentSerializers(ModelSerializer):
    class Meta:
        model = MainpageHtmlContent
        fields = "__all__"


class PrimeHtmlContentSerializers(ModelSerializer):
    class Meta:
        model = PrimeHtmlContent
        fields = ["id", "title", "context", "annalPrice", "imagesPath", "cssStyles"]


class UserCaseSerializers(ModelSerializer):
    class Meta:
        model = UserCases
        fields = ["id", "title", "context"]


class FaqsSerializers(ModelSerializer):
    class Meta:
        model = Faqs
        fields = ["id", "title", "context"]


class WorkProcessSerializers(ModelSerializer):
    class Meta:
        model = WorkProcess
        fields = ["id", "title", "context"]


class IflyPostInfoSerializers(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = IflyPostInfo
        fields = "__all__"
