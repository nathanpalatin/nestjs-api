import { DomainEvents } from '@/core/events/domain-events'
import { UsersRepository } from '@/domain/forum/application/repositories/users-repository'
import {
	User,
	ListUsers,
	type ListUsersProps
} from '@/domain/forum/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = []
	public users: ListUsersProps[] = []

	async findByEmail(email: string) {
		const user = this.items.find(item => item.email === email)

		if (!user) {
			return null
		}

		return user
	}

	async findMany() {
		const users = this.users
		return users
	}

	async create(user: User) {
		this.items.push(user)

		DomainEvents.dispatchEventsForAggregate(user.id)
	}
}
