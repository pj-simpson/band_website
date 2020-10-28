from django.db import models
from django.contrib.postgres.fields import ArrayField


class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return f"{self.name}"


class NewsItem(models.Model):
    headline = models.CharField(max_length=255)
    body = models.TextField()
    link = models.URLField()
    link_title = models.CharField(max_length=255,default='link')
    image = models.ImageField(upload_to="news_images/", blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE,null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.headline}"


class Release(models.Model):

    FORMAT_CHOICES = [
        ('DL','DL'),
        ('LP','LP'),
        ('CS','CS'),
        ('CD','CD'),
    ]


    title = models.CharField(max_length=255)
    project = models.ForeignKey(Project, on_delete=models.CASCADE,null=True)
    label = models.CharField(max_length=255,null=True)
    format = ArrayField(models.CharField(choices=FORMAT_CHOICES,default=['DL'],max_length=2),null=True)
    mastered = models.CharField(max_length=255,null=True)
    design = models.CharField(max_length=255,null=True)
    recorded = models.CharField(max_length=255,null=True)
    bandcamp_link = models.CharField(null=True,max_length=255)
    soundcloud_link = models.CharField(null=True,max_length=255)
    spotify_link = models.CharField(null=True,max_length=255)
    buy_link = models.CharField(null=True,max_length=255)
    press_release = models.TextField(null=True)
    image = models.ImageField(upload_to="release_images/", blank=True)
    release_date = models.DateTimeField(null=True)

    def __str__(self):
        return f"{self.title}"

class Connect(models.Model):

    CONNECT_CATEGORY_CHOICES = [
        ('Platform', 'Platform'),
        ('Mix', 'Mix'),
        ('Press', 'Press'),
        ('Project', 'Project'),

    ]

    link = models.URLField()
    link_title = models.CharField(max_length=255, default='link')
    category = models.CharField(choices=CONNECT_CATEGORY_CHOICES,max_length=255)


class HomeImage(models.Model):
    image = models.ImageField(upload_to="home_images/", blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

class Image(models.Model):
    src = models.ImageField(upload_to="image_gallery_images/", blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    width = models.IntegerField()
    height = models.IntegerField()




