# from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User

from .models import (
    IflyPostInfo,
    PrimeUser,
    UserCases,
    Faqs,
    WorkProcess,
    MainpageHtmlContent,
    PrimeHtmlContent,
    NotesData,
    StyleTypes,
)

from .serializers import (
    IflyPostInfoSerializers,
    PrimeUserSerializer,
    UserCaseSerializers,
    FaqsSerializers,
    WorkProcessSerializers,
    MainpageHtmlContentSerializers,
    PrimeHtmlContentSerializers,
    NotesDataSerializers,
    StyleTypesSerializers,
    UserSerializer
)


# note manage
@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def getStyleTypesLists(request):
    if request.method == "GET":
        # print(request.body)
        lists = StyleTypes.objects.all().order_by("id")
        serializers = StyleTypesSerializers(lists, many=True)
        return Response(serializers.data)

# note manage
@api_view(["GET", "POST"])
# @permission_classes([IsAuthenticated])``
def getUserNotesLists(request,pk):
    if request.method == "GET":
        # print(request.body)
        lists = NotesData.objects.filter(userStatus_id = pk).order_by("-created_at")
        serializers = NotesDataSerializers(lists, many=True)
        return Response(serializers.data)

# note manage
@api_view(["GET", "POST"])
# @permission_classes([IsAuthenticated])x``
def getNotesLists(request):
    if request.method == "GET":
        print(request.body)
        lists = NotesData.objects.all().order_by("-created_at")
        serializers = NotesDataSerializers(lists, many=True)
        return Response(serializers.data)

    if request.method == "POST":
        data = request.data
        # print(f'coming data: {data}')
        items = NotesData.objects.create(**data)
        serializers = NotesDataSerializers(items, many=False)
        return Response(serializers.data)



@api_view(["GET", "PUT", "DELETE"])
# @permission_classes([IsAuthenticated])
def getNotesDetail(request, pk):
    if request.method == "GET":
        items = NotesData.objects.filter(id=pk).first()
        serializers = NotesDataSerializers(items, many=False)
        return Response(serializers.data)

    if request.method == "PUT":
        data = request.data
        # data = json.loads(request.body)
        plan = NotesData.objects.get(id=pk)
        serializers = NotesDataSerializers(instance=plan, data=data)
        # print(serializers.is_valid())

        print(data)
        if serializers.is_valid():
            # print('serializers is valid')
            serializers.validated_data.pop('userStatus_id')
            serializers.save()
            return Response(serializers.data)
        # print(serializers.errors)
        else:
            return Response(serializers.errors)

    if request.method == "DELETE":
        item = NotesData.objects.get(id=pk)
        item.delete()
        return Response("deleted")

from rest_framework.generics import UpdateAPIView,DestroyAPIView
from .serializers import NotesDataSerializers
from .models import NotesData
from rest_framework import status

class NotesDataUpdateView(UpdateAPIView, DestroyAPIView):
    queryset = NotesData.objects.all()
    serializer_class = NotesDataSerializers

    def get_object(self):
        return NotesData.objects.get(id=self.kwargs['pk'])

    def update(self, request, *args, **kwargs):
        # Get the instance to update
        instance = self.get_object()
        # Create a serializer with the instance and the data from the request
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        # print(request.data)
        if serializer.is_valid():
            # print("here")
            # Exclude the userStatus field from the update
            # serializer.validated_data.pop('userStatus_id')
            serializer.save()

            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def getPrimepageHtmlContent(request):
    if request.method == "GET":
        lists = PrimeHtmlContent.objects.all().order_by("id")
        serializers = PrimeHtmlContentSerializers(lists, many=True)
        return Response(serializers.data)


@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def getMainpageHtmlContent(request):
    if request.method == "GET":
        lists = MainpageHtmlContent.objects.all().order_by("id")
        serializers = MainpageHtmlContentSerializers(lists, many=True)
        return Response(serializers.data)


@api_view(["GET", "POST"])
# @permission_classes([IsAuthenticated])
def getUserCases(request):
    if request.method == "GET":
        lists = UserCases.objects.all().order_by("id")
        serializers = UserCaseSerializers(lists, many=True)
        return Response(serializers.data)


