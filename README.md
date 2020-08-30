<p align="center">
<img src="https://firebasestorage.googleapis.com/v0/b/projecthub-yang.appspot.com/o/image.png?alt=media&token=dd992b14-d92a-4ac0-a394-187c3cc3555d" alt="" width="100">
</p>

<p align="center">
<img src="https://img.shields.io/github/license/yang052513/projecthub" alt="" />
<img src="https://img.shields.io/github/v/tag/yang052513/projecthub" alt="" /></p>

<h1 align="center">ProjectHub</h1>

> 🔖 A collection based project management dashboard application.

<img src="./src/assets/preview/home.png" alt="" />

## Introduction

ProjectHub is a project management system that utilized with different progress status and conventional kanban system to track all your projects.

Projecthub also allows you to create team project request and let other developers to join with you.

---

## Usage

### Live Demo

Please checkout live demo at here [Projecthub](https://projecthub-yang.web.app/)

### Running on Local Machine

> The application use firebase database, plase replace **your own firebase database configuration** in `.env` and change accordingly in `Login.tsx` components under `auth` src folder.

Then you could running on the local machine using `start script command`.

```shell
git clone https://github.com/yang052513/projecthub.git
cd projecthub
npm install
npm start
```

## Features

- Creating or editing a project and manage different status
- Team shared or individual used Kanban system
- Working with other people by creating a group project request
- Notification centre
- Project and activity analysis with chart view
- Explore other people public project ideas
- Friend and chat system
- Story share feature
- Custom the apparence of the application

**Setting, Apparence, Profile**

<img src="./src/assets/preview/profile.png" alt="" width="80%"/>

**Friend chat**

<img src="./src/assets/preview/friend.png" alt="" width="80%"/>

**Explore**

<img src="./src/assets/preview/explore.png" alt="" width="80%"/>

**Group**

<img src="./src/assets/preview/group.png" alt="" width="80%"/>

## Tools

- React
- React Hooks API
- Typescript
- Sass
- Firebase
- Material UI
- Rechart
