import { Controller, Get, UseGuards } from '@nestjs/common'
import { ListUsersUseCase } from '@/domain/forum/application/use-cases/list-users'
import {
	ListUsers,
	type ListUsersProps
} from '@/domain/forum/enterprise/entities/user'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class ListUsersController {
	constructor(private listUsersUseCase: ListUsersUseCase) {}

	@Get()
	async handle(): Promise<ListUsersProps[]> {
		const { users } = await this.listUsersUseCase.execute()

		return users
	}
}
