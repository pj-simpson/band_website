from rest_framework import status
from rest_framework.request import Request
from rest_framework.reverse import reverse
from rest_framework.test import APIClient, APIRequestFactory, APITestCase


from .image_test_util import get_image_file
from .jwt_auth_test_util import jwt_api_client
from ..models import NewsItem, Project, Biog, Connect, HomeImage, Image, Release
from ..serializers import (
    BiographySerializer,
    ConnectSerializer,
    HomeImageSerializer,
    ProjectSerializer,
    ReleaseSerializer,
    ImageGallerySerializer,
)

factory = APIRequestFactory()


class NewsItemsTests(APITestCase):
    def setUp(self):
        self.client = jwt_api_client()

        self.non_auth_client = APIClient()

        self.project = Project.objects.create(
            name="Band name", description="Short description of the project"
        )

        self.newsitem1 = NewsItem.objects.create(
            headline="Lorem ipsum dolor",
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id ligula vitae purus t",
            link="https://link.com",
            link_title="link title",
            image=get_image_file(),
            project=self.project,
        )

        self.newsitem2 = NewsItem.objects.create(
            headline="Vivamus at libero",
            body="Vivamus at libero vel metus semper venenatis eget facilisis metus",
            link="https://link2.com",
            image=get_image_file(),
            project=self.project,
        )

        self.newsitem3 = NewsItem.objects.create(
            headline="Class aptent",
            body="Class aptent taciti sociosqu ad litora torquent",
            link="https://link3.com",
            image=get_image_file(),
            project=self.project,
        )

        self.newsitem4 = NewsItem.objects.create(
            headline="Morbi finibus",
            body="Morbi finibus imperdiet sapien",
            link="https://link4.com",
            image=get_image_file(),
            project=self.project,
        )

    def test_get_all_news_items_and_pagination(self):

        response = self.client.get(reverse("news-items"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["results"][0]["headline"], "Lorem ipsum dolor")
        self.assertEqual(response.data["results"][1]["headline"], "Vivamus at libero")
        self.assertEqual(response.data["count"], 4)
        self.assertIsNone(response.data["previous"])

        response2 = self.client.get(response.data["next"])

        self.assertEqual(response2.status_code, status.HTTP_200_OK)
        self.assertIsNone(response2.data["next"])
        self.assertEqual(response2.data["results"][0]["headline"], "Morbi finibus")

        response3 = self.client.get("/api/news/?page=2")
        self.assertEqual(
            response2.data["results"][0]["id"], response3.data["results"][0]["id"]
        )

    def test_get_all_news_items_ordering(self):

        response = self.client.get("/api/news/?ordering=-created_date")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["results"][0]["headline"], "Morbi finibus")

    def test_get_single_news_item(self):

        response = self.client.get(
            reverse("news-item-detail", kwargs={"pk": self.newsitem1.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["headline"], "Lorem ipsum dolor")

    def test_get_single_non_existent_item(self):
        response = self.client.get(reverse("news-item-detail", kwargs={"pk": 45}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_single_news_item(self):

        payload = {
            "headline": "Nulla nec quam",
            "body": "Nulla nec quam at orci finibus faucibus vel quis dui",
            "link": "https://crazylink.com",
            "link_title": "crazy link",
            "image": get_image_file(),
            "project": self.project.pk,
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
        self.assertEqual(response.data["project"], self.project.pk)

    def test_update_single_news_item_no_auth(self):

        payload = {
            "headline": "Nulla nec quam",
            "body": "Nulla nec quam at orci finibus faucibus vel quis dui",
            "link": "https://crazylink.com",
            "image": get_image_file(),
            "project": self.project.pk,
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
            "link_title": "fake link",
            "image": get_image_file(),
            "project": self.project.pk,
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


class BiogItemsTests(APITestCase):
    def setUp(self):
        self.client = jwt_api_client()

        self.non_auth_client = APIClient()

        self.biog1 = Biog.objects.create(
            biography="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla bibendum tincidunt nisi ut"
        )

        self.biog2 = Biog.objects.create(
            biography="Integer hendrerit, nisi eget facilisis rutrum, justo neque efficitur enim, eu tempor augue"

        )

    def test_get_all_biog_items(self):

        response = self.client.get(reverse("biographies"))
        request = factory.get(reverse("biographies"))

        biogitems = Biog.objects.all()
        serializer = BiographySerializer(
            biogitems, many=True, context={"request": Request(request)}
        )

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data[0]["biography"],
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla bibendum tincidunt nisi ut",
        )
        self.assertEqual(
            response.data[1]["biography"],
            "Integer hendrerit, nisi eget facilisis rutrum, justo neque efficitur enim, eu tempor augue",
        )

    def test_post_new_biog_item(self):

        payload = {
            "biography": "Ut rhoncus purus",
        }

        response = self.client.post(reverse("biographies"), data=payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["biography"], "Ut rhoncus purus")

    def test_post_new_biog_item_no_auth(self):

        payload = {
            "biography": "This should fail",
        }

        response = self.non_auth_client.post(reverse("news-items"), data=payload)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_latest_biog_endpoint(self):

        response = self.client.get(reverse("latest-biog"))
        request = factory.get(reverse("latest-biog"))

        biogitems = Biog.objects.all()
        biogitems = biogitems.latest("created_date")

        serializer = BiographySerializer(
            biogitems, context={"request": Request(request)}
        )

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["biography"],
            "Integer hendrerit, nisi eget facilisis rutrum, justo neque efficitur enim, eu tempor augue",
        )


class ConnectItemsTests(APITestCase):
    def setUp(self):
        self.client = jwt_api_client()

        self.non_auth_client = APIClient()

        self.connect1 = Connect.objects.create(
            link="http://fakelink.com", link_title="link no 1", category="Platform",
        )

        self.connect2 = Connect.objects.create(
            link="http://fakelink2.com", link_title="link no 2", category="Press",
        )

    def test_get_all_connect_items(self):

        response = self.client.get(reverse("connections"))
        request = factory.get(reverse("connections"))

        connectlinks = Connect.objects.all()
        serializer = ConnectSerializer(
            connectlinks, many=True, context={"request": Request(request)}
        )

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["link"], "http://fakelink.com")
        self.assertEqual(response.data[1]["link"], "http://fakelink2.com")

    def test_get_single_connect_item(self):

        response = self.client.get(
            reverse("connections-detail", kwargs={"pk": self.connect1.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["link_title"], "link no 1")

    def test_get_single_non_existent_item(self):
        response = self.client.get(reverse("connections-detail", kwargs={"pk": 69}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_single_connect_item(self):

        payload = {
            "link": "https://crazylink.com",
            "link_title": "crazy link",
            "category": "Press",
        }

        response = self.client.put(
            reverse("connections-detail", kwargs={"pk": self.connect1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["category"], "Press",
        )
        self.assertEqual(response.data["link"], "https://crazylink.com")
        self.assertEqual(response.data["link_title"], "crazy link")
        self.assertEqual(response.data["category"], "Press")

    def test_update_single_news_item_no_auth(self):

        payload = {
            "link": "https://evencrazierlink.com",
            "link_title": "crazy link 2",
            "category": "Platform",
        }

        response = self.non_auth_client.put(
            reverse("connections-detail", kwargs={"pk": self.connect1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_partial_update_single_connect_item(self):
        payload = {"link_title": "Patching Connection"}

        response = self.client.patch(
            reverse("connections-detail", kwargs={"pk": self.connect1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["link_title"], "Patching Connection")

    def test_partial_update_single_connect_item_no_auth(self):
        payload = {"link_title": "Patching Connection Fail"}

        response = self.non_auth_client.patch(
            reverse("connections-detail", kwargs={"pk": self.connect1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_single_connect_item(self):

        response = self.client.delete(
            reverse("connections-detail", kwargs={"pk": self.connect1.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response2 = self.client.delete(
            reverse("connections-detail", kwargs={"pk": self.connect1.pk})
        )
        self.assertEqual(response2.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_single_connect_item_no_auth(self):

        response = self.non_auth_client.delete(
            reverse("connections-detail", kwargs={"pk": self.connect2.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_new_connect_item(self):

        payload = {
            "link": "https://anotherfunlink.com",
            "link_title": "fun link",
            "category": "Platform",
        }

        response = self.client.post(reverse("connections"), data=payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["link"], "https://anotherfunlink.com")
        self.assertEqual(response.data["link_title"], "fun link")
        self.assertEqual(response.data["category"], "Platform")

    def test_post_new_news_item_no_auth(self):
        payload = {
            "link": "https://failinglink.com",
            "link_title": "fail link",
            "category": "Press",
        }

        response = self.non_auth_client.post(reverse("news-items"), data=payload)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class HomeImageItemsTests(APITestCase):
    def setUp(self):
        self.client = jwt_api_client()

        self.non_auth_client = APIClient()

        self.connect1 = HomeImage.objects.create(image=get_image_file())

        self.connect2 = HomeImage.objects.create(
            image=get_image_file(name="test2.png", ext="png", size=(40, 40))
        )

    def test_get_all_homeimage_items(self):

        response = self.client.get(reverse("home-image"))
        request = factory.get(reverse("home-image"))

        homeimages = HomeImage.objects.all()
        serializer = HomeImageSerializer(
            homeimages, many=True, context={"request": Request(request)}
        )

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_new_homeimage_item(self):

        payload = {
            "image": get_image_file(),
        }

        response = self.client.post(reverse("home-image"), data=payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_new_homeimage_item_no_auth(self):

        payload = {
            "image": get_image_file(),
        }

        response = self.non_auth_client.post(reverse("home-image"), data=payload)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_latest_homeimage_endpoint(self):

        response = self.client.get(reverse("latest-home-image"))
        request = factory.get(reverse("latest-home-image"))

        homeimages = HomeImage.objects.all()
        homeimages = homeimages.latest("created_date")

        serializer = HomeImageSerializer(
            homeimages, context={"request": Request(request)}
        )

        self.assertEqual(response.data, serializer.data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["image"])


class ProjectsItemsTests(APITestCase):
    def setUp(self):
        self.client = jwt_api_client()

        self.non_auth_client = APIClient()

        self.project1 = Project.objects.create(
            name="Band name", description="Short description of the project"
        )

        self.project2 = Project.objects.create(
            name="Second Band name", description="Sed in arcu at libero rutrum auctor"
        )

    def test_get_all_project_items(self):

        response = self.client.get(reverse("projects"))
        request = factory.get(reverse("projects"))

        projects = Project.objects.all()
        serializer = ProjectSerializer(
            projects, many=True, context={"request": Request(request)}
        )

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["name"], "Band name")
        self.assertEqual(response.data[1]["name"], "Second Band name")

    def test_get_single_project(self):

        response = self.client.get(
            reverse("project-detail", kwargs={"pk": self.project1.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Band name")

    def test_get_single_non_existent_project_item(self):
        response = self.client.get(reverse("project-detail", kwargs={"pk": 11}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_single_project(self):

        payload = {
            "name": "Band name 3",
            "description": "Third active project",
        }

        response = self.client.put(
            reverse("project-detail", kwargs={"pk": self.project1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Band name 3")
        self.assertEqual(response.data["description"], "Third active project")

    def test_update_single_project_no_auth(self):

        payload = {
            "name": "Band name 4",
            "description": "The 4th project I am involved in",
        }

        response = self.non_auth_client.put(
            reverse("project-detail", kwargs={"pk": self.project1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_partial_update_single_project(self):
        payload = {"name": "Patch Project"}

        response = self.client.patch(
            reverse("project-detail", kwargs={"pk": self.project1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Patch Project")

    def test_partial_update_single_project_no_auth(self):
        payload = {"name": "Patch Fail"}

        response = self.non_auth_client.patch(
            reverse("project-detail", kwargs={"pk": self.project1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_single_project(self):

        response = self.client.delete(
            reverse("project-detail", kwargs={"pk": self.project1.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response2 = self.client.delete(
            reverse("project-detail", kwargs={"pk": self.project1.pk})
        )
        self.assertEqual(response2.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_single_project_no_auth(self):

        response = self.non_auth_client.delete(
            reverse("project-detail", kwargs={"pk": self.project2.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_new_project(self):

        payload = {
            "name": "Latest Project",
            "description": "The most recent project I am involved in",
        }

        response = self.client.post(reverse("projects"), data=payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Latest Project")
        self.assertEqual(
            response.data["description"], "The most recent project I am involved in"
        )

    def test_post_new_project_no_auth(self):

        payload = {
            "name": "Last Project",
            "description": "Blah Blah Blah",
        }

        response = self.non_auth_client.post(reverse("projects"), data=payload)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class ReleasesItemsTests(APITestCase):
    def setUp(self):
        self.client = jwt_api_client()

        self.non_auth_client = APIClient()

        self.project = Project.objects.create(
            name="Band name", description="Short description of the project"
        )

        self.release1 = Release.objects.create(
            title="title 1",
            project=self.project,
            label="a label",
            format=["DL", "CS"],
            mastered="mastering engineer",
            design="graphic designer",
            recorded="recording engineer",
            bandcamp_link="http://bandcampfake.com/fakelink",
            soundcloud_link="http://soundcloud.com/fakelink",
            spotify_link="http://open.spotify.com/fakelink",
            buy_link="http://itunes.com/fakelink",
            press_release="Maecenas feugiat massa eros, faucibus suscipit lacus sodales non. Vestibulum eget",
            image=get_image_file(),
            release_date="2020-08-01",
        )

        self.release2 = Release.objects.create(
            title="title 2",
            project=self.project,
            label="a label2",
            format=["CD"],
            mastered="2mastering engineer",
            design="2graphic designer",
            recorded="2recording engineer",
            bandcamp_link="http://bandcampfake.com/fakelink2",
            soundcloud_link="http://soundcloud.com/fakelink2",
            spotify_link="http://open.spotify.com/fakelink2",
            buy_link="http://itunes.com/fakelink2",
            press_release="Donec tincidunt massa id orci posuere, sed ultricies purus accumsan. Quisque ac",
            image=get_image_file(),
            release_date="2019-12-01",
        )

        self.release3 = Release.objects.create(
            title="title 3",
            project=self.project,
            label="a label",
            format=["CD", "DL"],
            mastered="3mastering engineer",
            design="3graphic designer",
            recorded="3recording engineer",
            bandcamp_link="http://bandcampfake.com/fakelink3",
            soundcloud_link="http://soundcloud.com/fakelink3",
            spotify_link="http://open.spotify.com/fakelink3",
            buy_link="http://itunes.com/fakelink3",
            press_release="ed viverra ex ex, commodo commodo magna tempor nec. Nullam lectus risus",
            image=get_image_file(),
            release_date="2020-01-01",
        )

        self.release3 = Release.objects.create(
            title="title 4",
            project=self.project,
            label="a label",
            format=["CD", "DL", "LP"],
            mastered="4mastering engineer",
            design="4graphic designer",
            recorded="4recording engineer",
            bandcamp_link="http://bandcampfake.com/fakelink4",
            soundcloud_link="http://soundcloud.com/fakelink4",
            spotify_link="http://open.spotify.com/fakelink4",
            buy_link="http://itunes.com/fakelink4",
            press_release="ed viverra ex ex, commodo commodo magna tempor nec. Nullam lectus risus",
            image=get_image_file(),
            release_date="2020-05-05",
        )

    def test_get_all_releases(self):

        response = self.client.get(reverse("releases"))
        request = factory.get(reverse("releases"))

        releaseitems = Release.objects.all()
        serializer = ReleaseSerializer(
            releaseitems, many=True, context={"request": Request(request)}
        )

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["title"], "title 1")
        self.assertEqual(response.data[1]["title"], "title 2")

    def test_get_all_releases_ordering(self):

        response = self.client.get("/api/releases/?ordering=release_date")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["title"], "title 2")

    def test_get_single_release(self):

        response = self.client.get(
            reverse("release-detail", kwargs={"pk": self.release1.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "title 1")

    def test_get_single_non_existent_item(self):
        response = self.client.get(reverse("release-detail", kwargs={"pk": 100}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_single_release(self):

        payload = {
            "title": "updating title",
            "project": self.project.pk,
            "label": "a label",
            "format": ["CD"],
            "mastered": "40876mastering engineer",
            "design": "465465graphic designer",
            "recorded": "454645recording engineer",
            "bandcamp_link": "http://bandcampfake.com/fakelink4435",
            "soundcloud_link": "http://soundcloud.com/fakelink45435",
            "spotify_link": "http://open.spotify.com/fakelink4543",
            "buy_link": "http://itunes.com/fakelink445354",
            "press_release": "Blah Blah Blah",
            "image": get_image_file(),
            "release_date": "2020-07-01",
        }

        response = self.client.put(
            reverse("release-detail", kwargs={"pk": self.release1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "updating title")
        self.assertEqual(response.data["project"], self.project.pk)
        self.assertEqual(response.data["label"], "a label")
        self.assertEqual(response.data["format"], ["CD"])
        self.assertEqual(response.data["mastered"], "40876mastering engineer")
        self.assertEqual(response.data["recorded"], "454645recording engineer")
        self.assertEqual(response.data["design"], "465465graphic designer")
        self.assertEqual(
            response.data["bandcamp_link"], "http://bandcampfake.com/fakelink4435"
        )
        self.assertEqual(
            response.data["soundcloud_link"], "http://soundcloud.com/fakelink45435"
        )
        self.assertEqual(
            response.data["spotify_link"], "http://open.spotify.com/fakelink4543"
        )
        self.assertEqual(response.data["buy_link"], "http://itunes.com/fakelink445354")
        self.assertEqual(response.data["press_release"], "Blah Blah Blah")
        self.assertEqual(response.data["release_date"], "2020-07-01")

    def test_update_single_release_no_auth(self):
        payload = {
            "title": "Title X",
            "project": self.project.pk,
            "label": "a label X",
            "format": ["CD"],
            "mastered": "X mastering engineer",
            "design": "X graphic designer",
            "recorded": "X recording engineer",
            "bandcamp_link": "http://bandcampfake.com/x",
            "soundcloud_link": "http://soundcloud.com/x",
            "spotify_link": "http://open.spotify.com/x",
            "buy_link": "http://itunes.com/x",
            "press_release": "x",
            "image": get_image_file(),
            "release_date": "2019-12-20",
        }

        response = self.non_auth_client.put(
            reverse("release-detail", kwargs={"pk": self.release1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_partial_update_single_release(self):
        payload = {"title": "Patched Title"}

        response = self.client.patch(
            reverse("release-detail", kwargs={"pk": self.release1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Patched Title")

    def test_partial_update_single_release_no_auth(self):
        payload = {"title": "Another Title Patch"}

        response = self.non_auth_client.patch(
            reverse("release-detail", kwargs={"pk": self.release1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_single_release(self):

        response = self.client.delete(
            reverse("release-detail", kwargs={"pk": self.release1.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response2 = self.client.delete(
            reverse("release-detail", kwargs={"pk": self.release1.pk})
        )
        self.assertEqual(response2.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_single_release_no_auth(self):

        response = self.non_auth_client.delete(
            reverse("release-detail", kwargs={"pk": self.release2.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_new_release(self):

        payload = {
            "title": "Title 5",
            "project": self.project.pk,
            "label": "a label 5",
            "format": "LP",
            "mastered": "5 mastering engineer",
            "design": "5 graphic designer",
            "recorded": "5 recording engineer",
            "bandcamp_link": "http://bandcampfake.com/5",
            "soundcloud_link": "http://soundcloud.com/5",
            "spotify_link": "http://open.spotify.com/5",
            "buy_link": "http://itunes.com/5",
            "press_release": "etc etc etc",
            "image": get_image_file(),
            "release_date": "2019-11-09",
        }

        response = self.client.post(reverse("releases"), data=payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], "Title 5")
        self.assertEqual(response.data["project"], self.project.pk)
        self.assertEqual(response.data["label"], "a label 5")
        self.assertEqual(response.data["format"], ["LP"])
        self.assertEqual(response.data["mastered"], "5 mastering engineer")
        self.assertEqual(response.data["recorded"], "5 recording engineer")
        self.assertEqual(response.data["design"], "5 graphic designer")
        self.assertEqual(response.data["bandcamp_link"], "http://bandcampfake.com/5")
        self.assertEqual(response.data["soundcloud_link"], "http://soundcloud.com/5")
        self.assertEqual(response.data["spotify_link"], "http://open.spotify.com/5")
        self.assertEqual(response.data["buy_link"], "http://itunes.com/5")
        self.assertEqual(response.data["press_release"], "etc etc etc")
        self.assertEqual(response.data["release_date"], "2019-11-09")

    def test_post_new_news_item_no_auth(self):
        payload = {
            "title": "Fail ",
            "project": self.project.pk,
            "label": "fail",
            "format": "LP",
            "mastered": "fail",
            "design": "fail",
            "recorded": "fail",
            "bandcamp_link": "http://bandcampfake.com/fail",
            "soundcloud_link": "http://soundcloud.com/fail",
            "spotify_link": "http://open.spotify.com/fail",
            "buy_link": "http://itunes.com/fail",
            "press_release": "this call will fail",
            "image": get_image_file(),
            "release_date": "1987-01-01",
        }

        response = self.non_auth_client.post(reverse("releases"), data=payload)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class ImagesItemsTests(APITestCase):
    def setUp(self):
        self.client = jwt_api_client()

        self.non_auth_client = APIClient()

        self.image1 = Image.objects.create(src=get_image_file(), width=1, height=1)

        self.image2 = Image.objects.create(src=get_image_file(), width=2, height=2)

    def test_get_all_images(self):

        response = self.client.get(reverse("image-gallery"))
        request = factory.get(reverse("image-gallery"))

        imageitems = Image.objects.all()
        serializer = ImageGallerySerializer(
            imageitems, many=True, context={"request": Request(request)}
        )

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["width"], 1)
        self.assertEqual(response.data[1]["height"], 2)

    def test_get_single_image(self):

        response = self.client.get(
            reverse("image-gallery-detail", kwargs={"pk": self.image1.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["height"], 1)

    def test_get_single_non_existent_image(self):
        response = self.client.get(reverse("image-gallery-detail", kwargs={"pk": 8}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_single_release(self):

        payload = {"src": get_image_file(), "width": 3, "height": 3}

        response = self.client.put(
            reverse("image-gallery-detail", kwargs={"pk": self.image1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["width"], 3)
        self.assertEqual(response.data["height"], 3)

    def test_update_single_release_no_auth(self):
        payload = {"src": get_image_file(), "width": 4, "height": 4}

        response = self.non_auth_client.put(
            reverse("image-gallery-detail", kwargs={"pk": self.image1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_partial_update_single_image(self):
        payload = {"width": 4}

        response = self.client.patch(
            reverse("image-gallery-detail", kwargs={"pk": self.image1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["width"], 4)

    def test_partial_update_single_image_no_auth(self):
        payload = {"height": 4}

        response = self.non_auth_client.patch(
            reverse("image-gallery-detail", kwargs={"pk": self.image1.pk}), data=payload
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_single_release(self):

        response = self.client.delete(
            reverse("image-gallery-detail", kwargs={"pk": self.image1.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response2 = self.client.delete(
            reverse("image-gallery-detail", kwargs={"pk": self.image1.pk})
        )
        self.assertEqual(response2.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_single_release_no_auth(self):

        response = self.non_auth_client.delete(
            reverse("image-gallery-detail", kwargs={"pk": self.image2.pk})
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_new_image(self):
        payload = {"src": get_image_file(), "width": 5, "height": 5}

        response = self.client.post(reverse("image-gallery"), data=payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["width"], 5)
        self.assertEqual(response.data["height"], 5)

    def test_post_new_news_item_no_auth(self):
        payload = {"src": get_image_file(), "width": 666, "height": 666}

        response = self.non_auth_client.post(reverse("image-gallery"), data=payload)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
