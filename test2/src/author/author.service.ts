/* eslint-disable camelcase */
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'
import { from } from 'rxjs';
import { Author } from 'src/graphql';

@Injectable()
export class AuthorService {
  
  private authors: any[] = [
    {
      id: 'nghia',
      firstName: 'Hoang',
      lastName: 'Nghia',
      dob: 123123
    }
  ]

  getAuthors() {
    return this.authors
  }

  getAuthorByID(id: String) {
    return this.authors.find(author => author.id === id)
  }

  createAuthor(author) {
    const newAuthor = new Author()
    newAuthor.id = uuidv4()
    newAuthor.firstName = author.firstName
    newAuthor.lastName = author.lastName
    newAuthor.dob = author.dob
    this.authors.push(newAuthor)
    return newAuthor
  }
}
