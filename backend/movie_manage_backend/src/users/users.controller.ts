import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ExistingUserDTO } from './existing-user.dto';
import { JwtGuard } from './guards/jwt.guard';
import { UserDetails } from './user-details.interface';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users') //http://localhost:8000/users
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    user(@Body() userDto: UserDto) {
      return this.usersService.registerUser(userDto)
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() existingUserDTO: ExistingUserDTO): Promise<{token: string} | null> {
      return this.usersService.login(existingUserDTO);
    }

    @UseGuards(JwtGuard)  
    @Get(':id')
    getUser(@Param('id') id: string): Promise<UserDetails | null>{
        return this.usersService.findById(id);
    }

    @UseGuards(JwtGuard)  
    @Get(':email')
    getUserByEmail(@Param('email') email: string){
        return this.usersService.findByEmail(email);
    }

    @Get('userList')
        async index() {
          return await this.usersService.findAll();
    }
}
