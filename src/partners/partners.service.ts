import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import{ Partner } from './schemas/partner.schema'
import { PartnerAccountStatus } from './schemas/partnerAcctStatus.schema';
import * as bcrypt from 'bcrypt'

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(Partner.name) private partnerModel: Model<Partner>,
    @InjectModel(PartnerAccountStatus.name) private accountStatusModel: Model<PartnerAccountStatus>,
    ){}

  async create({email, password, stage, ...createPartnerDTO}: CreatePartnerDto) {

    let accountStatusId = ""

    if(stage == '1a'){

      const user = await this.partnerModel.findOne({email});
      
      console.log(email);

      if(!user){
        const accountStatus = new PartnerAccountStatus();

        accountStatus.isActive = false;
        accountStatus.isVerified = false;
        accountStatus.isEmailVerified = false;
        accountStatus.createdAt = new Date();
        accountStatus.updatedAt = new Date();

        console.log(user);

        password = await bcrypt.hash(password, 10);

        const newAccountStatus = new this.accountStatusModel(accountStatus);
        const savedAccountStatus = await newAccountStatus.save();

        accountStatusId = savedAccountStatus._id.toString();

        console.log(accountStatusId);

        const newUser = new this.partnerModel({
          ...createPartnerDTO,
          email,
          password,
          accountStatus: savedAccountStatus._id,
        });

        const savedUser = await newUser.save();
        const userObject = savedUser.toObject();
        delete userObject.password;
        return userObject;

      }else{
        throw new BadRequestException('Email already exists!');
      }
    }

    // if (accountStatus) {
    //   const newAccountStatus = new this.accountStatusModel(accountStatus);
    //   const savedAccountStatus = await newAccountStatus.save();


    //   const newUser = new this.partnerModel({
    //     ...createUserDto,
    //     password,
    //     accountStatus: savedAccountStatus._id,
    //   });
    //   return newUser.save();
    // }

    // const newUser = new this.userModel({password, ...createUserDto});
    // return newUser.save();
  }

  findAll() {
    return `This action returns all partners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partner`;
  }

  update(id: number, updatePartnerDto: UpdatePartnerDto) {
    return `This action updates a #${id} partner`;
  }

  remove(id: number) {
    return `This action removes a #${id} partner`;
  }
}
