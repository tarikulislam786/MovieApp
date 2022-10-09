import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { MovieDto } from './movie.dto';
import { MoviesService } from './movies.service';
import { JwtGuard } from '../users/guards/jwt.guard';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService){}

        @UseGuards(JwtGuard)  
        @Get('movieList')
        async index() {
            return await this.moviesService.findAll();
        }

        @Post()
        async create(@Body() movieDto: MovieDto) {
            return await this.moviesService.create(movieDto);
        }
}


