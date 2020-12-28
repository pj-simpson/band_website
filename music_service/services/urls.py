from django.urls import path

from .views import (
    NewsItemDetail,
    NewsItemList,
    ProjectDetail,
    ProjectList,
    ReleaseDetail,
    ReleaseList,
    ConnectDetail,
    ConnectList,
    ImageGalleryDetail,
    ImageGalleryList,
    BiographyList,
    BiographyDetail,
    LatestBiog,
)

urlpatterns = [
    path("news/<int:pk>/", NewsItemDetail.as_view(), name="news-item-detail"),
    path("news/", NewsItemList.as_view(), name="news-items"),
    path("projects/<int:pk>/", ProjectDetail.as_view(), name="project-detail"),
    path("projects/", ProjectList.as_view(), name="projects"),
    path("releases/<int:pk>/", ReleaseDetail.as_view(), name="release-detail"),
    path("releases/", ReleaseList.as_view(), name="releases"),
    path("connections/<int:pk>/", ConnectDetail.as_view(), name="connections-detail"),
    path("connections/", ConnectList.as_view(), name="connections"),
    path("images/<int:pk>/", ImageGalleryDetail.as_view(), name="image-gallery-detail"),
    path("images/", ImageGalleryList.as_view(), name="image-gallery"),
    path("biog/", BiographyList.as_view(), name="biographies"),
    path("biog/<int:pk>", BiographyDetail.as_view(), name="biography-detail"),
    path("latestbiog/", LatestBiog.as_view(), name="latest-biog"),
]
