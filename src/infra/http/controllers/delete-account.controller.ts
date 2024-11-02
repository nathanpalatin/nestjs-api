import {
	Controller,
	Delete,
	HttpCode,
	UseGuards,
	Request,
	Inject
} from '@nestjs/common'
import { DeleteUserUseCase } from '@/domain/forum/application/use-cases/delete-user'
import { z } from 'zod'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'

const deleteAccountBodySchema = z.object({
	user: z.object({
		sub: z.string()
	})
})

type DeleteAccountHeaderSchema = z.infer<typeof deleteAccountBodySchema>

@Controller('/accounts')
@UseGuards(JwtAuthGuard)
export class DeleteAccountController {
	constructor(
		@Inject(DeleteUserUseCase)
		private deleteUser: DeleteUserUseCase
	) {}

	@Delete()
	@HttpCode(204)
	async handle(@Request() req: DeleteAccountHeaderSchema) {
		await this.deleteUser.execute({
			id: req.user.sub
		})
	}
}
