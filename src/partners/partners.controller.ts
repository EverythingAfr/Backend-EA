import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Public } from 'src/decorators/public.decorator';
import { ValidateOtpDto } from './dto/validate-otp.dto';

@Controller('/')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Public()
  @Post("register")
  create(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnersService.create(createPartnerDto);
  }

  @Public()
  @Post("validateOtp")
  validate(@Body() validateOtpDto: ValidateOtpDto) {
    return this.partnersService.validateOtp(validateOtpDto);
  }

  @Public()
  @Get('findByEmail/:email')
  findByEmail(@Param('email') email: string){
    return this.partnersService.findByEmail(email);
  }

  @Get()
  findAll() {
    return this.partnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnersService.update(+id, updatePartnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnersService.remove(+id);
  }
}
