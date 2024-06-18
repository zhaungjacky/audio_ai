import random
from .models import UploadedFile
from .serializers import UploadedFileSerializer
from rest_framework.decorators import api_view, permission_classes, APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
# import scipy.io.wavfile as wav
# import numpy as np
from rest_framework import authentication, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
import time
from . import voice_speech
from django.conf import settings
import os
from io import BytesIO
from api.models import PrimeUser


# Create your views here.
@api_view(["POST", "GET"])
# @permission_classes([IsAuthenticated])
def  getUploadLists(request):
    if request.method == "GET":
        # recognize_from_microphone()
        lists = UploadedFile.objects.all().order_by("-created_at")
        serializer = UploadedFileSerializer(lists, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        user_id = request.POST.get("user_id")


        file_name = request.POST.get("file_name")
        os_type = request.POST.get("osType")
        file_blob = request.FILES["file"]
        style_type = request.POST.get("styleType")
        user_status = PrimeUser.objects.filter(user_id=int(user_id))[0]
        # user_status = request.user

        print(os_type)
        # print(style_type)
        
        if file_blob:
            # wav_data = file_blob.read()
            # file_name_new = file_name + ".wav"
            # new_file = UploadedFile(file = file_name_new,userStatus=user_status,description="...")
            # new_file.save()

            upload_path = os.path.join(
                settings.BASE_DIR, "media/uploads/" + file_name
            )
            convert_path = os.path.join(
                settings.BASE_DIR, "media/convert/" + file_name
            )
            
            file_blob.name = file_name
            print(f'pass_name:{file_blob.name}')

            # with open(upload_path, "wb") as des:
            #     for chunk in file_blob:
            #         des.write(chunk)
            
            upload_file = UploadedFile(file=file_blob,userStatus =user_status,description=style_type,file_name = file_name)

            upload_file.save()

            time.sleep(0.2) 

            from pydub import AudioSegment

            # audio = AudioSegment.from_wav(upload_path)
            # sample_rate = audio.frame_rate
            # channels = audio.channels
            # sample_width = audio.sample_width

            # print(f'rate:{sample_rate}')
            # print(f'width:{channels}')
            # print(f'channel:{sample_width}')

            audio = AudioSegment.from_wav(upload_path)
            audio = audio.set_frame_rate(16000)
            audio = audio.set_sample_width(2)
            audio = audio.set_channels(1)
            audio.export(convert_path, format="wav")

            time.sleep(0.2)            
            # speech core code 
            result =  voice_speech.recognize_from_file(convert_path)
            if not user_status or not user_status.prime:
                os.remove(upload_path)
                os.remove(convert_path)
                
            res = {
                "ori": result,
                "trans_res": "updated:" + result,
                "title": style_type,
                "file_name":file_name,
            }
            
            # res = {
            #     "ori": f"{random.randrange(1,100)}",
            #     "trans_res": f"updated{random.randrange(1,100)}",
            #     "title": f"hi: {user_status}-{random.randrange(1,100)}",
            # }

            # print(res['ori'])
            # print(res['trans_res'])
            # print(res['title'])
            # print(res['file_name'])

            return Response(res)
        return Response("method not allowed!")


from django.http import FileResponse
from django.shortcuts import get_object_or_404
@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def getUploadItem(request,pk):
    # print(pk)
    uploaded_file = get_object_or_404(UploadedFile, file_name=pk)
    file_path = uploaded_file.file.path
    response = FileResponse(open(file_path, 'rb'), content_type='audio/wav')
    # Set the Content-Disposition header to specify the filename
    response['Content-Disposition'] = f'attachment; filename="{uploaded_file.file_name}"'

    return response

# class UploadAudio(APIView):
#     # authentication_classes = [authentication.TokenAuthentication]
#     # permission_classes = [permissions.IsAdminUser]
#     async def post(self, request, format=None):
#         user = request.user
#         file_name = request.POST.get("file_name")
#         file = request.FILES["file"]
#         print(user)

#         if file:
#             upload_path = os.path.join(
#                 settings.BASE_DIR, "media/uploads/" + file_name + ".wav"
#             )
#             convert_path = os.path.join(
#                 settings.BASE_DIR, "media/convert/" + file_name + ".wav"
#             )
#             with open(upload_path, "wb") as des:
#                 for chunk in file:
#                     des.write(chunk)

#             import librosa

#             input_wav, sample_rate = await librosa.load(
#                 f"{upload_path}", sr=None, mono=True
#             )

#             desired_sample_rate = 16000
#             if sample_rate != desired_sample_rate:
#                 input_wav = librosa.resample(
#                     input_wav, sample_rate, desired_sample_rate
#                 )

#             # Convert the audio to 16-bit samples (PCM)
#             input_wav = (input_wav * 32768).astype(np.int16)

#             # Save the converted audio to a new WAV file
#             librosa.output.write_wav(convert_path, input_wav, desired_sample_rate)

#             return Response(user.username for user in User.objects.all())

#         return Response(user.username for user in User.objects.all())


