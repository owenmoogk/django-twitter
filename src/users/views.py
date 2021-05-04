from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer

@api_view(('POST',))
@renderer_classes((JSONRenderer,))
def register(request):
	
	if request.method == "POST":

		username = request.data.get('username')
		password = request.data.get('password')
		passwordConfirmation = request.data.get('passwordConfirmation')

		if not username or not password:
			return Response({"Message": "Fill out all the fields"}, status=status.HTTP_400_BAD_REQUEST)

		print('hi ok')

		if User.objects.filter(username=username).exists():
			return Response({"Message": "Username taken"}, status=status.HTTP_406_NOT_ACCEPTABLE)

		if not password == passwordConfirmation:
			return Response({"Message": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

		try:
			user = User.objects.create_user(
				username=username, password=password)
			return Response({"Message": "User Created Successfully"}, status=status.HTTP_200_OK)
		except:
			return Response({"Message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



def changePassword(request):
	if request.method == 'POST':
		form = PasswordChangeForm(request.user, request.POST)
		if form.is_valid():
			user = form.save()
			update_session_auth_hash(request, user)  # Important!
			messages.success(
				request, 'Your password was successfully updated!')
			return redirect('/home/')
		else:
			messages.error(request, 'Please correct the error below.')
	else:
		form = PasswordChangeForm(request.user)
	return render(request, 'users/change-password.html', {'form': form})

def account(request):

	if request.method == "POST":
		form = EditProfileForm(request.POST, instance=request.user)
		if form.is_valid():
			form.save()
			return redirect("/home")
	else:
		form = EditProfileForm(instance=request.user)

		return render(request, "users/account.html", {"form": form})


def homeView(request):
	return render(request, "home.html", {})
