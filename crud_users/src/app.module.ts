import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'), //local connection
    UserModule,
    AdminModule,
  ],
})
export class AppModule {}
