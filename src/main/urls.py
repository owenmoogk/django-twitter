from django.contrib import admin
from django.urls import path, include
from frontend.views import *
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [

	path('token-auth/', obtain_jwt_token),
	path('users/', include('users.urls')),
    path('admin/', admin.site.urls),
	path('tweets/', include("tweets.urls")),

	# this has to be at the bottom because anything that does not match the others will be forwareded here to be dealt with by react
	path('', include('frontend.urls')),
	path('<path:resource>', include('frontend.urls'))
]
