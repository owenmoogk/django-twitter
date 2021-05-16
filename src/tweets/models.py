from django.db import models
from django.conf import settings

class Tweet(models.Model):
	user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
	content = models.TextField(blank=True, null=True)
	image = models.FileField(upload_to='images/', blank=True, null=True)
	time = models.DateTimeField(auto_now_add=True)
	likes = models.JSONField(default=list)