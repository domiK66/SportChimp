"""sportchimp_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status

from sportapp.urls import router

from rest_framework_jwt.views import obtain_jwt_token, ObtainJSONWebToken
from django.contrib.auth.models import User


# POST: http://127.0.0.1:8000/api-token-auth/
class CustomObtainJSONWebToken(ObtainJSONWebToken):
    def post(self, request, *args, **kwargs):
        try:
            if "username" not in request.data or "password" not in request.data:
                raise AuthenticationFailed("invalid Data")

            # magic happens here
            user = User.objects.get(username=request.data["username"])
            response = super().post(request, *args, kwargs)
            response.data.update({'user_id': user.id})
            return response

        except User.DoesNotExist:
            return Response(
                'Wrong credentials',
                status=status.HTTP_401_UNAUTHORIZED
            )
        except AuthenticationFailed as error:
            return Response(
                error.detail,
                status=error.status_code
            )


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-token-auth/', obtain_jwt_token),
    path('', include(router.urls))
]
