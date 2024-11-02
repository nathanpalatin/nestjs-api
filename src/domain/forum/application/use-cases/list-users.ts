import { Inject, Injectable } from '@nestjs/common'
import { type ListUsersProps } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'
import { UsersNotFoundError } from './errors/not-found-error'

type ListUsersUseCaseResponse = {
	users: ListUsersProps[]
}

@Injectable()
export class ListUsersUseCase {
	constructor(
		@Inject(UsersRepository) private usersRepository: UsersRepository
	) {}

	async execute(): Promise<ListUsersUseCaseResponse> {
		const users = await this.usersRepository.findMany()

		if (!users) {
			throw new UsersNotFoundError()
		}

		return {
			users: users.map(user => ({
				name: user.name,
				email: user.email
			}))
		}
	}
}
