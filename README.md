This project is build using Bun, Drizzle and bunch of Javascript flashhy stuff.
It has strict type checking no any's

`src` --> Inside the src folder the actual source code and regarding the project will reside, Currently this doesn't have test (will add eventually)

Let's take a look inside the `src` folder

- `utils` --> This folder contains some helper methods eg. logger

- `types` --> Where all the typescript interface/types is present

- `index.ts` --> This file the main app router will container all our application

- `routes` --> In the routes we have assign the routes and their corresponding middleware and controllers

- `middlewares` --> In this folder where all the incoming requests intercept where we can write our validators, authentication etc.

- `controllers` --> They are the kind of last middleware as post them you will call the business layer to execute the business logics, once the business logics returns we structure the API response in controllers and send the output

- `repositories` --> This folder contains all the logic using which we interact the DB by writing writting queries, all the raw queries or orm quries will go here.

- `services` --> This layer will contains the business logic and interact with repositories for data from the database


#SETTING UP THE PROJECT LOCALLY 

