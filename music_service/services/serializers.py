from rest_framework import serializers

from .models import Biog, Connect, Image, NewsItem, Project, Release


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
        fields = "__all__"


class ReleaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Release
        fields = "__all__"


class ConnectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connect
        fields = "__all__"

class ImageGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"

class BiographySerializer(serializers.ModelSerializer):
    class Meta:
        model = Biog
        fields = "__all__"
