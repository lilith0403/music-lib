import { Controller, Inject, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IUploadService } from "src/interfaces/services/upload.service.interface";
import { AudioFileValidationPipe } from "src/pipes/upload.validation.pipe";


@ApiTags("Upload")
@Controller("upload")
export class UploadController {

    constructor(
        @Inject("IUploadService") private readonly uploadService: IUploadService
    ) {}

    @Post()
    @ApiOperation({ summary: "Does an audio upload" })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'URL do áudio retornada com sucesso' })
    @UseInterceptors(FileInterceptor("file"))
    async uploadFile(@UploadedFile(new AudioFileValidationPipe()) file: Express.Multer.File):Promise<string> {
        const url = await this.uploadService.uploadAudio(file);
        return url;
    }
}