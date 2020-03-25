import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'


@Injectable()
export class AuthGuard implements CanActivate {
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Authorization
    const req = context.switchToHttp().getRequest()
    const token = req && req.headers.authorization

    //TODO: validate token jwt.verify
    //Decode token
    //this.userService để lấy thông tin người dùng
    //const userData = [{ name: 'Nguyen Van A', age: 12 }]
    //req.user = userData
    console.log(`token: ${token}`)
    return true
  }
}