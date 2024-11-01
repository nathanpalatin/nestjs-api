import type { ListUsersUseCase } from './list-users'

let sut: ListUsersUseCase

describe('List Users', () => {
	it('should be able to list all users', async () => {
		const { users } = await sut.execute()

		expect(users).toBe(true)
	})
})
