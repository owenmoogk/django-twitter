# Generated by Django 3.1.7 on 2021-05-16 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0005_tweet_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='likes',
            field=models.JSONField(default=list),
        ),
    ]
