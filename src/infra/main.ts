import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn']
	})

	const configService = app.get(EnvService)
	const port = configService.get('PORT')

	await app.listen(port, '0.0.0.0')
}
bootstrap()
