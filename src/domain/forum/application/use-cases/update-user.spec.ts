import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { UpdateUserUseCase } from './update-user'
import { User } from '../../enterprise/entities/user'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: UpdateUserUseCase

describe('Update User', () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository()
		sut = new UpdateUserUseCase(inMemoryUsersRepository)
	})

	it('should be able to update username', async () => {
		const user = User.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		})

		await inMemoryUsersRepository.create(user)

		const newName = 'John Doe Updated'
		await sut.execute({ id: user.id.value, name: newName })

		const updatedUser = await inMemoryUsersRepository.findById(user.id.value)
		expect(updatedUser).toBeTruthy()
		expect(updatedUser?.name).toBe(newName)
	})
})
