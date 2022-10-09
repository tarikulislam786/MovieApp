import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieModel } from './movie.model';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from 'src/users/guards/jwt.guard';

@Injectable()
export class MoviesService {
    constructor(@InjectModel("Movie") private movieModel: Model<MovieModel>,private jwtService: JwtService){}

    @UseGuards(JwtGuard)
    async findAll(): Promise<Movie[]> {
        return await this.movieModel.find().exec();
    }

    async create(movie: Movie): Promise<Movie> {
        try {
            return await new this.movieModel({
                ...movie,
                createdAt: new Date(),
              }).save();
        } catch(error){
            if(error.message.includes('movieTitle')) {
             throw new HttpException('Movie has been taken', 404)
            }
         }
        
      }
}