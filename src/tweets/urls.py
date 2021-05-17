from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
	path('tweet/<int:tweet_id>/', TweetDetails),
	path('tweets/', Tweets),
	path('compose/', Compose),
	path('delete/', Delete),
	path('userTweets/<str:username>/', UserTweets),
	path('like/', LikeTweet),
	path('dislike/', DislikeTweet),
	path('retweet/', Retweet),
	path('undoRetweet/', UndoRetweet),
]
