from django.contrib import admin
from django.urls import path, include
from frontend.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
	path('', include('frontend.urls')),
	path('users/', include('users.urls')),
]
