import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Partner, PartnerSchema } from './schemas/partner.schema';
import { PartnerAccountStatus, PartnerAccountStatusSchema } from './schemas/partnerAcctStatus.schema';
import { HttpModule } from '@nestjs/axios';
import { PartnerOtp, PartnerOtpSchema } from './schemas/partnerOtp.schema';

@Module({
  imports:[
    HttpModule,
    MongooseModule.forFeature([
      {
        name: Partner.name,
        schema: PartnerSchema,
      },
      {
        name: PartnerAccountStatus.name,
        schema: PartnerAccountStatusSchema,
      },
      {
        name: PartnerOtp.name,
        schema: PartnerOtpSchema,
      },
    ])
],
  controllers: [PartnersController],
  providers: [PartnersService],
})
export class PartnersModule {}
