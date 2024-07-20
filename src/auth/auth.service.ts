import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignIn } from './dto/signin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/User.schema';
import * as bcrypt from 'bcrypt'
import { STATUS_CODES } from 'http';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ){}
 
  async signIn(userSignIn: SignIn) {
    const user = await this.userModel.findOne({username: userSignIn.username});

    if(user != null){
      
      const passwordMatch = await bcrypt.compare(userSignIn.password, user?.password);

      if(!passwordMatch){
        throw new UnauthorizedException({
          message: "Invalid Username or Password",
          statusCode: 401
        });
      }

      const { password, ...result }  = user; 

      const payload = {sub: user._id, username: user.username}

      return {
        access_token: await this.jwtService.signAsync(payload),
      }
    }else{
      throw new UnauthorizedException({
        message: "Invalid Username or Password",
        statusCode: 401
      });
    }
  }
}
