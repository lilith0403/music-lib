import { Module } from "@nestjs/common";
import { UploadController } from "src/controllers/upload.controller";
import { BlobRepository } from "src/repository/blob.repository";
import { UploadService } from "src/services/upload.service";

@Module({
    imports: [],
    controllers: [UploadController],
    providers: [
        UploadService,
        BlobRepository,

        { provide: 'IUploadService', useClass: UploadService },
        { provide: 'IBlobRepository', useClass: BlobRepository },
    ],
    exports: [
        "IUploadService",
        "IBlobRepository"
    ]
})
export class UploadModule {}
