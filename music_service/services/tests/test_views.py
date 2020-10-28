from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.request import Request
from rest_framework.reverse import reverse
from rest_framework.test import APIClient, APIRequestFactory, APITestCase

from .image_test_util import get_image_file
from ..models import NewsItem, Project
from ..serializers import NewsItemSerializer

factory = APIRequestFactory()


class NewsItemsTests(APITestCase):
    def setUp(self):

        self.project = Project.objects.create(name='Band name', description='Short description of the project')

        self.newsitem1 = NewsItem.objects.create(
            headline="Lorem ipsum dolor",
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id ligula vitae purus t",
            link="https://link.com",
            link_title="link title",
            image=get_image_file(),
            project=self.project
        )

        self.newsitem2 = NewsItem.objects.create(
            headline="Vivamus at libero",
            body="Vivamus at libero vel metus semper venenatis eget facilisis metus",
            link="https://link2.com",
            image=get_image_file(),
            project=self.project
        )

    def test_get_all_news_items(self):

        response = self.client.get(reverse("news-items"))
        request = factory.get(reverse("news-items"))

        newsitems = NewsItem.objects.all()
        serializer = NewsItemSerializer(
            newsitems, many=True, context={"request": Request(request)}
        )

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["headline"], "Lorem ipsum dolor")
        self.assertEqual(response.data[1]["headline"], "Vivamus at libero")

    def test_get_single_news_item(self):

        response = self.client.get(
            reverse("news-item-detail", kwargs={"pk": self.newsitem1.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["headline"], "Lorem ipsum dolor")

    def test_get_single_non_existent_item(self):
        response = self.client.get(reverse("news-item-detail", kwargs={"pk": 45}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class NewsItemsRequireAuthTests(APITestCase):
    def setUp(self):

        self.project = Project.objects.create(name='Band name', description='Short description of the project')

        self.newsitem1 = NewsItem.objects.create(
            headline="Lorem ipsum dolor",
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id ligula vitae purus t",
            link="https://link.com",
            link_title="link title",
            image=get_image_file(),
            project=self.project
        )

        self.newsitem2 = NewsItem.objects.create(
            headline="Vivamus at libero",
            body="Vivamus at libero vel metus semper venenatis eget facilisis metus",
            link="https://link2.com",
            image=get_image_file(),
            project=self.project
        )

        User = get_user_model()
        user = User.objects.create_user(
            username="Peter", email="peter@example.com", password="testpass123"
        )

        self.token = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        self.non_auth_client = APIClient()

    def test_update_single_news_item(self):

        payload = {
            "headline": "Nulla nec quam",
            "body": "Nulla nec quam at orci finibus faucibus vel quis dui",
            "link": "https://crazylink.com",
            "link_title":"crazy link",
            "image": get_image_file(),
            "project":self.project.pk
        }

        response = self.client.put(
            reverse("news-item-detail", kwargs={"pk": self.newsitem1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["headline"], "Nulla nec quam")
        self.assertEqual(
            response.data["body"],
            "Nulla nec quam at orci finibus faucibus vel quis dui",
        )
        self.assertEqual(response.data["link"], "https://crazylink.com")
        self.assertEqual(response.data["link_title"], "crazy link")
        self.assertEqual(response.data["project"],self.project.pk)

    def test_update_single_news_item_no_auth(self):

        payload = {
            "headline": "Nulla nec quam",
            "body": "Nulla nec quam at orci finibus faucibus vel quis dui",
            "link": "https://crazylink.com",
            "image": get_image_file(),
            "project": self.project.pk
        }

        response = self.non_auth_client.put(
            reverse("news-item-detail", kwargs={"pk": self.newsitem1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_partial_update_single_news_item(self):
        payload = {"headline": "Patchy"}

        response = self.client.patch(
            reverse("news-item-detail", kwargs={"pk": self.newsitem1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["headline"], "Patchy")


    def test_partial_update_single_news_item_no_auth(self):
        payload = {"headline": "Patchy"}

        response = self.non_auth_client.patch(
            reverse("news-item-detail", kwargs={"pk": self.newsitem1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_single_news_item(self):

        response = self.client.delete(
            reverse("news-item-detail", kwargs={"pk": self.newsitem1.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response2 = self.client.delete(
            reverse("news-item-detail", kwargs={"pk": self.newsitem1.pk})
        )
        self.assertEqual(response2.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_single_news_item_no_auth(self):

        response = self.non_auth_client.delete(
            reverse("news-item-detail", kwargs={"pk": self.newsitem2.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_new_news_item(self):

        payload = {
            "headline": "Ut rhoncus purus",
            "body": "Ut rhoncus purus vel lacus vulputate porttitor",
            "link": "https://fakelink.com",
            "link_title":"fake link",
            "image": get_image_file(),
            "project": self.project.pk
        }

        response = self.client.post(reverse("news-items"), data=payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["headline"], "Ut rhoncus purus")
        self.assertEqual(
            response.data["body"], "Ut rhoncus purus vel lacus vulputate porttitor"
        )
        self.assertEqual(response.data["link"], "https://fakelink.com")
        self.assertEqual(response.data["link_title"], "fake link")
        self.assertEqual(response.data["project"], self.project.pk)


    def test_post_new_news_item_no_auth(self):

        payload = {
            "headline": "Ut rhoncus purus",
            "body": "Ut rhoncus purus vel lacus vulputate porttitor",
            "link": "https://fakelink.com",
            "image": get_image_file(),
        }

        response = self.non_auth_client.post(reverse("news-items"), data=payload)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
