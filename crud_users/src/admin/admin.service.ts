import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './entities/admin.entity';
import { Model } from 'mongoose';
import { loginDto } from 'src/user/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AdminService {

  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    private jwtService: JwtService){}

  async create(createAdminDto: CreateAdminDto) {
    const admin = new this.adminModel(createAdminDto)
    return await admin.save()
  }

  async login(loginDto: loginDto){

    try {

      const {username, password} = loginDto

      const user = await this.adminModel.findOne({
        username: username
      })
  
      if(!user){
        throw new NotFoundException(`THE USER WITH THE USERNAME: ${username} WASN'T FOUND`)
      }
  
      if(user.password === password){
        console.log(user.password)
        const payload = {username: user.username, sub: user._id}
        return {
          access_token: this.jwtService.sign(payload)
        }

      } else {
        throw new ConflictException(`THE PASSWORD IS WRONG`)
      }

     


    } catch(error){
      console.error(`MISTAKE WITH THE LOGIN ${error}`)
    }
  }

  async findAll() {
    return await this.adminModel.find()
  }

  async findOne(id: number) {
    return await this.adminModel.findOne({id})
  }

}
