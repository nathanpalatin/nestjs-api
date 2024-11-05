import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UsersRepository } from '@/domain/forum/application/repositories/users-repository'
import {
	User,
	type ListUsersProps,
	type UserUpdate
} from '@/domain/forum/enterprise/entities/user'
import {
	PrismaGetUsersMapper,
	PrismaUserMapper
} from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
	constructor(private prisma: PrismaService) {}

	async findById(id: string): Promise<User | null> {
		const user = await this.prisma.users.findFirst({
			where: {
				id
			}
		})

		if (!user) {
			return null
		}

		return PrismaUserMapper.toDomain(user)
	}

	async findMany(): Promise<ListUsersProps[] | null> {
		const users = await this.prisma.users.findMany({
			select: {
				name: true,
				email: true
			}
		})

		return users.map(user => PrismaGetUsersMapper.toDomain(user))
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.prisma.users.findUnique({
			where: {
				email
			}
		})

		if (!user) {
			return null
		}

		return PrismaUserMapper.toDomain(user)
	}

	async create(user: User): Promise<void> {
		const data = PrismaUserMapper.toPrisma(user)

		await this.prisma.users.create({
			data
		})
	}

	async update(id: string, data: UserUpdate): Promise<UserUpdate | void> {
		const user = await this.prisma.users.update({
			where: {
				id: id
			},
			data: {
				name: data.name
			}
		})

		return PrismaUserMapper.toDomain(user)
	}

	async delete(id: string): Promise<void> {
		await this.prisma.users.delete({
			where: {
				id
			}
		})
	}
}
