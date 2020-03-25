import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'
import * as jwt from 'jsonwebtoken'
import { Message } from 'src/graphql';

@Injectable()
export class MessageService {

  // database local
  private messages: any[] = [
    {
      _id: 'id_default',
      createdBy: 'Nghia',
      roomID: "room1",
      content: 'content_def',
      createdAt: 123
    }
  ]

  async createMessage(message, context) {
   
    try {
      // console.log('context.req: \n',context.req)
      // const token = context.headers.authorization.split(" ")[1]
      // console.log('\n token: \n', token)
      const newMessage = new Message()
      newMessage._id = uuidv4()
      newMessage.roomID = message.roomID
      newMessage.content = message.content
      newMessage.createdAt = +new Date()
      newMessage.createdBy = 'def_value'

      this.messages.push(newMessage)
      return newMessage

    } catch (err) {
      console.log(err)
      return false
    }

  }
}
