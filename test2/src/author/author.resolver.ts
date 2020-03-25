import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { AuthorInput } from 'src/graphql';

@Resolver('Author')
export class AuthorResolver {
  constructor(
    private readonly authorsService: AuthorService,
    //private readonly postsService: PostsService,
  ) {}

  @Query(() => String)
  async hello() {
    return 'cuoi cung cung dc!'
  }

  @Mutation()
  async createAuthor(@Args('author') author: AuthorInput) {

    return this.authorsService.createAuthor(author)
  }
}
