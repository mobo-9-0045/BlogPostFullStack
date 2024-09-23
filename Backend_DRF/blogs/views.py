from rest_framework.response import Response;
from rest_framework import status;
from rest_framework.decorators import api_view, permission_classes;
from rest_framework.permissions import AllowAny, IsAuthenticated;
from .serializers import BlogPostSerializer;
from .models import BlogPost;
# Create your views here.

@api_view(['post'])
@permission_classes([IsAuthenticated])
def creatBlog(request):
    serializer = BlogPostSerializer(data=request.data);
    if serializer.is_valid():
        serializer.save(author=request.user);
        return Response(serializer.data, status=status.HTTP_201_CREATED);
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST);

@api_view(['post'])
@permission_classes([IsAuthenticated])
def updatBlog(request, id):
    blog = BlogPost.objects.get(pk=id);
    if blog.author.id == request.user.id:
        serializer = BlogPostSerializer(instance=blog, data=request.data);
        if serializer.is_valid():
            serializer.save(author=request.user);
            return Response(serializer.data, status=status.HTTP_200_OK);
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST);
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST);
    
@api_view(['get'])
@permission_classes([IsAuthenticated])
def getBlogs(request):
    blogs = BlogPost.objects.all()
    serializer = BlogPostSerializer(blogs, many=True);
    return Response(serializer.data, status=status.HTTP_200_OK);

@api_view(['get'])
@permission_classes([IsAuthenticated])
def getUserBlogs(request, id):
    blogs = BlogPost.objects.filter(author=id);
    serializer = BlogPostSerializer(blogs, many=True);
    return Response(serializer.data, status=status.HTTP_200_OK);
    

@api_view(['delete'])
@permission_classes([IsAuthenticated])
def deleteBlog(request, id):
    blog = BlogPost.objects.get(pk=id);
    if blog.author.id == request.user.id:
        blog.delete();
        return Response(status=status.HTTP_200_OK);
    return Response(status=status.HTTP_400_BAD_REQUEST);