import { Resolver, Mutation, ResolveProperty, Parent, Context, Args } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostInput } from 'src/graphql';
import { AuthorService } from 'src/author/author.service';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService, private readonly authorService: AuthorService) {}

  @Mutation('createPost')
  async createPost(@Args('postInput') postInput: PostInput, @Context() context: any ) {
    return await this.postService.createPost(postInput, context)
  }

  @ResolveProperty('createdBy')
  async getAuthor(@Parent() post) {
    return await this.authorService.getAuthorByID(post.createdBy)
  }
}
