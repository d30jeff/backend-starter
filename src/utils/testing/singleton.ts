import { DeepMockProxy, mock, mockDeep, mockReset } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

import prisma from '@/utils/testing/client.js';

jest.mock('./client', () => ({
  __esModule: true,
  default: mock<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
