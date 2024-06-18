from django.urls import path
from . import views


urlpatterns = [
    path('upload/', views.getUploadLists),
    path('uploads/<str:pk>', views.getUploadItem),

    # path('upload/', views.UploadAudio.as_view()),
]