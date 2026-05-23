import { Module } from '@nestjs/common';
import { ObserverController } from './observer.controller';
import { ObserverService } from './observer.service';

@Module({
  controllers: [ObserverController],
  providers: [ObserverService],
  exports: [ObserverService],
})
export class ObserverModule {}
