import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Partner, PartnerSchema } from './schemas/partner.schema';
import { PartnerAccountStatus, PartnerAccountStatusSchema } from './schemas/partnerAcctStatus.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Partner.name,
        schema: PartnerSchema,
      },
      {
        name: PartnerAccountStatus.name,
        schema: PartnerAccountStatusSchema,
      },
    ])
],
  controllers: [PartnersController],
  providers: [PartnersService],
})
export class PartnersModule {}
