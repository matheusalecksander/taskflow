import * as bcrypt from 'bcrypt';
export class CryptoService {
  private saltHash = 10;
  async hash(data: string) {
    const hashed = await bcrypt.hash(data, this.saltHash);

    return hashed;
  }

  async compare(data: string, encrypted: string) {
    return bcrypt.compare(data, encrypted);
  }
}
