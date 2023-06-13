import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

// Defined modules
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      path: '/api',
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
        // 'subscriptions-transport-ws': true,
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/types/graphql.ts'),
        outputAs: 'class',
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'client/build'),
      exclude: ['/api'],
    }),
    AuthModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
