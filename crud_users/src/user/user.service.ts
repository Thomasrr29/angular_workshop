import { ConflictException, Injectable, NotFoundException, Response } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<User>){}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
