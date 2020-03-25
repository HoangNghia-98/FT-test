import { Injectable, Req } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class ProductService {

  constructor(private readonly authService: AuthService) {}

  getPublicProduct() {
    return 'public content'
  } 

  getProtectedProduct(token: string) {
    //let token = req.headers.authorization
    // const freshToken = token.replace('Bearer ', '');
    // console.log(`${freshToken}`)

    //  let TokenDecode = jwt.verify(freshToken, this.authService.getSecret())
    //  console.log(TokenDecode)

    // return freshToken
    return true
  }
}
