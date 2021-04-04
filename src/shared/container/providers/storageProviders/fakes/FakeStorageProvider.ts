import IStorageProvider from '../interfaces/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const avatarIndex = this.storage.findIndex(
      avatarFile => avatarFile === file,
    );

    this.storage.splice(avatarIndex, 1);
  }
}
