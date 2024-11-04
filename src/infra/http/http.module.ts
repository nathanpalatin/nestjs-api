import { Module } from '@nestjs/common'

import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { DatabaseModule } from '../database/database.module'
import { RegisterUserUseCase } from '@/domain/forum/application/use-cases/register-user'
import { AuthenticateUserUseCase } from '@/domain/forum/application/use-cases/authenticate-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { ListUsersUseCase } from '@/domain/forum/application/use-cases/list-users'
import { ListUsersController } from './controllers/list-accounts.controller'
import { DeleteUserUseCase } from '@/domain/forum/application/use-cases/delete-user'
import { DeleteAccountController } from './controllers/delete-account.controller'
import { UpdateAccountController } from './controllers/update-account.controller'
import { UpdateUserUseCase } from '@/domain/forum/application/use-cases/update-user'

@Module({
	imports: [DatabaseModule, CryptographyModule],
	controllers: [
		CreateAccountController,
		AuthenticateController,
		ListUsersController,
		DeleteAccountController,
		UpdateAccountController
	],
	providers: [
		RegisterUserUseCase,
		AuthenticateUserUseCase,
		ListUsersUseCase,
		DeleteUserUseCase,
		UpdateUserUseCase
	]
})
export class HttpModule {}
