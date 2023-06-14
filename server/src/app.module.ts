import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';

// Defined modules
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TrackModule } from './track/track.module';
import { SubjectModule } from './subject/subject.module';
import { ReviewModule } from './review/review.module';

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
      rootPath: join(process.cwd(), '../client/build'),
      exclude: ['/api', '/login', '/callback', '/logout', '/user'],
    }),
    AuthModule,
    PrismaModule,
    TrackModule,
    SubjectModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
