from django.db.models.fields.files import ImageFieldFile
from rest_framework.test import APITestCase

from .image_test_util import get_image_file
from ..models import NewsItem, Project, Release


class ModelsTests(APITestCase):
    def setUp(self):

        self.project = Project.objects.create(
            name="Project name",
            description="a very short description of the project",
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
            label = "A Label",
            format = ["CS"],
            mastered = "mastering engineer",
            design = "designer",
            recorded = "recording engineer",
            bandcamp_link ="https://e-l-s.bandcamp.com/album/winters-split-pt2",
            soundcloud_link ="https://soundcloud.com/e-l-smusic/glacial",
            spotify_link ="https://open.spotify.com/album/76TYeTqP0loNE3rS8Axi2c?si=Jaag7POgR2mYxDVoypgmxw",
            buy_link ="https://e-l-s.bandcamp.com/album/winters-split-pt2",
            press_release ="In condimentum condimentum congue. In hac habitasse platea dictumst. Fusce sodales justo tellus, ac porta massa imperdiet eu. Donec vitae enim ipsum. Nullam molestie nec sapien in faucibus. Cras interdum ultrices turpis, et tincidunt neque hendrerit ac. Vivamus dignissim, ante eget molestie hendrerit, erat libero lobortis est, nec hendrerit erat turpis et quam. Nullam porta velit non feugiat tempor. Morbi volutpat bibendum tortor, sit amet malesuada diam. Vivamus dapibus a ex at lobortis.",
        )

    def test_news_item_model(self):

        self.assertEqual(self.newsitem.headline, "Lorem ipsum dolor")
        self.assertEqual(str(self.newsitem), "Lorem ipsum dolor")
        self.assertEqual(
            self.newsitem.body,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id ligula vitae purus t",
        )
        self.assertEqual(self.newsitem.link, "https://link.com")
        self.assertEqual(self.newsitem.link_title, "link")
        self.assertEquals(self.newsitem.project,self.project)
        self.assertIs(type(self.newsitem.image), ImageFieldFile)


    def test_project_model(self):

        self.assertEqual(self.project.name, "Project name")
        self.assertEqual(self.project.description, "a very short description of the project")
        self.assertEqual(str(self.project), "Project name")

    def test_release_model(self):

        self.assertEqual(self.release.title,"Latest Album")
        self.assertEqual(self.release.project,self.project)
        self.assertEqual(self.release.label,"A Label")
        self.assertEqual(self.release.format,["CS"])
        self.assertEqual(self.release.mastered,"mastering engineer")
        self.assertEqual(self.release.design,"designer")
        self.assertEqual(self.release.recorded,"recording engineer")
        self.assertEqual(self.release.bandcamp_link,"https://e-l-s.bandcamp.com/album/winters-split-pt2")
        self.assertEqual(self.release.spotify_link,"https://open.spotify.com/album/76TYeTqP0loNE3rS8Axi2c?si=Jaag7POgR2mYxDVoypgmxw")
        self.assertEqual(self.release.buy_link,"https://e-l-s.bandcamp.com/album/winters-split-pt2")
        self.assertEqual(self.release.press_release,"In condimentum condimentum congue. In hac habitasse platea dictumst. Fusce sodales justo tellus, ac porta massa imperdiet eu. Donec vitae enim ipsum. Nullam molestie nec sapien in faucibus. Cras interdum ultrices turpis, et tincidunt neque hendrerit ac. Vivamus dignissim, ante eget molestie hendrerit, erat libero lobortis est, nec hendrerit erat turpis et quam. Nullam porta velit non feugiat tempor. Morbi volutpat bibendum tortor, sit amet malesuada diam. Vivamus dapibus a ex at lobortis.")
        self.assertEqual(str(self.release),"Latest Album")
