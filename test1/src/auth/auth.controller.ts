import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common'
//import { AuthGuard } from './auth.guard'
import { UserService } from 'src/user/user.service'
import { AuthService } from './auth.service'


@Controller('auth')
//@UseGuards(AuthGuard)
export class AuthController {
  constructor(private readonly userService: UserService,private readonly authService: AuthService) { }

  @Post('register')
  async register(@Req() req, @Res() res) {
    const userInfRegister = req.body
    // check inf register is correct or not
    if (!userInfRegister || userInfRegister.name === '' || userInfRegister.username === '' || userInfRegister.password === '') {
      return res.status(409).json({
        success: false,
        massage: 'User Inf is not correct to register!!!'
      })
    }
    // check username register is exist in database
    let userIsExist = this.userService.isExistUsername(userInfRegister.username)
    if (userIsExist) {
      return res.status(409).json({
        success: false,
        massage: 'username is already exist!!'
      })
    }
    console.log('123')
    await this.userService.addUserToDB(userInfRegister)
    console.log('123') 
    return res.status(204).json({
      success: true,
      massage: 'register successfully!'
    })
  }

  // localhost:4000/auth/login
  @Post('login')
  async login(@Req() req, @Res() res) {
    const dataLogin = req.body
    // check username and password
    const login = await this.userService.login(dataLogin.username, dataLogin.password)
    //console.log('login:', login)
    if (!login) {
      return res.status(404).json({
        success: false,
        message: "fail to try login!!!"
      })
    }
    
    // if login = true -> create token and send to client
    const userLogin = this.userService.getUserByUserName(dataLogin.username)
    if (!userLogin) {
      return res.status(404).json({
        success: false,
        message: "fail to try login!!!"
      })
    }
    console.log(userLogin)
    const hashBody = { "userID": userLogin._id} 
    const token = this.authService.createToken(hashBody) 
    console.log('created token, token') 
    return res.status(201).json({
      // success: true,
      // message: "you are login now!",
      token: `${token}`
    })
  }
}