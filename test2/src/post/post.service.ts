import { Injectable, HttpException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'
import { AuthorService } from 'src/author/author.service';
import { Post } from 'src/graphql';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class PostService {
  constructor(private readonly authorService: AuthorService) { }

  // init data default
  private posts: any[] = []

  // function createPost when mutation
  async createPost(postInut, context) {
    try {
     
      const token = context.headers.authorization.split(" ")[1]
      const newPost = new Post()
      newPost.id = uuidv4()
      newPost.categories = postInut.categories
      newPost.content = postInut.content
      newPost.title = postInut.title
      newPost.createdAt = +new Date()
      newPost.createdBy = await jwt.verify(token, 's3cr3t').authorID
    
      return newPost
    } catch(err) {
      console.log(err)
      throw new HttpException(err, 403);
    }
   
  }

}
