from rest_framework import serializers
from rest_framework.test import APITestCase

from .image_test_util import get_image_file
from ..models import NewsItem, Project, Release
from ..serializers import NewsItemSerializer, ProjectSerializer, ReleaseSerializer




class NewsItemsSerializerTests(APITestCase):
    def setUp(self):

        self.project = Project.objects.create(name='name',description='description')

        self.validdata = {
            "headline": "Ut rhoncus purus",
            "body": "Ut rhoncus purus vel lacus vulputate porttitor",
            "link": "https://fakelink.com",
            "link_title":"fake link",
            "image": get_image_file(),
            "project":self.project.pk
        }

        self.invaliddata = {"headline": "Ut rhoncus purus"}

    def test_valid_news_item_serializer(self):
        serializer = NewsItemSerializer(data=self.validdata)

        self.assertTrue(serializer.is_valid())
        self.assertEquals(serializer.errors, {})

    def test_invalid_news_item_serializer(self):
        serializer = NewsItemSerializer(data=self.invaliddata)

        self.assertFalse(serializer.is_valid())
        self.assertEquals(serializer.validated_data, {})
        self.assertEquals(serializer.data, self.invaliddata)
        self.assertEquals(
            serializer.errors,
            {"body": ["This field is required."], "link": ["This field is required."]},
        )


class ProjectSerializerTests(APITestCase):

    def setUp(self):
        self.project = Project.objects.create(name='name', description='description')

        self.validdata = {
            "name": "band name",
            "description": "a short description of the band",

        }

        self.invaliddata = {"description": "a short description of the band"}

    def test_valid_project_serializer(self):
        serializer = ProjectSerializer(data=self.validdata)

        self.assertTrue(serializer.is_valid())
        self.assertEquals(serializer.errors, {})

    def test_invalid_project_serializer(self):
        serializer = ProjectSerializer(data=self.invaliddata)

        self.assertFalse(serializer.is_valid())
        self.assertEquals(serializer.validated_data, {})
        self.assertEquals(serializer.data, self.invaliddata)
        self.assertEquals(
            serializer.errors,
            {"name": ["This field is required."]},
        )


class ReleaseSerializerTests(APITestCase):
    def setUp(self):

        self.project = Project.objects.create(name='name',description='description')

        self.validdata = {
            "title":"Latest Album",
            "project":self.project.pk,
            "label": "A Label",
            "format":["CS"],
            "mastered":  "mastering engineer",
            "design": "designer",
            "recorded":"recording engineer",
            "bandcamp_link":"https://e-l-s.bandcamp.com/album/winters-split-pt2",
            "soundcloud_link":"https://soundcloud.com/e-l-smusic/glacial",
            "spotify_link":"https://open.spotify.com/album/76TYeTqP0loNE3rS8Axi2c?si=Jaag7POgR2mYxDVoypgmxw",
            "buy_link":"https://e-l-s.bandcamp.com/album/winters-split-pt2",
            "press_release":"In condimentum condimentum congue. In hac habitasse platea dictumst. Fusce sodales justo tellus, ac porta massa imperdiet eu. Donec vitae enim ipsum. Nullam molestie nec sapien in faucibus. Cras interdum ultrices turpis, et tincidunt neque hendrerit ac. Vivamus dignissim, ante eget molestie hendrerit, erat libero lobortis est, nec hendrerit erat turpis et quam. Nullam porta velit non feugiat tempor. Morbi volutpat bibendum tortor, sit amet malesuada diam. Vivamus dapibus a ex at lobortis.",

        }

        self.invaliddata = {
            "label": "A Label",
            "format":["CS"],
            "mastered":  "mastering engineer",
            "design": "designer",
            "recorded":"recording engineer",
            "bandcamp_link":"https://e-l-s.bandcamp.com/album/winters-split-pt2",
            "soundcloud_link":"https://soundcloud.com/e-l-smusic/glacial",
            "spotify_link":"https://open.spotify.com/album/76TYeTqP0loNE3rS8Axi2c?si=Jaag7POgR2mYxDVoypgmxw",
            "buy_link":"https://e-l-s.bandcamp.com/album/winters-split-pt2"}

    def test_valid_news_item_serializer(self):
        serializer = ReleaseSerializer(data=self.validdata)

        self.assertTrue(serializer.is_valid())
        self.assertEquals(serializer.errors, {})

    def test_invalid_news_item_serializer(self):
        serializer = ReleaseSerializer(data=self.invaliddata)

        self.assertFalse(serializer.is_valid())
        self.assertEquals(serializer.validated_data, {})
        self.assertEquals(serializer.data, self.invaliddata)
        self.assertEquals(
            serializer.errors,
            {"title": ["This field is required."]},
        )
