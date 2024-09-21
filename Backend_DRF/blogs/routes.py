from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.creatBlog),
    path('update/<int:id>', views.updatBlog),
    path('getblogs/', views.getBlogs),
    path('delete/<int:id>', views.deleteBlog),
    # Add other authentication-related views here
    # ...
]