from .models import Tweet
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.decorators import api_view
import datetime


@api_view(('GET',))
def TweetDetails(request, tweet_id):

	try:
		tweet = Tweet.objects.get(id = tweet_id)
		data = TweetToDict(tweet)
		return Response(data, status=status.HTTP_200_OK)
	except:
		data={
			'tweet_id': tweet_id,
			'message': 'not found'
		}
		return Response(data, status=status.HTTP_404_NOT_FOUND)


@api_view(("GET",))
def Tweets(request):
	
	data = []

	try:
		tweets = list(Tweet.objects.all())
		print(tweets)
		tweets.reverse()
		print(tweets)
		for tweet in tweets:
			data.append(TweetToDict(tweet))
		return Response(data, status=status.HTTP_200_OK)
	except:
		data["message"] = "server error"
		return Response(data, status=status.HTTP_404_NOT_FOUND)

def TweetToDict(tweet):

	# processing the day into a string
	time = str(tweet.time.strftime('%b')) + " " + str(tweet.time.day)
	if tweet.time.year != datetime.datetime.now().year:
		time += " "+str(tweet.time.year)
	

	return({
		'id': tweet.id,
		'content': tweet.content,
		'user': tweet.user.username,
		'time': time,
	})

@api_view(("POST",))
def Compose(request):

	try:
		tweet = Tweet(user=request.user, content=request.data.get('content'))
		tweet.save()
		return Response({}, status=status.HTTP_201_CREATED)
	except:
		return Response({"message":"There was an error creating tweet. Please try logging out and back in again."}, status=status.HTTP_403_FORBIDDEN)