from django.db import models
from django.conf import settings

class Tweet(models.Model):
	user = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
	)
	text = models.CharField(max_length=250)