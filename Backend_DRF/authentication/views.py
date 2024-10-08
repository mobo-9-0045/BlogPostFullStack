from rest_framework import status;
from rest_framework.response import Response;
from rest_framework.decorators import api_view, permission_classes;
from rest_framework.permissions import AllowAny, IsAuthenticated;
from .serializers import RegisterSerializer, UserSerializer;

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save();
        return Response(serializer.data, status=status.HTTP_201_CREATED);
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_details(request):
    serializer = UserSerializer(request.user);
    return Response(serializer.data, status=status.HTTP_200_OK);

