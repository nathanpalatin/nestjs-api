import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UsersRepository } from '@/domain/forum/application/repositories/users-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { CacheModule } from '../cache/cache.module'

@Module({
	imports: [CacheModule],
	providers: [
		PrismaService,
		{
			provide: UsersRepository,
			useClass: PrismaUsersRepository
		}
	],
	exports: [UsersRepository, PrismaService] // Certifique-se de exportar UsersRepository
})
export class DatabaseModule {}
