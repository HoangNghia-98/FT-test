import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthorModule } from 'src/author/author.module';
import { PostResolver } from './post.resolver';


@Module({
  imports: [AuthorModule],
  providers: [PostService, PostResolver],
  exports: [PostService]
})
export class PostModule {}
