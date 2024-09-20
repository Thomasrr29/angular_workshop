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

    try {

      const existingUser = await this.userModel.findOne({ email: createUserDto.email });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const newUser = new this.userModel(createUserDto);
      return await newUser.save();
    } catch(error){
      console.error(`issue with the user creation ${error}`)
    }

  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: updateUserDto },
      { new: true }
    ).exec();
  
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
  
    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
