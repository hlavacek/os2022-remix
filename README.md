# Openslava 2022 Remix workshop

## Getting started

Welcome to our [Openslava 2022](https://www.openslava.sk/2022/#/) workshop, showing you how to use [Remix](https://remix.run/) to build basic web application with server side rendering and other great features.

### Prerequisites

The following prerequisites are required to participate on the workshop or run the applications:

- Standard laptop computer
- [Git](https://git-scm.com/) client (not necessary, as you can also download the code directly from this github repository)
- [NodeJS](https://nodejs.org/en/) - version 16.x should be sufficient, or use [Node Version Manager](https://github.com/nvm-sh/nvm)
- Source code editor, [Visual Studio Code](https://code.visualstudio.com/) or similar

### Application requirements

In this workshop we will create a simple application, which allows to register for a conference or workshop - very similar as you are in now. Here is a summary of requirements for our application:

- The application will present a list of conferences with their dates
- It should allow the user to register on a conference
- It should show existing registrations.
- It should not allow to register a user twice for the same event

As we wanted to keep the applications simple and demonstrate Remix framework, we have not bothered ourselves too much with CSS styling or more advanced persistence. All the data should be persisted in SQL Lite database and we will also use [Prisma.io](https://www.prisma.io/) for our database access layer.

### Repository structure

Please clone this repository to your local machine. It will be used during the workshop to host your code and create the application. The following folders are present:

- [events-react](events-react/)
  - Fully implemented "standard" application with frontend using Create React App and API implemented with Express.js. We will start with this application to showcase differences between standard backend / frontend architecture and a fullstack framework like Remix
- [events-indie](events-indie/)
  - Base Remix application created with the help of [indie stack](https://github.com/remix-run/indie-stack). This will be expanded during the workshop to showcase how Remix can be used to build such application

### Deployed applications

For the purpose of this workshop we have deployed both applications to <fly.io>. They can be accessed via the following URLs:

- <https://events-react-os2022.fly.dev/>
  - The [events-react](./events-react/) application
- <https://events-indie-os2022.fly.dev/>
  - The [events-indie](./events-indie/) version of this application

### Starting standard single page application

The standard single page application is implemented in the [events-react](events-react/) folder. As a first step of this workshop, we'll get this application running click through it.

There are few simple steps to start the application if you have the [Prerequisites](#prerequisites):

1. Open a shell terminal - cmd / git bash / WSL / OS X terminal / Bash, all should do their job
2. Clone this repository:

    ```(bash)
    git clone https://github.com/hlavacek/os2022-remix.git
    ```

3. Enter the repository and install the dependencies for the API

    ```(bash)
    cd events-react/api/
    ```

4. Install the dependencies for the API:

    ```(bash)
    npm i
    ```

5. Run the prisma migrations and seed to generate the database client and the database itself:

    ```(bash)
    npm run migrate:dev
    ```

6. Start the backend:

    ```(bash)
    npm start
    ```

7. Once running, the following URL should be available in the browser with the list of events: <http://localhost:4000/api/events>

8. We will start the frontend now - Open another terminal and go to the location where you have cloned the repostory.
9. Go to the frontend folder of the application:

    ```(bash)
    cd events-react/frontend 
    ```

10. Install the dependencies and start the application in development mode:

    ```(bash)
    npm i
    npm start
    ```

11. Once running, the application should open a browser directly on URL <http://localhost:3000>
12. Your next task is to get more familiar with the application - click through it, try to register few users for an event and see the registrations.

### Starting Remix application

Remix version of the application will be build on top of the [Indie Stack](https://github.com/remix-run/indie-stack). The Indie Stack is a simple template for Remix applications, which provides a basic structure and some basic dependencies. It is a good starting point for any Remix application.

1. Enter the repository and install dependencies

    ```(bash)
    cd events-indie
    npm i
    ```

2. Setup .env file and change your session secret

    ```(bash)
    cp .env.example .env
    ```

3. Run DB setup

    ```(bash)
    npm run setup
    ```

4. Start the application in dev mode

    ```(bash)
    npm run dev
    ```

Application is now running on <http://localhost:3000>. You are now ready to modify it and build your own application on top of it.

## Continuing in the workshop

The further steps for the workshop are documented in [presentation.md](presentation.md). They are also available as merge requests in this repository, to be able to see the changes required to follow the workshop:

- [01 - Create events routes](https://github.com/hlavacek/os2022-remix/pull/1/files){:target="_blank"}
- [02 - Display list of events](https://github.com/hlavacek/os2022-remix/pull/2/files){:target="_blank"}
- [03 - Added prisma schema](https://github.com/hlavacek/os2022-remix/pull/4/files){:target="_blank"}
- [04 - Load events](https://github.com/hlavacek/os2022-remix/pull/5/files){:target="_blank"}
- [05 - Show event details](https://github.com/hlavacek/os2022-remix/pull/7/files){:target="_blank"}
- [06 - Added simple form](https://github.com/hlavacek/os2022-remix/pull/8/files){:target="_blank"}
- [07 - save registration](https://github.com/hlavacek/os2022-remix/pull/9/files){:target="_blank"}
- [08 - form validation](https://github.com/hlavacek/os2022-remix/pull/10/files){:target="_blank"}
- [09 - Show list of registrations](https://github.com/hlavacek/os2022-remix/pull/11/files){:target="_blank"}
- [10 - Added error boundaries](https://github.com/hlavacek/os2022-remix/pull/12/files){:target="_blank"}

## Contact

- Vladimir Hlavacek - vladimir.hlavacek@accenture.com
- Lukas Jusko - lukas.jusko@accenture.com

## Disclaimer

We are employees of Accenture. All the opinions presented in this workshop are our own and do not represent the opinions of our company. The content in the workshop is based on opensource content with the intent to promote [Remix.run](https://remix.run/) framework.
