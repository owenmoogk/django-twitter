from .models import Tweet
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.decorators import api_view
import datetime
from django.contrib.auth.models import User
from users.models import *

@api_view(('GET',))
def TweetDetails(request, tweet_id):

	try:
		tweet = Tweet.objects.get(id = tweet_id)
		data = TweetToDict(tweet, request)
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

	userFollowing = UserData.objects.get(user = request.user).following

	try:
		tweets = list(Tweet.objects.all())
		tweets.reverse()
		for tweet in tweets:
			if tweet.user.username in userFollowing:
				data.append(TweetToDict(tweet, request))
		return Response(data, status=status.HTTP_200_OK)
	except Exception as e:
		data = {
			"message": "server error"
		}
		return Response(data, status=status.HTTP_404_NOT_FOUND)

@api_view(("POST",))
def Compose(request):

	try:
		content = request.data.get('content')
		if len(content) == 0:
			return Response({'message': "This field cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)
		tweet = Tweet(user=request.user, content=request.data.get('content'))
		tweet.save()
		return Response({}, status=status.HTTP_201_CREATED)
	except:
		return Response({"message":"There was an error creating tweet. Please try logging out and back in again."}, status=status.HTTP_403_FORBIDDEN)

@api_view(('POST',))
def Delete(request):
	userId = request.user.id
	tweetId = request.data.get('tweetId')
	
	try:
		tweet = Tweet.objects.get(id = tweetId)
		if tweet.user.id == userId:
			tweet.delete()
			return Response({}, status=status.HTTP_200_OK)
		else:
			return Response({"message":"You must own this tweet to delete it"}, status=status.HTTP_403_FORBIDDEN)
	except:
		return Response({"message":"This tweet does not exist"}, status=status.HTTP_404_NOT_FOUND)


@api_view(('POST',))
def LikeTweet(request):
	username = request.user.username
	tweetId = request.data.get('tweetId')

	try:
		tweet = Tweet.objects.get(id = tweetId)
		if not username in tweet.likes:
			tweet.likes.append(username)
			tweet.save()
		return Response({"message":"all good"}, status=status.HTTP_200_OK)
	except:
		return Response({"message":"This tweet does not exist"}, status=status.HTTP_404_NOT_FOUND)


@api_view(('POST',))
def DislikeTweet(request):
	username = request.user.username
	tweetId = request.data.get('tweetId')

	try:
		tweet = Tweet.objects.get(id = tweetId)
		if username in tweet.likes:
			tweet.likes.remove(username)
			tweet.save()
		return Response({"message":"all good"}, status=status.HTTP_200_OK)
	except:
		return Response({"message":"This tweet does not exist"}, status=status.HTTP_404_NOT_FOUND)

@api_view(('POST',))
def Retweet(request):
	username = request.user.username
	tweetId = request.data.get('tweetId')
	
	# check to see that the user hasnt already retweeted this
	userTweets = list(Tweet.objects.filter(user = request.user, isRetweet = True))
	for tweet in userTweets:
		if tweet.retweetKey.id == tweetId:
			return Response({"message":"already retweeted this"}, status=status.HTTP_403_FORBIDDEN)

	try:
		tweet = Tweet(user = request.user, isRetweet = True, retweetKey = Tweet.objects.get(id = tweetId))
		tweet.save()
		return Response({"message":"all good"}, status=status.HTTP_200_OK)
	except Exception as e:
		return Response({"message":"This tweet does not exist"}, status=status.HTTP_404_NOT_FOUND)

@api_view(('POST',))
def UndoRetweet(request):
	username = request.user.username
	tweetId = request.data.get('tweetId')

	try:
		tweet = Tweet.objects.get(id = tweetId)
		if username in tweet.retweets:
			tweet.retweets.remove(username)
			tweet.save()
		return Response({"message":"all good"}, status=status.HTTP_200_OK)
	except:
		return Response({"message":"This tweet does not exist"}, status=status.HTTP_404_NOT_FOUND)

@api_view(('GET',))
def UserTweets(request, username):

	try:
		user = User.objects.get(username = username)
		tweets = Tweet.objects.filter(user = user)
		jsonTweets = []
		for tweet in tweets:
			jsonTweets.append(TweetToDict(tweet, request))
		jsonTweets.reverse()
		data = {
			"bio": "bio yet to be implemented",
			"tweets": jsonTweets,
		}
		return Response(data, status=status.HTTP_200_OK)
	except:
		return Response({"message":"This user does not exist"}, status=status.HTTP_404_NOT_FOUND)

def TweetToDict(tweet, request):

	# processing time
	time = str(tweet.time.strftime('%b')) + " " + str(tweet.time.day)
	if tweet.time.year != datetime.datetime.now().year:
		time += " "+str(tweet.time.year)

	# processing liked
	username = request.user.username
	liked = (username in tweet.likes)

	# if retweet add retweeet content
	if tweet.isRetweet:
		retweetContent = TweetToDict(tweet.retweetKey, request)
	else:
		retweetContent = None

	# has the user retweeted this tweet
	userRts = getTweetsThatUserHasRetweeted(request)
	userHasRetweeted = True if tweet.id in userRts else False

	return({
		'id': tweet.id,
		'content': tweet.content,
		'user': tweet.user.username,
		'time': time,
		'liked': liked,
		'isRetweet': tweet.isRetweet,
		'retweetContent': retweetContent,
		'userHasRetweeted': userHasRetweeted
	})

def getTweetsThatUserHasRetweeted(request):
	userRetweets = Tweet.objects.filter(user = request.user, isRetweet = True)

	rtIdList = []
	for tweet in userRetweets:
		rtIdList.append(tweet.retweetKey.id)
	
	return(rtIdList)
