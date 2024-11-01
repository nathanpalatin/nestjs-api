import { Module } from '@nestjs/common'

import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { DatabaseModule } from '../database/database.module'
import { RegisterUserUseCase } from '@/domain/forum/application/use-cases/register-user'
import { AuthenticateUserUseCase } from '@/domain/forum/application/use-cases/authenticate-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { ListUsersUseCase } from '@/domain/forum/application/use-cases/list-users'
import { ListUsersController } from './controllers/list-accounts.controller'

@Module({
	imports: [DatabaseModule, CryptographyModule],
	controllers: [
		ListUsersController,
		CreateAccountController,
		AuthenticateController
	],
	providers: [RegisterUserUseCase, AuthenticateUserUseCase, ListUsersUseCase]
})
export class HttpModule {}
