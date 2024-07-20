import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/User.schema';
import { AccountStatus } from 'src/schemas/accountStatus.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(AccountStatus.name) private accountStatusModel: Model<AccountStatus>,
  ) {}

  async registerUser(username: string, password: string): Promise<{ message: string }> {
    try {
      const hash = await bcrypt.hash(password, 10);
      await this.userModel.create({ username, password: hash });
      return { message: 'User registered successfully' };
    } catch (error) {
      throw new Error('An error occurred while registering the user');
    }
 }

  async createUser({ accountStatus, password, ...createUserDto }: CreateUserDto) {
    password = await bcrypt.hash(password, 10);
    console.log(password);
    
    if (accountStatus) {
      const newAccountStatus = new this.accountStatusModel(accountStatus);
      const savedAccountStatus = await newAccountStatus.save();

      console.log(password);
      const newUser = new this.userModel({
        ...createUserDto,
        password,
        accountStatus: savedAccountStatus._id,
      });
      return newUser.save();
    }
    const newUser = new this.userModel({password, ...createUserDto});
    return newUser.save();
  }

  getsUsers() {
    return this.userModel.find().populate(['accountStatus']);
  }

  findOne(username: string) {
    return this.userModel.find({username}).populate(['accountStatus']);
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate(['accountStatus']);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}