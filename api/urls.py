from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("iflyInfo/<str:pk>", views.getIflyPostDetail),
    path("iflyInfo/", views.getIflyPostList),
    path("user-status/<str:pk>", views.getPrimeDetail),
    path("user-status/", views.getPrimeLists),

    path('register/',views.registerUser),
    path('pwd/modify/<int:pk>',views.pwdModify),

    path("notes/<str:pk>", views.NotesDataUpdateView.as_view()),
    # path("notes/<str:pk>", views.getNotesDetail),
    path("notes/", views.getNotesLists),
    path("user-notes/<int:pk>", views.getUserNotesLists),


    
    path("style-types/", views.getStyleTypesLists),
    path("usercases/", views.getUserCases),
    path("faqs/", views.getFaqs),
    path("workprocess/", views.getWorkProcess),
    path("mainpage-content/", views.getMainpageHtmlContent),
    path("primepage-content/", views.getPrimepageHtmlContent),
]