@api_view(["GET", "POST"])
# @permission_classes([IsAuthenticated])
def getFaqs(request):
    if request.method == "GET":
        lists = Faqs.objects.all().order_by("id")
        serializers = FaqsSerializers(lists, many=True)
        return Response(serializers.data)


@api_view(["GET", "POST"])
# @permission_classes([IsAuthenticated])
def getWorkProcess(request):
    if request.method == "GET":
        lists = WorkProcess.objects.all().order_by("id")
        serializers = WorkProcessSerializers(lists, many=True)
        return Response(serializers.data)


# 讯飞服务，相关信息存储至数据库
@api_view(["GET", "POST"])
# @permission_classes([IsAuthenticated])
def getIflyPostList(request):
    if request.method == "GET":
        lists = IflyPostInfo.objects.all().order_by("-created_at")
        serializers = IflyPostInfoSerializers(lists, many=True)
        return Response(serializers.data)

    if request.method == "POST":
        data = request.data
        print(data)
        items = IflyPostInfo.objects.create(**data)
        serializers = IflyPostInfoSerializers(items, many=False)
        return Response(serializers.data)


@api_view(["GET", "PUT", "DELETE"])
# @permission_classes([IsAuthenticated])
def getIflyPostDetail(request, pk):
    if request.method == "GET":
        items = IflyPostInfo.objects.filter(id=pk).first()
        serializers = IflyPostInfoSerializers(items, many=False)
        return Response(serializers.data)

    if request.method == "PUT":
        data = request.data
        # data = json.loads(request.body)
        plan = IflyPostInfo.objects.get(id=pk)
        serializers = IflyPostInfoSerializers(instance=plan, data=data)
        # print(serializers.is_valid())

        if serializers.is_valid():
            # print(data)
            # print('serializers is valid')
            serializers.save()
            return Response(serializers.data)
        # print(serializers.errors)
        else:
            return Response(serializers.errors)

    if request.method == "DELETE":
        item = IflyPostInfo.objects.get(id=pk)
        item.delete()
        return Response("deleted")


# prime user
@api_view(["GET", "POST"])
# @permission_classes([IsAuthenticated])
def getPrimeLists(request):
    if request.method == "GET":
        lists = PrimeUser.objects.all().order_by("-created_at")
        serializers = PrimeUserSerializer(lists, many=True)
        return Response(serializers.data)

    if request.method == "POST":
        data = request.data
        # print(data)
        items = PrimeUser.objects.create(**data)
        serializers = IflyPostInfoSerializers(items, many=False)
        return Response(serializers.data)


@api_view(["GET", "PUT", "DELETE"])
# @permission_classes([IsAuthenticated])
def getPrimeDetail(request, pk):
    if request.method == "GET":
        lists = PrimeUser.objects.filter(id=pk).first()
        serializers = PrimeUserSerializer(lists, many=False)
        return Response(serializers.data)

    if request.method == "PUT":
        data = request.data
        # data = json.loads(request.body)
        items = PrimeUser.objects.get(id=pk)
        serializers = PrimeUserSerializer(instance=items, data=data)
        # print(serializers.is_valid())

        if serializers.is_valid():
            # print(data)
            # print('serializers is valid')
            serializers.save()
            return Response(serializers.data)
        # print(serializers.errors)
        else:
            return Response(serializers.errors)

    if request.method == "DELETE":
        item = PrimeUser.objects.get(id=pk)
        item.delete()
        return Response("deleted")

#user register
@api_view(["POST"])
def registerUser(request):
    data = request.data
    user = User.objects.create_user(**data)
    serializers = UserSerializer(user,many=False)
    # if serializers.is_valid():
    #     return Response(serializers.data)
    return Response(serializers.data)

#user modify password
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def pwdModify(request,pk):
    data = request.data
    # user = User.objects.get(id=pk)
    user = User.objects.get(id=pk)

    seriazliers = UserSerializer(instance=user,data=data)

    if seriazliers.is_valid(raise_exception=True):
        seriazliers.save()
        return Response({'messsage': '更改成功','status': True})
    return Response(seriazliers.errors)


# Create your views here.
# jwt_token post access and  refresh
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token["username"] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
