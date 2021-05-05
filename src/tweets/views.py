from .models import Tweet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework import serializers

@api_view(('GET',))
def TweetDetails(request, tweet_id):

	data={
		'tweet_id': tweet_id
	}

	try:
		obj = Tweet.objects.get(id = tweet_id)
		data['content'] = obj.content
		return Response(data, status=status.HTTP_200_OK)
	except:
		data["message"] = "not found"
		return Response(data, status=status.HTTP_404_NOT_FOUND)


@api_view(("GET",))
def Tweets(request):
	
	data = []

	try:
		tweets = Tweet.objects.all()
		for tweet in tweets:
			data.append(TweetToDict(tweet))
		return Response(data, status=status.HTTP_200_OK)
	except:
		data["message"] = "server error"
		return Response(data, status=status.HTTP_404_NOT_FOUND)

def TweetToDict(tweet):
	return({
		'id': tweet.id,
		'content': tweet.content,
		'user': tweet.user.username,
	})