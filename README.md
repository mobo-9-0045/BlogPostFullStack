# Blog Post Website

## Overview
This project is a blog post website built with
- Django Rest Frawork (for authentication and blogs crud)
- Fastapi (for comments crud)
- Nuxtjs (Fronend)

. It uses Docker and Docker Compose for containerization.

## Prerequisites
- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Setup

### 1. Clone the Repository
    git clone repourl



### 2.Run Project
    ```bash
    docker-compose -f docker-compose.yml up --build
    ```
    i alreay put that in Makefile, you need just to run 
    ```bash
    make
    ```
    makefile for windows: https://stackoverflow.com/questions/2532234/how-to-run-a-makefile-in-windows

    makefile for linux
    ```bash
    sudo apt update
    sudo apt install make
    ```

    
### 3. Make and Apply Migrations for Django
    docker-compose exec web python manage.py makemigrations
    docker-compose exec web python manage.py migrate

### 4. Access the Website
To view the website, navigate to `http://localhost:3000` in your web browser.

