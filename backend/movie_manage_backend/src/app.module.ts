import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';



@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://mongodbuser:mongodbuser@cluster0.uv35bzd.mongodb.net/MOVIEMANAGEMENT?retryWrites=true&w=majority'), UsersModule, MoviesModule],
  providers: [AppService],
})
export class AppModule {}
