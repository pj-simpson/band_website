from django.db.models.fields.files import ImageFieldFile
from rest_framework.test import APITestCase

from .image_test_util import get_image_file
from ..models import NewsItem, Project, Release, Biog, Connect, Image


class ModelsTests(APITestCase):
    def setUp(self):

        self.project = Project.objects.create(
            name="Project name", description="a very short description of the project",
        )

        self.newsitem = NewsItem.objects.create(
            headline="Lorem ipsum dolor",
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id ligula vitae purus t",
            project=self.project,
            link="https://link.com",
            link_title="link",
            image=get_image_file(),
        )

        self.release = Release.objects.create(
            title="Latest Album",
            project=self.project,
            label="A Label",
            format=["CS"],
            mastered="mastering engineer",
            design="designer",
            recorded="recording engineer",
            bandcamp_link="https://e-l-s.bandcamp.com/album/winters-split-pt2",
            soundcloud_link="https://soundcloud.com/e-l-smusic/glacial",
            spotify_link="https://open.spotify.com/album/76TYeTqP0loNE3rS8Axi2c?si=Jaag7POgR2mYxDVoypgmxw",
            buy_link="https://e-l-s.bandcamp.com/album/winters-split-pt2",
            press_release="In condimentum condimentum congue. In hac habitasse platea dictumst. Fusce sodales justo",
            image=get_image_file(),
            release_date="2019-12-01",
        )

        self.biog = Biog.objects.create(
            biography="Fusce arcu dui, mattis sit amet varius eget, placerat non nunc. Quisque vestibulum ut est id",
        )

        self.connect = Connect.objects.create(
            link="link", link_title="link_title", category="Platform",
        )

        self.image = Image.objects.create(src=get_image_file(), width=1, height=1,credit="blah blah blah")

    def test_news_item_model(self):

        self.assertEqual(self.newsitem.headline, "Lorem ipsum dolor")
        self.assertEqual(str(self.newsitem), "Lorem ipsum dolor")
        self.assertEqual(
            self.newsitem.body,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id ligula vitae purus t",
        )
        self.assertEqual(self.newsitem.link, "https://link.com")
        self.assertEqual(self.newsitem.link_title, "link")
        self.assertEquals(self.newsitem.project, self.project)
        self.assertIs(type(self.newsitem.image), ImageFieldFile)

    def test_project_model(self):

        self.assertEqual(self.project.name, "Project name")
        self.assertEqual(
            self.project.description, "a very short description of the project"
        )
        self.assertEqual(str(self.project), "Project name")

    def test_release_model(self):

        self.assertEqual(self.release.title, "Latest Album")
        self.assertEqual(self.release.project, self.project)
        self.assertEqual(self.release.label, "A Label")
        self.assertEqual(self.release.format, ["CS"])
        self.assertEqual(self.release.mastered, "mastering engineer")
        self.assertEqual(self.release.design, "designer")
        self.assertEqual(self.release.recorded, "recording engineer")
        self.assertEqual(
            self.release.bandcamp_link,
            "https://e-l-s.bandcamp.com/album/winters-split-pt2",
        )
        self.assertEqual(
            self.release.spotify_link,
            "https://open.spotify.com/album/76TYeTqP0loNE3rS8Axi2c?si=Jaag7POgR2mYxDVoypgmxw",
        )
        self.assertEqual(
            self.release.buy_link, "https://e-l-s.bandcamp.com/album/winters-split-pt2"
        )
        self.assertEqual(
            self.release.press_release,
            "In condimentum condimentum congue. In hac habitasse platea dictumst. Fusce sodales justo",
        )
        self.assertEqual(str(self.release), "Latest Album")
        self.assertEqual(self.release.release_date, "2019-12-01")
        self.assertIs(type(self.release.image), ImageFieldFile)

    def test_biog_model(self):
        self.assertEqual(
            self.biog.biography,
            "Fusce arcu dui, mattis sit amet varius eget, placerat non nunc. Quisque vestibulum ut est id",
        )

    def test_connect_model(self):
        self.assertEqual(self.connect.link, "link")
        self.assertEqual(self.connect.link_title, "link_title")
        self.assertEqual(self.connect.category, "Platform")

    def test_image_model(self):
        self.assertEqual(self.image.width, 1)
        self.assertEqual(self.image.height, 1)
        self.assertEqual(self.image.credit, "blah blah blah")
        self.assertIs(type(self.image.src), ImageFieldFile)
