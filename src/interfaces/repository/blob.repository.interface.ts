export interface IBlobRepository {
    upload(file: Express.Multer.File): Promise<string>;
}