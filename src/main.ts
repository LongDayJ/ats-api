import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ResponseInterceptor());

    const config = new DocumentBuilder()
        .setTitle("ATS API")
        .setDescription(
            "Acompanhamento do Transporte Sanitário — Lei 15.233/2025\n\n" +
            "**Todas as respostas** são embrulhadas pelo ResponseInterceptor:\n" +
            "```json\n{ \"timestamp\": \"...\", \"message\": \"OK\", \"data\": <payload> }\n```\n\n" +
            "Use o botão **Authorize** para inserir o JWT obtido em POST /auth/login."
        )
        .setVersion("1.0")
        .addBearerAuth(
            { type: "http", scheme: "bearer", bearerFormat: "JWT", name: "bearer" },
            "bearer",
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    const port = Number(process.env.PORT) || 2001;
    await app.listen(port);

    const logger = new Logger();
    logger.log("");
    logger.log("-=-=-=-=- ATS API -=-=-=-=-");
    logger.log(`✓ Ready in ${process.uptime().toFixed(1)}s`);
    logger.log(`➜ Local:   http://localhost:${port}`);
    logger.log(`➜ Swagger: http://localhost:${port}/docs`);
    logger.log("-=-=-=-=--=-=-=-=--=-=-=-=-");
}

bootstrap();
