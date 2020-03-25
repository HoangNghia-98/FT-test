import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { MessageModule } from "./message/message.module";
import * as jwt from "jsonwebtoken";

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ["./**/*.graphql"],
      definitions: {
        path: join(process.cwd(), "src/graphql.ts"),
        outputAs: "class"
      },
      context: ({ req, connection }) => {
        if (connection) {
          return {
            req: connection.context
          };
        }
        return { req };
      },
      installSubscriptionHandlers: true,
      subscriptions: {
        onConnect: (connectionParams: any, ws) => {
          try {
            const { Authorization } = connectionParams;
            if (!Authorization) return false;
            const token = Authorization.split(" ")[1];
            if (!token) return;
            const decodedToken = jwt.verify(token, "sup3rs3cr3t");

            console.log(decodedToken);
            return { // object dc return o day se dc luu vao context cua filter
              ...decodedToken
            };
          } catch(err) {
            console.log(err)
            return false;
          }
        }
      }
    }),
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
