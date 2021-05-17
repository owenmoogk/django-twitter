from django.db import models
from django.conf import settings

class Tweet(models.Model):
	user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
		# if the user is deleted also delete the tweets
        on_delete=models.CASCADE,
    )
	isRetweet = models.BooleanField(default=False)
	# if the og tweet is deleted also delete all the retweets
	retweetKey = models.ForeignKey('self', on_delete=models.CASCADE, null=True)

	content = models.TextField(blank=True, null=True)
	image = models.FileField(upload_to='images/', blank=True, null=True)
	time = models.DateTimeField(auto_now_add=True)
	likes = models.JSONField(default=list)