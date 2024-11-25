import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { ENVIRONMENT } from './_config/constants/environment.constant';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { MovieModule } from './movies/movies.module';

@Module({
  imports: [
    MongooseModule.forRoot(ENVIRONMENT.DB_MONGO_CONNECTION, {}),
    AuthModule,
    UserModule,
    MovieModule,
  ],
  providers: [AppService],
})
export class AppModule {}
