from auth_system.views import change_password, profile
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from djoser.views import UserViewSet
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("register/", UserViewSet.as_view({"post": "create"}), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("v1/users/profile/", profile, name="profile"),
    path("v1/users/change_password/", change_password, name="change_password"),
    path("v1/videos/", include("video_system.urls")),
    path("v1/remarks/", include("remarks_system.urls")),
    path("v1/clients/", include("client_system.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
