import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

@Module({
	imports: [BullModule.forRoot({})],
	exports: [BullModule],
})
export class QueueProcessingServicesModule {}
