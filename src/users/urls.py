
from django.urls import path
from .views import *

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
	path('follow/', Follow),
	path('unfollow/', Unfollow),
	path('userFollowings/<str:username>/', getUserFollowings),
	path('addUserImage/', addImage)
]