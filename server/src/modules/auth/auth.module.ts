import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { TasksModule } from '../tasks/tasks.module';
import { TasksService } from '../tasks/tasks.service';
import { TasksController } from '../tasks/tasks.controller';
import { TasksEntity } from '../tasks/entities/tasks.entity';

// Auth Module will not have a table in database but will utilize other modules to perform actions that need more privacy
// Example will be logging in.
@Module({
  imports: [
    UserModule,
    MailModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1hr' },
    }),
    TasksModule,
  ], // Importing exported modules to use within this module
  controllers: [AuthController, TasksController],
  providers: [AuthService, MailService],
})
export class AuthModule {}
