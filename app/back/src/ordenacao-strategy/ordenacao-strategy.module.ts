import { Module } from '@nestjs/common';
import { OrdenacaoStrategyService } from './ordenacao-strategy.service';
import { OrdenacaoStrategyController } from './ordenacao-strategy.controller';

@Module({
  controllers: [OrdenacaoStrategyController],
  providers: [OrdenacaoStrategyService],
})
export class OrdenacaoStrategyModule {}
