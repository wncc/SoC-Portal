# SoC-Portal

### Official repository for the SoC Portal Project created by TTY16

#### This repository is a part of HelloFOSS '23

An on-going project of the Web and Coding Club.

# Usage

Clone the Git repository:

```shell
  git clone https://github.com/wncc/SoC-Portal/tree/main
```

Install JS packages

```shell
  cd frontend
  # npm stuff here
```

Create Virtual Environment:

```shell
  cd backend
  python3 -m venv .venv
  pip3 install -r requirements.txt
```

Run Application

```shell
  # Frontend
  # Backend (in ./backend/)
  python manage.py runserver
```

# Documentation

## Frontend

## Backend

The project generates API documentation using [drf-yasg](https://github.com/axnsan12/drf-yasg), provided through Swagger and ReDoc. To access the API documentation, follow these steps:

Ensure that the project is running by executing the command mentioned in the "Usage" section.

Open a web browser and navigate to one of the following endpoint:

```bash
http://127.0.0.1:8000/redoc
http://127.0.0.1:8000/swagger
```

# Contributing

Check out [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to the repo.
