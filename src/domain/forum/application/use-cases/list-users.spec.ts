import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { ListUsersUseCase } from './list-users'
import { User } from '@/domain/forum/enterprise/entities/user'

let inMemoryUsersRepository = new InMemoryUsersRepository()
let sut: ListUsersUseCase

describe('List Users', () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository()
		sut = new ListUsersUseCase(inMemoryUsersRepository)
	})

	it('should be able to list all users', async () => {
		await inMemoryUsersRepository.create(
			User.create({
				name: 'John Doe',
				email: 'johndoe@example.com',
				password: '123456'
			})
		)

		await inMemoryUsersRepository.create(
			User.create({
				name: 'John Doe2',
				email: 'johndoe2@example.com',
				password: '123456'
			})
		)

		const { users } = await sut.execute()

		expect(users).toEqual([
			{ name: 'John Doe', email: 'johndoe@example.com' },
			{ name: 'John Doe2', email: 'johndoe2@example.com' }
		])
	})
})
