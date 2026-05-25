import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DisclosuresModule } from './disclosures/disclosures.module';
import { KpisModule } from './kpis/kpis.module';
import { EventsModule } from './events/events.module';
import { BoardModule } from './board/board.module';
import { StocksModule } from './stocks/stocks.module';
import { WorkflowHistoryModule } from './workflow-history/workflow-history.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.local', '.env'],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('app.dbHost', 'localhost'),
        port: configService.get<number>('app.dbPort', 5432),
        username: configService.get<string>('app.dbUser', 'postgres'),
        password: configService.get<string>('app.dbPassword', 'postgres'),
        database: configService.get<string>('app.dbName', 'ir_db'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('app.nodeEnv') !== 'production',
        logging: configService.get<string>('app.nodeEnv') === 'development',
      }),
    }),

    AuthModule,
    UsersModule,
    DisclosuresModule,
    KpisModule,
    EventsModule,
    BoardModule,
    StocksModule,
    WorkflowHistoryModule,
  ],
})
export class AppModule {}
