# Ayr Python Code Test - URL Shortener

Thank you for taking the time to complete this code test. This file outlines the basic requirements of the test as well as giving you some useful information about the different criteria. Please make sure you read this file and reference it throughout your code test.

## Table of Contents

* [Important Notes](#important-notes)
* [Overview](#overview)
* [Requirements](#requirements)
  * [Front End](#front-end)
  * [Back End](#back-end)
* [Project Setup](#project-setup)
  * [Front End](#setup-front-end)
  * [Back End](#setup-back-end)

## Important Notes

Before starting:

* Create a new public repository in Github called FIRSTNAME-LASTNAME-ayr-python-code-test
  * example: `john-doe-ayr-python-code-test`
* Clone this repo into a folder with the same name as the repo you just created.
* Go into the repo you cloned and change the remote url to the repo you just created.

## Overview

The goal of this project is to create a simple web app with Flask/React for shortening URLs. The web app should check to make sure URLs are valid and return a 200 HTTP status code before shortening, and should
shorten all URLs to a randomly generated but unique 5 character URI (example: `'http://www.google.com/search/thislink' -> 'http://localhost:5000/fd78s'`). When visiting the newly shortened url, it should redirect
to the original, longer, url, and should also track how many visits a shortened URL has.

## Requirements

### Front End

* Create UI with React for shortening URL. It should contain:
  * A text input for the long URL
  * A button for submitting
  * Errors for invalid URL or not 200 status
* Requests to the back end should be asynchronous to the `/api` routes
* Create UI with React for checking visits to a URL. It should contain:
  * A text input for the shortened URL
    * It should accept both the entire shortened URL (example: `'http://localhost:5000/4fg7a'`) or just the random character hash (example: `'4fg7a'`)
  * A button for submitting
  * Errors for if a URL or URL hash cannot be found
  * The number of views for a link when the request completes

### Back End

* Create/build off of exiting api routes for submitting a URL for shortening as well as retrieving the views for a shortened URL
* Shortened URLs should be automatically generated when creating a new `Url`
* Shortened URL hash should be randomly generated but unique 5 digit string of characters
* URL to be shortened should have validity and status checked before generating a shortened URL
* Shortened URL information should be saved to the SQLite database
* When someone visits the shortened URL, increase the view count for that URL and then redirect to the original URL
* Appropriate errors should be returned from the API for all error scenarios

## Project Setup

### Setup Back End

In the root of the project:

```bash
# Create .env file with required variable
echo "SQLALCHEMY_DATABASE_URI=sqlite:///db.sqlite3" > .env
```

```bash
# Create a virtual environment for the project and activate it
python -m venv venv
source venv/bin/activate
```

```bash
# Install the required packages:
pip install -r requirements.txt
```

```bash
# Set the FLASK_APP environment variable:
export FLASK_APP=run.py
```

```bash
# Run the Flask back end using
flask run
```

The Flask app should now be running at `localhost:5000`

### Setup Front End

While the Flask app is running, open a new terminal window/tab and `cd` back into the project root. From the project root:

```bash
# cd into the client folder
cd app/client
```

```bash
# Install dependencies
yarn install
```

```bash
# Start compiling of front end in --watch mode
yarn start
```

## Project Structure

### Flask Extensions

* __Flask-RESTful__ - API
* __Flask-SQLalchemy__ - SQL ORM

### Files/Folders

* `/api` - Folder for defining Flask RESTful resources for API routes
* `/client` - Folder containing client side JS, CSS, HTML, and build tooling
  * `/client/templates` - Folder for Flask templates
  * `/client/static` - Folder for static JS, CSS, and build output
* `/db` - Folder for defining Models for SQLite db
* `app.py` - File for initial app setup including route binding

## Closing Thoughts

The purpose of this code test is not only to illustrate to us how well you can use the technologies, but also to show how you can critically solve problems.
Take the time to write code that's expressive and shows us your thought process throughout this project. There's no wrong answer to a problem unless you're
unable to give a reason why you chose a solution.