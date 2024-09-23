from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.creatBlog),
    path('update/<int:id>', views.updatBlog),
    path('getblogs/', views.getBlogs),
    path('delete/<int:id>', views.deleteBlog),
    path('getUserBlogs/<int:id>', views.getUserBlogs),
    # Add other authentication-related views here
    # ...
]