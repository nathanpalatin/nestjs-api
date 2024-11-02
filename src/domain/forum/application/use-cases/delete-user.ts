import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'

type DeleteUserUseCaseResponse = {
	user: User | null
}

type DeleteUserUseCaseRequest = {
	id: string
}

@Injectable()
export class DeleteUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		id
	}: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
		const user = await this.usersRepository.findById(id)

		if (!user) {
			throw new BadRequestException('User not found')
		}

		await this.usersRepository.delete(id)

		return {
			user
		}
	}
}
