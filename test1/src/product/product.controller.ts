import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';
import * as jwt from 'jsonwebtoken'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly authService: AuthService) { }

  // localhost:4000/product/public
  @Get('public')
  getPublicProduct() {
    return this.productService.getPublicProduct()
  }

  // localhost:4000/product/protected
  @Get('protected')
  getProtectedProduct(@Req() req, @Res() res) {
    if (!req.headers.authorization) return res.status(403).json({
      success: false,
      message: "No token available!"
    })

    const token = req.headers.authorization.split(' ')[1]
    // console.log(token) 
    // console.log('secret',this.authService.getSecret()) 
    if (!token) return res.status(403).json({
      success: false,
      message: "No token available!"
    })
    try {
      const tokenDecode = jwt.verify(token, this.authService.getSecret())
      const userID = tokenDecode.userID
      return res.status(200).send(`private content of ${userID}`)
    } catch (err) {
      return res.status(403).send(err).json({
        success: false,
        message: "No token available!"
      })
    }

  }

}
