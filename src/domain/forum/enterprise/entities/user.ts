import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface UserProps {
	name: string
	email: string
	password: string
}

export interface ListUsersProps {
	name: string
	email: string
}

export class ListUsers extends Entity<ListUsersProps> {
	get users() {
		return this.props
	}
	static list(props: ListUsersProps) {
		const users = new ListUsers(props)

		return users
	}
}

export class User extends Entity<UserProps> {
	get name() {
		return this.props.name
	}

	get email() {
		return this.props.email
	}

	get password() {
		return this.props.password
	}

	static create(props: UserProps, id?: UniqueEntityID) {
		const user = new User(props, id)

		return user
	}
}
