import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disclosure } from './entities/disclosure.entity';
import { DisclosuresController } from './disclosures.controller';
import { DisclosuresService } from './disclosures.service';

@Module({
  imports: [TypeOrmModule.forFeature([Disclosure])],
  controllers: [DisclosuresController],
  providers: [DisclosuresService],
  exports: [DisclosuresService],
})
export class DisclosuresModule {}
