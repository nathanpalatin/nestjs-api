import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { DeleteUserUseCase } from './delete-user'
import { User } from '../../enterprise/entities/user'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Delete User', () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository()
		sut = new DeleteUserUseCase(inMemoryUsersRepository)
	})

	it('should be able to delete a user', async () => {
		const user = User.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		})

		await inMemoryUsersRepository.create(user)

		await sut.execute({ id: user.id.value })

		const deletedUser = await inMemoryUsersRepository.findById(user.id.value)
		expect(deletedUser).toBeNull()
	})
})
