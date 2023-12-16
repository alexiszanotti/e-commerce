from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from . models import User
from . serializers import RegisterUserSerializer, MyTokenObtainPairSerializer, UserSerializer


@api_view(['POST'])
def register(request):
    data = request.data
    user = User.objects.create(
        email=data['email'],
        name=data['name'],
        last_name=data['last_name'],
        password=make_password(data['password'])
    )
    serializer = RegisterUserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def edit_profile(request, email):
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.user == user:
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def get_user(request):
    if request.user.is_staff:
        user = User.objects.exclude(email='admin@admin.com')
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)
    return Response({'detail': 'You are not authorized to perform this action.'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['DELETE'])
def delete_user(request, pk):
    if request.user.is_staff:
        user = User.objects.get(pk=pk)
        user.delete()
        return Response('User was deleted', status=status.HTTP_204_NO_CONTENT)
    return Response({'detail': 'You are not authorized to perform this action.'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def get_user_by_email(request):
    query = request.query_params.get('query')
    if query is None:
        query = ''
    user = User.objects.filter(email__icontains=query)
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)


class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
