import { BlobServiceClient } from "@azure/storage-blob";
import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid"
import { IBlobRepository } from "src/interfaces/repository/blob.repository.interface";

@Injectable()
export class BlobRepository implements IBlobRepository {
    private readonly containerName = process.env.CONTAINER_NAME
    private readonly client = BlobServiceClient.fromConnectionString(process.env.BLOB_STORAGE_CONNECTION_STRING)

    async upload(file: Express.Multer.File): Promise<string> {
        const containerClient = this.client.getContainerClient(this.containerName)
        const blobName = `${uuid()}-${file.originalname}`;

        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadData(file.buffer)

        return blockBlobClient.url;
    }
}