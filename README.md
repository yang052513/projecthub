# Projecthub

> https://projecthub.web.app/

## Table of Contents

- [Introduction](#01)
- [Install](#02)
- [Usage](#03)
- [Features](#05)
- [Preview](#06)
- [Tools](#07)

#

## <span id="01">Introduction</span>

This project was created for my summer algorithim part time course. The app allows students filter and search courses easily without submit a form then direct to a new page everytime Then the app will generate a timetable for student to preview the course schedule. Easy and quick. No more long time gap between classes.

Right now I only update Coquitlam College course lists due to the project time constraints. I am looking into UBC and other school course scraping. Anyway, the idea is to help students to simplify the process of enrolling courses and avoid the time conficlts.

#

## <span id="02">Install</span>

Install all the necessary dependencies before running the application. In your shell, type the following:

```shell
cd course-flex
npm install
```

You might need to install `nodemon` and `concurrently` if giving error based on above code

```shell
cd course-flex
npm install nodemon concurrently --save
```

#

## <span id="03">Usage</span>

### Live Demo

The project is hosting at [Heroku courseflex](https://courseflex.herokuapp.com/)

### Running on Local Machine

Typing the following command in your shell, and the application should be running at `localhost:3000`. The server will start at port `8080`.

```shell
cd course-flex
npm run dev
```

#

## <span id="05">Features</span>

- Search the course by course title or codes keywords
- Filter the course with department, level, class start time, weekdays
- Prompt if there are conflicts with the course choosed
- Prompt if there are too many courses taken
- Edit or empty course cart
- Generate a timetable for visiualizing course schedule to avoid time gap

#

## <span id="06">Preview</span>

![](client/public/img/demo/2.png)
![](client/public/img/demo/3.png)

## <span id="07">Tools</span>

- React
- Firebase Firestore, Cloud Storage, Hosting
- Typescript
- Sass
- Material UI
