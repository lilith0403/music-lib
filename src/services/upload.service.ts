import { Inject, Injectable } from "@nestjs/common";
import { IBlobRepository } from "src/interfaces/repository/blob.repository.interface";
import { IUploadService } from "src/interfaces/services/upload.service.interface";

@Injectable()
export class UploadService implements IUploadService {
    constructor(
        @Inject("IBlobRepository") private readonly blobRepository: IBlobRepository
    ) {}

    async uploadAudio(file: Express.Multer.File): Promise<string> {
        return await this.blobRepository.upload(file)
    }
}