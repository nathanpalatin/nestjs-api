import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UsersRepository } from '@/domain/forum/application/repositories/users-repository'
import {
	User,
	ListUsers,
	type ListUsersProps
} from '@/domain/forum/enterprise/entities/user'
import {
	PrismaGetUsersMapper,
	PrismaUserMapper
} from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
	constructor(private prisma: PrismaService) {}

	async findById(id: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
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
		const users = await this.prisma.user.findMany({
			select: {
				name: true,
				email: true
			}
		})

		return users.map(user => PrismaGetUsersMapper.toDomain(user))
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
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

		await this.prisma.user.create({
			data
		})
	}
}
