import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserModel } from './user.model';
import * as bcrypt from 'bcrypt';
import { UserDetails } from './user-details.interface';
import { ExistingUserDTO } from './existing-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(@InjectModel("User") private userModel: Model<UserModel>,
    private jwtService: JwtService
    ){   
    }
    
    _getUserDetails(user:UserModel): UserDetails{
        return {
            id: user._id,
            username:user.username,
            email:user.email
        }
    }

    async findAll(): Promise<UserModel[]> {
      return await this.userModel.find().exec();
    }

    async findByEmail(email:String): Promise<UserModel | null>{
        return this.userModel.findOne({email}).exec();
    }

    async findById(id:String): Promise<UserDetails | null>{
        const user = await this.userModel.findById(id).exec();
        if(!user) return null;
        return this._getUserDetails(user);
    }

    async registerUser(user: User){
        const {username, email, password} = user;
        const newUser = new this.userModel({
            username: user.username,
            email: user.email,
            password: await bcrypt.hash(user.password, 10) 
        })

        try{
           // const existingUser = await this.findByEmail(email); // another approach
         //   if(existingUser) return 'email taken';
              await newUser.save();
          //  return this._getUserDetails(newUser);
            
        }catch(error){
           
           if(error.message.includes('username')) {
            throw new HttpException('Username has been taken', 404)
           }
           if(error.message.includes('email')) {
            throw new HttpException('email has been taken', 404)
           }
        }
    }

    async doesPasswordMatch(password: String, hashedPassword: String):
    Promise<boolean>{
        return bcrypt.compare(password, hashedPassword);
    }
    async validateUser(
        email: String,
        password: String,
      ): Promise<UserDetails | null> {
        const user = await this.findByEmail(email);
        const doesUserExist = !!user;
    
        if (!doesUserExist) return null;
    
        const doesPasswordMatch = await this.doesPasswordMatch(
          password,
          user.password,
        );
    
        if (!doesPasswordMatch) return null;
        return this._getUserDetails(user);
      }

      async login(
        existingUser: ExistingUserDTO,
      ): Promise<{ token: string } | null> {
        const { email, password } = existingUser;
        const user = await this.validateUser(email, password);
    
        if (!user)
          throw new HttpException('Credentials invalid!', HttpStatus.UNAUTHORIZED);
    
        const jwt = await this.jwtService.signAsync({ user });
        return { token: jwt };
      }

      async verifyJwt(jwt: string): Promise<{ exp: number }> {
        try {
          const { exp } = await this.jwtService.verifyAsync(jwt);
          return { exp };
        } catch (error) {
          throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
        }
      }
}
