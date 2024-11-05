import { Users as PrismaUser, Prisma } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/forum/enterprise/entities/user'
import { ListUsersProps } from '@/domain/forum/enterprise/entities/user'

export class PrismaUserMapper {
	static toDomain(raw: PrismaUser): User {
		return User.create(
			{
				name: raw.name,
				email: raw.email,
				password: raw.password
			},
			new UniqueEntityID(raw.id)
		)
	}

	static toPrisma(user: User): Prisma.UsersUncheckedCreateInput {
		return {
			id: user.id.toString(),
			region: 'aws_us_west_2',
			name: user.name,
			email: user.email,
			password: user.password
		}
	}
}

export class PrismaGetUsersMapper {
	static toDomain(raw: { name: string; email: string }): ListUsersProps {
		return {
			name: raw.name,
			email: raw.email
		}
	}
}
