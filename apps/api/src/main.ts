import { AppModule } from "@/app.module";
import { ApplicationFactory } from "@/application/application.factory";

async function bootstrap() {
  const app = await ApplicationFactory.create(AppModule);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
