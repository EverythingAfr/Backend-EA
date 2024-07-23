import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { InventoryModule } from './inventory/inventory.module';
import { SearchModule } from './search/search.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { ShippingModule } from './shipping/shipping.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { PartnersModule } from './partners/partners.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration]
    }), 
    MongooseModule.forRoot('mongodb+srv://test:test1234@everythingdb.8ein3v7.mongodb.net/?retryWrites=true&w=majority&appName=EverythingDB'),
    AdminModule, 
    UserModule, 
    ProductModule, 
    OrderModule, 
    CategoryModule, 
    InventoryModule, 
    SearchModule, 
    CartModule, 
    PaymentModule, 
    ShippingModule, 
    AuthModule,
    RouterModule.register([
      {
        path: 'api/test/v1/',
        module: AppModule,
        children: [
          {
            path: 'auth',
            module: AuthModule
          },
          {
            path: 'users',
            module: UserModule
          }
        ]
      }
    ]),
    PartnersModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
