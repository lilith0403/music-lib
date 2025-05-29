import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { fromBuffer, FileTypeResult } from "file-type";

@Injectable()
export class AudioFileValidationPipe implements PipeTransform {

    private readonly allowedMimeTypes = [
        'audio/mpeg',     'audio/wav',      'audio/x-wav',    
        'audio/x-aiff',   'audio/ogg',      'audio/flac',     'audio/mp4',      
    ]

    async transform(file: Express.Multer.File, _metadata: ArgumentMetadata) {
        if (!file) throw new BadRequestException("File is required");
        

        const fileType: FileTypeResult | undefined = await fromBuffer(file.buffer);

        if (!fileType) throw new BadRequestException("Invalid file type");
        
        const isAllowed = this.allowedMimeTypes.includes(fileType.mime);

        if (!isAllowed) throw new BadRequestException(`Unsupported file type: ${fileType.mime}. Allowed types are: ${this.allowedMimeTypes.join(", ")}`);

        return file
    }


}