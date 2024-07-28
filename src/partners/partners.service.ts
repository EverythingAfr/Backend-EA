import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import{ Partner } from './schemas/partner.schema'
import { PartnerAccountStatus } from './schemas/partnerAcctStatus.schema';
import * as bcrypt from 'bcrypt'
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { v4 as uuidv4 } from 'uuid';
import { PartnerOtp } from './schemas/partnerOtp.schema';
import { ValidateOtpDto } from './dto/validate-otp.dto';

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(Partner.name) private partnerModel: Model<Partner>,
    @InjectModel(PartnerAccountStatus.name) private accountStatusModel: Model<PartnerAccountStatus>,
    @InjectModel(PartnerOtp.name) private partnerOtpModel: Model<PartnerOtp>,
    private readonly httpService: HttpService
    ){}

  async create(createPartnerDTO: CreatePartnerDto) {
    const {stage, ...requestObj} = createPartnerDTO;

    if(stage == '1a') return await this.createPartner(createPartnerDTO);
  }

  private async sendOtp(email: string, otp: string){
    const response = await firstValueFrom(
      this.httpService.post('http://localhost:5000/api/test/v1/mailer/otpService/sendOtp', {
        email,
        otp
      }),
    );
    return response.data;
  }

  private async createPartner({email, password, ...createPartnerDTO}: CreatePartnerDto){
    let accountStatusId = ""

    const user = await this.partnerModel.findOne({email});
      
      if(!user){
        const role = "partner";
        const accountStatus = new PartnerAccountStatus();

        accountStatus.isActive = false;
        accountStatus.isVerified = false;
        accountStatus.isEmailVerified = false;
        accountStatus.createdAt = new Date();
        accountStatus.updatedAt = new Date();

        password = await bcrypt.hash(password, 10);

        const newAccountStatus = new this.accountStatusModel(accountStatus);
        const savedAccountStatus = await newAccountStatus.save();

        const newUser = new this.partnerModel({
          ...createPartnerDTO,
          email,
          password,
          role,
          accountStatus: savedAccountStatus._id,
        });

        const savedUser = await newUser.save();

        if(!savedUser) throw new BadRequestException('An Error Occured, User not Created');
        const newOtp = this.generateOtp();
        const otpId = this.generateId();
        
        const otpData = new this.partnerOtpModel({
          userId: savedUser._id,
          otpId: otpId,
          otp: newOtp,
          otpUsed: false
        });

        await otpData.save();

        this.sendOtp(email, newOtp);
        const userObject = savedUser.toObject();
        
        delete userObject.password;
        delete userObject.role;

        return {userObject, otpId};

      }else{
        throw new BadRequestException('Email already exists!');
      }
  }

  generateOtp(): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }

  generateId(): string {
    return uuidv4();
  }

  async validateOtp({otpId, otp}: ValidateOtpDto) {
    const otpObject = await this.partnerOtpModel.findOne({otpId});

    if(!otpObject) throw new BadRequestException('Invalid Request');

    if(otpObject.otpUsed) throw new BadRequestException('Invalid Otp');

    const userId = new Types.ObjectId(otpObject.userId);

    if(otpObject.otp === otp){
      
      const {accountStatus} = await this.partnerModel.findById({_id: userId}).populate('accountStatus').exec();
      
      const updateValue = {
        isEmailVerified: true 
      };

      const updateEmailVerified = await this.accountStatusModel.updateMany({_id: accountStatus}, {
        isEmailVerified: true, 
        updatedAt: new Date()
      });

      console.log(updateEmailVerified);

      const updatedOtp = await this.partnerOtpModel.findByIdAndUpdate({_id: otpObject._id}, {
        otpUsed: true, 
      });

      return {
        otpId: otpObject.otpId,
        responseMessage: "Validation Successful"
      }

    }else{
      const updatedOtp = await this.partnerOtpModel.findByIdAndUpdate({_id: otpObject._id}, {
        otpUsed: true, 
      });

      return {
        otpId: otpObject.otpId,
        responseMessage: "Validation Failed"
      }
    }

   
  }

  findAll() {
    return "dummy";
  }

  async findByEmail(email: string) {
    return await this.partnerModel.findOne({email});
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
