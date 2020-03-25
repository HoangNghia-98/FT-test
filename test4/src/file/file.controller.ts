import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Get, Param, Res, Query } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as Path from 'path'
import { imageFileFilter } from './file-upload.utils'
import * as FileType from 'file-type'
import * as fs from 'fs'
import * as os from 'os'
import  * as uuidv4  from 'uuid/v4'
import { from } from 'rxjs';


@Controller('file')
export class FileController {

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter, limits: { fileSize: 30720 } }))
  async uploadFile(@UploadedFile() fileUpload, @Res() res) {
    try {
      console.log('fileUpload', fileUpload)
      const newName = uuidv4()
      const fileType = await FileType.fromBuffer(fileUpload.buffer)
      console.log(fileType)
      if (!fileType || !fileType.mime.startsWith('image')) {
        return res.status(415).json({
          err: "This extension file are not .png!!! "
        })
      }
      console.log('FileType', fileType)
      console.log('url', Path.join(`/tmp/${newName}`))
      await fs.writeFile(Path.join('tmp', newName), fileUpload.buffer, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The filewas' saved!");
        return res.status(201).json({
          id: newName,
          originalname: fileUpload.originalname,
          size: fileUpload.size
        })
      })
    } catch (err) {
      console.log(err)
      return res.json({ err })
    }
  }

  @Get('download')
  seeUploadedFile(@Query('id') fileID, @Res() res) {

    const unsafeSuffix = fileID
    const safeSuffix = Path.normalize(unsafeSuffix).replace(/^(\.\.(\/|\\|$))+/, '')
    if (safeSuffix !== unsafeSuffix) return res.status(400).json({})

    return res.sendFile(fileID, { root: Path.join('tmp') })
  }

}
