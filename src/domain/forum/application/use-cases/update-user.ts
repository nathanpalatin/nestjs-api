import { Either } from '@/core/either'
import { Inject, Injectable } from '@nestjs/common'
import { UserUpdate } from '../../enterprise/entities/user'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { UsersRepository } from '../repositories/users-repository'

interface UpdateUserUseCaseRequest {
	id: string
	name: string
}

type UpdateUserUseCaseResponse = {
	user: {
		name: string
	}
}

@Injectable()
export class UpdateUserUseCase {
	constructor(
		@Inject(UsersRepository) private usersRepository: UsersRepository
	) {}

	async execute({
		id,
		name
	}: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
		const user = UserUpdate.update({ name })

		await this.usersRepository.update(id, user)

		return {
			user: {
				name: user.name
			}
		}
	}
}
