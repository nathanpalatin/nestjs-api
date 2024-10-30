import { Either, left, right } from '@/core/either'
import { Inject, Injectable } from '@nestjs/common'
import { User } from '../../enterprise/entities/user'
import { HashGenerator } from '../cryptography/hash-generator'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { UsersRepository } from '../repositories/users-repository'

interface RegisterUserUseCaseRequest {
	name: string
	email: string
	password: string
}

type RegisterUserUseCaseResponse = Either<
	UserAlreadyExistsError,
	{
		user: User
	}
>

@Injectable()
export class RegisterUserUseCase {
	constructor(
		@Inject(UsersRepository) private usersRepository: UsersRepository,
		private hashGenerator: HashGenerator
	) {}

	async execute({
		name,
		email,
		password
	}: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
		const userWithSameEmail = await this.usersRepository.findByEmail(email)

		if (userWithSameEmail) {
			return left(new UserAlreadyExistsError(email))
		}

		const hashedPassword = await this.hashGenerator.hash(password)

		const user = User.create({
			name,
			email,
			password: hashedPassword
		})

		await this.usersRepository.create(user)

		return right({
			user
		})
	}
}
