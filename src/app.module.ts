import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { TokenModule } from './auth/token/token.module';
import { Record } from './record/record.entity';
import { RecordModule } from './record/record.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '12345',
      username: 'postgres',
      entities: [User, Record],
      database: 'postgres',
      synchronize: true,
      schema: 'faceup'
    }),
    AuthModule,
    TokenModule,
    RecordModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessJwtAuthGuard,
    // },
    // JwtService,
    // ConfigService,
  ],
})
export class AppModule { }