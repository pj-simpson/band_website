from rest_framework import status
from rest_framework.request import Request
from rest_framework.reverse import reverse
from rest_framework.test import APIClient, APIRequestFactory, APITestCase


from .image_test_util import get_image_file
from .jwt_auth_test_util import jwt_api_client
from ..models import NewsItem, Project,Biog,Connect,HomeImage,Image,Release
from ..serializers import NewsItemSerializer

factory = APIRequestFactory()


class NewsItemsTests(APITestCase):
    def setUp(self):
        self.client = jwt_api_client()

        self.non_auth_client = APIClient()

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


        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]["headline"], "Lorem ipsum dolor")
        self.assertEqual(response.data['results'][1]["headline"], "Vivamus at libero")

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

class BiogItemsTests(APITestCase):
    def setUp(self):
        self.client = jwt_api_client()

        self.non_auth_client = APIClient()


        self.biog1 = Biog.objects.create(
            biography='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla bibendum tincidunt nisi ut consequat. Nam vehicula turpis sit amet blandit accumsan. Mauris lacinia,'

        )

        self.biog2 = Biog.objects.create(
            biography='Integer hendrerit, nisi eget facilisis rutrum, justo neque efficitur enim, eu tempor augue mauris ac lacus. Vivamus in rutrum lectu'
        )


class ConnectItemsTests(APITestCase):
    def setUp(self):
        self.client = jwt_api_client()

        self.non_auth_client = APIClient()

        self.connect1 = Connect.objects.create(
            link='http://fakelink.com',
            link_title ="link no 1",
            category='Platform',
        )

        self.connect2 = Connect.objects.create(
            link='http://fakelink2.com',
            link_title="link no 2",
            category='Press',
        )



class HomeImageItemsTests(APITestCase):
    def setUp(self):
        self.client = jwt_api_client()

        self.non_auth_client = APIClient()

        self.connect1 = HomeImage.objects.create(
            image=get_image_file()
        )

        self.connect2 = HomeImage.objects.create(
            image=get_image_file(name="test2.png", ext="png", size=(40, 40))
        )


class ProjectsItemsTests(APITestCase):
    def setUp(self):
        self.client = jwt_api_client()

        self.non_auth_client = APIClient()

        self.connect1 = Project.objects.create(
            name='Band name', description='Short description of the project'
        )

        self.connect2 = Project.objects.create(
            name='Second Band name', description='Sed in arcu at libero rutrum auctor'
        )



class ReleasesItemsTests(APITestCase):
    def setUp(self):
        self.client = jwt_api_client()

        self.non_auth_client = APIClient()

        self.project = Project.objects.create(name='Band name', description='Short description of the project')

        self.release1 = Release.objects.create(
            title= "title 1",
            project = self.project,
            label = 'a label',
            format = ['DL','CS'],
            mastered = 'mastering engineer',
            design = 'graphic designer',
            recorded = 'recording engineer',
            bandcamp_link = 'http://bandcampfake.com/fakelink',
            soundcloud_link = 'http://soundcloud.com/fakelink',
            spotify_link = 'http://open.spotify.com/fakelink',
            buy_link = 'http://itunes.com/fakelink',
            press_release = 'Maecenas feugiat massa eros, faucibus suscipit lacus sodales non. Vestibulum eget nunc sit amet leo dictum egestas',
            image = get_image_file(),
            release_date = '01/12/2020',

        )

        self.release2 = Release.objects.create(
            title="title 2",
            project=self.project,
            label='a label2',
            format=['CD'],
            mastered='2mastering engineer',
            design='2graphic designer',
            recorded='2recording engineer',
            bandcamp_link='http://bandcampfake.com/fakelink2',
            soundcloud_link='http://soundcloud.com/fakelink2',
            spotify_link='http://open.spotify.com/fakelink2',
            buy_link='http://itunes.com/fakelink2',
            press_release='Donec tincidunt massa id orci posuere, sed ultricies purus accumsan. Quisque ac convallis mi, sodales laoreet quam. Cras finibus massa at blandit sodales',
            image=get_image_file(),
            release_date='01/12/1997',

        )

        self.release3 = Release.objects.create(
            title="title 3",
            project=self.project,
            label='a label',
            format=['CD','DL'],
            mastered='3mastering engineer',
            design='3graphic designer',
            recorded='3recording engineer',
            bandcamp_link='http://bandcampfake.com/fakelink3',
            soundcloud_link='http://soundcloud.com/fakelink3',
            spotify_link='http://open.spotify.com/fakelink3',
            buy_link='http://itunes.com/fakelink3',
            press_release='ed viverra ex ex, commodo commodo magna tempor nec. Nullam lectus risus',
            image=get_image_file(),
            release_date='08/04/2019',

        )

        self.release3 = Release.objects.create(
            title="title 4",
            project=self.project,
            label='a label',
            format=['CD', 'DL','LP'],
            mastered='4mastering engineer',
            design='4graphic designer',
            recorded='4recording engineer',
            bandcamp_link='http://bandcampfake.com/fakelink4',
            soundcloud_link='http://soundcloud.com/fakelink4',
            spotify_link='http://open.spotify.com/fakelink4',
            buy_link='http://itunes.com/fakelink4',
            press_release='ed viverra ex ex, commodo commodo magna tempor nec. Nullam lectus risus',
            image=get_image_file(),
            release_date='19/07/2018',

        )

