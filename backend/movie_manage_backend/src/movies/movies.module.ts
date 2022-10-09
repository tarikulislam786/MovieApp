import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieSchema } from './movie.model';

@Module({
  imports: [MongooseModule.forFeature([{
    name: "Movie",
    schema: MovieSchema

  }]),JwtModule.registerAsync({
    useFactory: () => ({
      secret: 'secret',
      signOptions: { expiresIn: '3600s' },
    }),
  })],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
