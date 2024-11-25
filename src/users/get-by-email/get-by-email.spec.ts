import { Test, TestingModule } from '@nestjs/testing';
import { GetByEmailService } from './get-by-email.service';
import { UserService } from '../_model/users.service';

describe('GetByEmailService', () => {
  let service: GetByEmailService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetByEmailService,
        {
          provide: UserService,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GetByEmailService>(GetByEmailService);
    userService = module.get<UserService>(UserService);
  });

  describe('getByEmail', () => {
    it('should return true if user exists', async () => {
      const email = 'test@example.com';

      userService.find = jest.fn().mockResolvedValue([{ email }]);

      const result = await service.getByEmail(email);
      expect(result).toBe(true);
      expect(userService.find).toHaveBeenCalledWith({ email });
    });

    it('should return false if user does not exist', async () => {
      const email = 'nonexistent@example.com';

      userService.find = jest.fn().mockResolvedValue([]);

      const result = await service.getByEmail(email);
      expect(result).toBe(false);
      expect(userService.find).toHaveBeenCalledWith({ email });
    });

    it('should throw an error if userService fails', async () => {
      const email = 'error@example.com';

      userService.find = jest
        .fn()
        .mockRejectedValue(new Error('Database error'));

      await expect(service.getByEmail(email)).rejects.toThrow('Database error');
      expect(userService.find).toHaveBeenCalledWith({ email });
    });
  });
});
