from rest_framework import serializers

from .models import NewsItem, Project, Release, Connect,HomeImage, Image


class NewsItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = NewsItem
        fields = (
            "id",
            "headline",
            "body",
            "link",
            "link_title",
            "image",
            "project",
            "created_date",
            "updated_date",
        )

        read_only_fields = (
            "id",
            "created_date",
            "updated_date",
        )

class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'

class ReleaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Release
        fields = '__all__'

class ConnectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Connect
        fields = '__all__'

class HomeImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = HomeImage
        fields = '__all__'

class ImageGallerySerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = '__all__'