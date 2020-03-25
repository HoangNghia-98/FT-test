import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthorModule } from './author/author.module'
import { join } from 'path'
import { PostModule } from './post/post.module';
@Module({
  imports: [ConfigModule.forRoot(), 
    GraphQLModule.forRoot({
    typePaths: ['./**/*.graphql'],
    definitions: {
      path: join(process.cwd(), 'src/graphql.ts'),
      outputAs: 'class',
    },
    context: ({ req }) => req 
  }), AuthorModule, PostModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
