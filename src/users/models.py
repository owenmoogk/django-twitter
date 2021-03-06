from django.db import models
from django.conf import settings

class UserData(models.Model):
	user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
		# if the user is deleted also delete the userdata
        on_delete=models.CASCADE,
		primary_key=True,
		related_name='userData',
    )
	following = models.JSONField(default=list)
	bio = models.CharField(max_length=200)
	profilePicture = models.ImageField(upload_to = 'images/', null=True)
