import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Inject,
	Put,
	Request,
	UseGuards,
	UsePipes
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { UserAlreadyExistsError } from '@/domain/forum/application/use-cases/errors/user-already-exists-error'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UpdateUserUseCase } from '@/domain/forum/application/use-cases/update-user'

const updateAccountBodySchema = z.object({
	name: z.string()
})

const getTokenAccountHeaderSchema = z.object({
	user: z.object({
		sub: z.string()
	})
})

type UpdateAccountBodySchema = z.infer<typeof updateAccountBodySchema>
type GetTokenHeaderSchema = z.infer<typeof getTokenAccountHeaderSchema>

@Controller('/accounts')
@UseGuards(JwtAuthGuard)
export class UpdateAccountController {
	constructor(
		@Inject(UpdateUserUseCase)
		private updateUser: UpdateUserUseCase
	) {}

	@Put()
	@HttpCode(204)
	@UsePipes(new ZodValidationPipe(updateAccountBodySchema))
	async handle(
		@Body() body: UpdateAccountBodySchema,
		@Request() req: GetTokenHeaderSchema
	) {
		const { name } = body

		const userId = req.user.sub

		const result = await this.updateUser.execute({ id: userId, name })

		return {
			result
		}
	}
}
