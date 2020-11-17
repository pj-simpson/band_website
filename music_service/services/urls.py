from django.urls import path

from .views import *

urlpatterns = [
    path("news/<int:pk>/", NewsItemDetail.as_view(), name="news-item-detail"),
    path("news/", NewsItemList.as_view(), name="news-items"),
    path("projects/<int:pk>/", ProjectDetail.as_view(), name="project-detail"),
    path("projects/", ProjectList.as_view(), name="projects"),
    path("releases/<int:pk>/", ReleaseDetail.as_view(), name="release-detail"),
    path("releases/", ReleaseList.as_view(), name="releases"),
    path("connections/<int:pk>/", ConnectDetail.as_view(), name="connections-detail"),
    path("connections/", ConnnectList.as_view(), name="connections"),
    path("homeimage/", HomeImageList.as_view(), name="home-image"),
    path("latesthomeimage/", LatestHomeImage.as_view(), name="latest-home-image"),
    path("images/<int:pk>/", ImageGalleryDetail.as_view(), name="image-gallery-detail"),
    path("images/", ImageGalleryList.as_view(), name="image-gallery"),
    path("biog/", BiogList.as_view(), name="biographies"),
    path("latestbiog/", LatestBiog.as_view(), name="latest-biog"),
]
