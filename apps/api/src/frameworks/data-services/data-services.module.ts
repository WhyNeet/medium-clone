import { MongoDataServicesModule } from "@/frameworks/data-services/mongo/mongo-data-services.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [MongoDataServicesModule],
  exports: [MongoDataServicesModule],
})
export class DataServicesModule {}
