import { Module } from "@nestjs/common";
import { QueueProcessingServicesModule } from "./queue/queue-processing-services.module";

@Module({
	imports: [QueueProcessingServicesModule],
	exports: [QueueProcessingServicesModule],
})
export class ProcessingServicesModule {}
