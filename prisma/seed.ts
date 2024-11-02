import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
	await prisma.user.create({
		data: {
			name: faker.person.fullName(),
			email: faker.internet.email().toLocaleLowerCase(),
			password: await hash('123456', 1)
		}
	})
}

seed().then(() => {
	console.log('Database seeded!')
	prisma.$disconnect()
})
