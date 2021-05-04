from django.contrib import admin
from django.urls import path, include
from frontend.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
	path('users/', include('users.urls')),

	# this has to be at the bottom because anything that does not match the others will be forwareded here
	path('', include('frontend.urls')),
	path('<path:resource>', include('frontend.urls'))
]
