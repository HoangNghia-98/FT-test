import { Resolver, Mutation, Args, Query, Subscription, Context } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions'
import { MessageInput } from 'src/graphql';
import { MessageService } from './message.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guards';

const pubSub = new PubSub()

@Resolver('Message')
export class MessageResolver {
  constructor(private readonly messageService: MessageService) { }

  @Query()
  async helloWorld() {
    return "Hello World"
  }


  @Mutation()
  //@UseGuards(AuthGuard)
  async createMessage(@Args('message') message: MessageInput, @Context() context: any) {
    const newMessage = await this.messageService.createMessage(message, context)
    pubSub.publish('messageCreated', {
      messageCreated: newMessage
    })
    return newMessage
  }

  @Subscription('messageCreated', {
    filter: (payload, variables, context) => {
      try {
        console.log('req', context.req, variables, payload.messageCreated)
        const req = context.req

        return req.privileges.includes(payload.messageCreated.roomID) && variables.roomID === payload.messageCreated.roomID
      } catch (err) {
        console.log(err)
        return false
      }
    
    }
  })
  messageCreated() {
    return pubSub.asyncIterator('messageCreated')
  }
}
