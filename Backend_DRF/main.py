from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from blogs.views import router as blog_router  # Import the router from views

app = FastAPI()

# Allow CORS if needed (optional)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the blog router
app.include_router(blog_router, prefix="/blog", tags=["blogs"])
