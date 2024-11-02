import { DomainEvents } from '@/core/events/domain-events'
import { UsersRepository } from '@/domain/forum/application/repositories/users-repository'
import { User } from '@/domain/forum/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = []

	async findByEmail(email: string) {
		const user = this.items.find(item => item.email === email)

		if (!user) {
			return null
		}

		return user
	}

	async findMany() {
		return this.items
	}

	async create(user: User) {
		this.items.push(user)

		DomainEvents.dispatchEventsForAggregate(user.id)
	}
}
