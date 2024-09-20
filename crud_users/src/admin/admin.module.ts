import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { adminSchema } from './entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/auth/jwt.secret.ket';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
  MongooseModule.forFeature([{name: 'Admin', schema: adminSchema}]),
  PassportModule, 
  JwtModule.register({
    secret: jwtConstants.secret, 
    signOptions: { expiresIn: '60m' },
  }),],
  controllers: [AdminController],
  providers: [AdminService, JwtStrategy],
})
export class AdminModule {}
