import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Post,
	UsePipes
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { RegisterUserUseCase } from '@/domain/forum/application/use-cases/register-user'
import { UserAlreadyExistsError } from '@/domain/forum/application/use-cases/errors/user-already-exists-error'
import { Public } from '@/infra/auth/public'

const createAccountBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string()
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@Public()
export class CreateAccountController {
	constructor(private registerUser: RegisterUserUseCase) {}

	@Post()
	@HttpCode(201)
	@UsePipes(new ZodValidationPipe(createAccountBodySchema))
	async handle(@Body() body: CreateAccountBodySchema) {
		const { name, email, password } = body

		const result = await this.registerUser.execute({
			name,
			email,
			password
		})

		if (result.isLeft()) {
			const error = result.value

			switch (error.constructor) {
				case UserAlreadyExistsError:
					throw new ConflictException(error.message)
				default:
					throw new BadRequestException(error.message)
			}
		}
	}
}
