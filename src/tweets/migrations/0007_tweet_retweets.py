# Generated by Django 3.1.7 on 2021-05-17 02:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0006_tweet_likes'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='retweets',
            field=models.JSONField(default=list),
        ),
    ]