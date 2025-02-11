import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import PaymentsCreateChargeDto from './dto/payments-create-charge.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_change')
  @UsePipes(new ValidationPipe())
  async createChange(@Payload() data: PaymentsCreateChargeDto) {
    return this.paymentsService.createChange(data);
  }
}
