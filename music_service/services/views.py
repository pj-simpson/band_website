from rest_framework import filters, generics
from rest_framework.generics import RetrieveAPIView
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser

from .models import Biog, Connect, Image, NewsItem, Project, Release
from .serializers import (
    BiographySerializer,
    ConnectSerializer,
    ImageGallerySerializer,
    NewsItemSerializer,
    ProjectSerializer,
    ReleaseSerializer,
)


class NewsItemList(generics.ListCreateAPIView):
    queryset = NewsItem.objects.all()
    serializer_class = NewsItemSerializer
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_date"]


class NewsItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = NewsItem.objects.all()
    serializer_class = NewsItemSerializer
    parser_classes = (JSONParser, MultiPartParser)


class ProjectList(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    pagination_class = None


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    parser_classes = (JSONParser, MultiPartParser, FormParser)


class ReleaseList(generics.ListCreateAPIView):
    queryset = Release.objects.all()
    serializer_class = ReleaseSerializer
    parser_classes = (JSONParser, MultiPartParser)
    pagination_class = None
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["release_date"]


class ReleaseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Release.objects.all()
    serializer_class = ReleaseSerializer
    parser_classes = (JSONParser, MultiPartParser)


class ConnectList(generics.ListCreateAPIView):
    queryset = Connect.objects.all()
    serializer_class = ConnectSerializer
    parser_classes = (JSONParser, MultiPartParser)
    pagination_class = None


class ConnectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Connect.objects.all()
    serializer_class = ConnectSerializer
    parser_classes = (JSONParser, MultiPartParser)


class ImageGalleryList(generics.ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageGallerySerializer
    parser_classes = (JSONParser, MultiPartParser)
    pagination_class = None


class ImageGalleryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageGallerySerializer
    parser_classes = (JSONParser, MultiPartParser)



class BiographyList(generics.ListCreateAPIView):
    queryset = Biog.objects.all()
    serializer_class = BiographySerializer
    parser_classes = (JSONParser, MultiPartParser)
    pagination_class = None
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_date"]

class BiographyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Biog.objects.all()
    serializer_class = BiographySerializer
    parser_classes = (JSONParser, MultiPartParser)

class LatestBiog(RetrieveAPIView):
    queryset = Biog.objects.all()
    serializer_class = BiographySerializer

    def get_object(self, *args, **kwargs):
        return self.queryset.latest("created_date")
