                                                                    # DB Setup Instruction #
                                                                    
Plz login to your Mongodb clound account and create a database and database user. In my case named the database `MOVIEMANAGEMENT` and named the database user as 'mongodbuser'.
Then from the Database tab, click on Connect -> from the modal choose `Connect your application`. From here copy the connectionstring and paste it in the app.module.ts file
(found in this directory - MovieApp/backend/movie_manage_backend/src/app.module.ts). You may require to follow up this file if you need to set the database name and database
user based on your needs.

                                                                    # Application Run Instruction #
                                                                    
After cloning this project from `https://github.com/tarikulislam786/MovieApp.git`, inside the directory `movie_manage_backend` and inside the directory `movie_manage_client`
make sure you install all the project packagee manager depencies using the command `npm install`. 
a) Run client app: 
In order to run client app run this command `npm run start` in the follwing directory.
/frontend/movie_manage_client. The client app is running on this port http://localhost:3000
a) Run client app: 
In order to run backend app run this command `npm run start:dev` in the follwing directory.
backend\movie_manage_backend. The backend app is running on this port http://localhost:8000/. Once you run the backend application, the two collections of MOVIEMANAGEMENT 
database `users` and `movies` shoud automagically be created.

                                                                     # Application Surfing Instruction #
                                                                          
                                                                          
Open the browser and enter the url http://localhost:3000. Right before login you just proceed register from the user interface. Now you have login access. But after you are 
logged in you may have not found the movies list. Because we have not created them so far. To create some dummy movies, I have implemented the api and used `Postman`
to insert some dummy movie data. Not have implemented the fronted of creating the movie as it is not in the requirement. So open the postman and make a post request 
using uri -> http://localhost:8000/movies
where the body raw json will be as follows

{
"movieTitle": "Movie 2",
"releaseDate": "2012-04-23T18:25:43.511Z",
"movieType": "B type",
"movieDirector": "Armin Nicolas"
}

Then hit the send button, you will be caught in unauthorized access. The problem is who the hell is accessing the api ? Is he/she is authorized/permitted to do this 
or does he/she has any token to make it accessible ? The answer is yes you have it. Right after a successful login, in the browser's localstorage, a token has been stored.
You just way need to copy the value of token. Then in the postman where you made the request
http://localhost:8000/movies
here just choose the Authorization tab -> Choose Type - Bearer Token -> and there is a text field token, you just need to paste the copied value of token you did earlier.
And hit the button Send. You made it (Movie is created in a secured JWTGuard). You may add as many movie as you need.
So our movie collection is full of data. Now if you login the application you will see the movie list. Feel free to reach me, if you need further any clarification.


                                        ############# Happy Coding, By Tarikul ###############
                                        
\- Whatsapp: +8801926228731, 
\- Skype: tarikulislam789, 
\- Email: tarikulislam.cse@gmail.com

