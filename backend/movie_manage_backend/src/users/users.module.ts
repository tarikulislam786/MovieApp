import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
    imports: [MongooseModule.forFeature([{
        name: "User",
        schema: UserSchema
    
      }]),JwtModule.registerAsync({
        useFactory: () => ({
          secret: 'secret',
          signOptions: { expiresIn: '3600s' },
        }),
      })],
  controllers: [UsersController],
  providers: [UsersService, JwtGuard, JwtStrategy]
})
export class UsersModule {}
