
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class MessageInput {
    content: string;
    roomID: string;
}

export class Message {
    _id?: string;
    createdBy?: string;
    roomID?: string;
    content?: string;
    createdAt?: number;
}

export abstract class IMutation {
    abstract createMessage(message?: MessageInput): Message | Promise<Message>;
}

export abstract class IQuery {
    abstract helloWorld(): string | Promise<string>;
}

export abstract class ISubscription {
    abstract messageCreated(roomID: string): Message | Promise<Message>;
}
