import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from './seed.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);

  try {
    await seedService.seedBooks();
    await seedService.seedMembers();
    console.log('Seeders completed successfully.');
  } catch (error) {
    console.error('Error running seeders:', error);
  } finally {
    await app.close();
  }
}

seed();
