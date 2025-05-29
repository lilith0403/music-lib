export interface IUploadService {
    uploadAudio(file: Express.Multer.File): Promise<string>;
}