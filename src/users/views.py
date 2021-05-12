from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken
from .models import *
from django import forms
from django.core.files.storage import FileSystemStorage
import os
from django.conf import settings
from PIL import Image

# anytime to check if the user is logged in / when react loses its state
@api_view(['GET'])
def current_user(request):
	serializer = UserSerializer(request.user)
	return Response(serializer.data)


class UserList(APIView):

	permission_classes = (permissions.AllowAny,)

	def post(self, request, format=None):
		serializer = UserSerializerWithToken(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def Follow(request):
	userData = initUserData(request)
	username = request.data.get('username')
	if username not in userData.following:
		userData.following.append(username)
		userData.save()
	return Response(userData.following, status=status.HTTP_200_OK)

@api_view(["POST"])
def Unfollow(request):
	userData = initUserData(request)
	username = request.data.get('username')
	if username in userData.following:
		userData.following.remove(username)
		userData.save()
	return Response(userData.following, status=status.HTTP_200_OK)

def initUserData(request):
	try:
		userData = UserData.objects.get(user = request.user)
	except:
		userData = UserData(user=request.user)
		userData.save()
	return(userData)
	
@api_view(['GET'])
def getUserFollowings(request, username):

	try:
		userData = initUserData(request)
		following = list(userData.following)
		return Response(following, status=status.HTTP_200_OK)
	
	except:
		return Response({'message': 'there was an error'}, status=status.HTTP_400_BAD_REQUEST)

# https://www.itachay.com/2020/04/override-replace-uploaded-file-in-django.html
class OverwriteStorage(FileSystemStorage):
	def get_available_name(self, name, max_length=None):
		# If the filename already exists, remove it as if it was a true file system
		if self.exists(name):
			os.remove(os.path.join(settings.MEDIA_ROOT, name))
		return name
	
@api_view(['POST'])
def addImage(request):
	if request.FILES['image']:
		username = request.user.username
		myfile = request.FILES['image']

		# checking its a valid image
		try:
			Image.open(myfile)
		except:
			print('invalid image')
			return Response({'message': 'oops'}, status=status.HTTP_404_NOT_FOUND)


		fs = OverwriteStorage()
		filename = fs.save(username+'.jpg', myfile)
		uploaded_file_url = fs.url(filename)
		print(uploaded_file_url)

	return Response(uploaded_file_url, status=status.HTTP_200_OK)


@api_view(['GET'])
def searchUsers(request, searchQuery):
	users = User.objects.all()

	usernames = []

	for user in users:
		if searchQuery in user.username:
			usernames.append(user.username)

	return Response(usernames, status=status.HTTP_200_OK)