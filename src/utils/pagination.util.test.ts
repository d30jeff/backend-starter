import {
  Pagination,
  serializePaginationParams,
} from '@/utils/pagination.util.js';
import { getMockReq } from '@jest-mock/express';

describe('Pagination Util', () => {
  describe('Class', () => {
    test('Should generate the correct totalPages based on given params', () => {
      const pagination = new Pagination({
        page: 1,
        total: 15,
        limit: 5,
      });

      expect(pagination.page).toBe(1);
      expect(pagination.totalPages).toBe(3);
      expect(pagination.limit).toBe(5);
      expect(pagination.totalResults).toBe(15);
    });
  });

  describe('serializePaginationParams', () => {
    test('Should detect page and limit query params', () => {
      const request = getMockReq({
        query: {
          page: '2',
          limit: '10',
        },
      });

      const pagination = serializePaginationParams(request);

      expect(pagination.page).toEqual(2);
      expect(pagination.limit).toEqual(10);
    });

    test('When given page is 0, it should default to 1', () => {
      const request = getMockReq({
        query: {
          page: '0',
        },
      });

      const pagination = serializePaginationParams(request);
      expect(pagination.page).toEqual(1);
    });

    test('When given page is less than 0, it should default to 1', () => {
      const request = getMockReq({
        query: {
          page: '-1',
        },
      });

      const pagination = serializePaginationParams(request);
      expect(pagination.page).toEqual(1);
    });

    test('When given limit is 0, it should default to 50', () => {
      const request = getMockReq({
        query: {
          limit: '0',
        },
      });

      const pagination = serializePaginationParams(request);
      expect(pagination.limit).toEqual(50);
    });

    test('When given limit is less than 0, it should default to 50', () => {
      const request = getMockReq({
        query: {
          limit: '-1',
        },
      });

      const pagination = serializePaginationParams(request);
      expect(pagination.limit).toEqual(50);
    });

    test('When given limit is over 100, it should default to 50', () => {
      const request = getMockReq({
        query: {
          limit: '101',
        },
      });

      const pagination = serializePaginationParams(request);
      expect(pagination.limit).toEqual(50);
    });
  });
});
