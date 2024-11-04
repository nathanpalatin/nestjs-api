import {
	User,
	type ListUsersProps,
	type UserUpdate
} from '../../enterprise/entities/user'

export abstract class UsersRepository {
	abstract findMany(): Promise<ListUsersProps[] | null>
	abstract findByEmail(email: string): Promise<User | null>
	abstract findById(id: string): Promise<User | null>
	abstract create(user: User): Promise<User | void>
	abstract update(id: string, user: UserUpdate): Promise<UserUpdate | void>
	abstract delete(id: string): Promise<void>
}
