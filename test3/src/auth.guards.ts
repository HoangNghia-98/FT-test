import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const authorization = req.headers.authorization
    if(!authorization) return false
    // const token = request.headers.authorization.split(" ")[1]
    // if (!token) return false
    // const decodeToken = jwt.verify(token, '_sup3rs3cr3t_')
    try {
      const token = authorization.split(" ")[1];
      console.log('token',token, );
      if (!token) return false;
      const decodedToken = jwt.verify(token, "sup3rs3cr3t");

      console.log('decodedToken', decodedToken);
      req.user =  decodedToken
      return true
    } catch(err) {
      console.log(err)
      return false;
    }
  }
}