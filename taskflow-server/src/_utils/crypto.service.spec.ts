import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  it('should encrypt one string', async () => {
    const service = new CryptoService();

    const input = 'crypto_test';

    const result = await service.hash(input);
    expect(result).not.toBe(input);
    expect(typeof result).toBe('string');
  });

  it('should compare succesfully one string', async () => {
    const service = new CryptoService();
    const input = 'crypto_test';

    const encrypted = await service.hash(input);
    const result = await service.compare(input, encrypted);
    expect(result).toBe(true);
  });

  it('should return false if strings dont match', async () => {
    const service = new CryptoService();
    const input = 'crypto_test';

    const encrypted = await service.hash(input);
    const result = await service.compare(input + 'false', encrypted);
    expect(result).toBe(false);
  });
});
