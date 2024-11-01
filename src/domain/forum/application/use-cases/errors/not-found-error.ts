import { UseCaseError } from '@/core/errors/use-case-error'

export class UsersNotFoundError extends Error implements UseCaseError {
	constructor() {
		super(`Users not found.`)
	}
}
