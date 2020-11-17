from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken



def jwt_api_client():
    User = get_user_model()
    user = User.objects.create_user(username="test",email="peter@example.com",password="testpass123&")
    client = APIClient()
    refresh = RefreshToken.for_user(user)
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    return client



