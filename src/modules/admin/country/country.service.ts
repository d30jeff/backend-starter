import { countries } from '@datasource/countries';
import { CustomLogger, Logger } from '@providers/logger.provider';
import { generateID } from '@providers/nanoid.provider';
import { CountryRepository } from '@repositories/country.repository';
import { Service } from 'typedi';

@Service()
export class CountryService {
  @Logger()
  private readonly logger: CustomLogger;

  constructor(private readonly countryRepository: CountryRepository) {}

  async initialize() {
    const total = await this.countryRepository.count({});

    if (total === countries.length) {
      this.logger.info('Countries have been populated. Skipping...');
      return;
    }

    await this.countryRepository.createMany({
      skipDuplicates: true,
      data: countries.map((country) => {
        return {
          ID: generateID('country'),
          code: country.code,
          currencyCode: country.currencyCode,
          diallingCode: country.diallingCode,
          name: country.name,
        };
      }),
    });
  }
}
