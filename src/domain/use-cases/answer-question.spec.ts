import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('create an answer', () => {
	const answerQuestion = new AnswerQuestionUseCase()

	const answer = answerQuestion.execute({
		instructorId: '123',
		questionId: '456',
		content: 'new'
	})

	expect(answer.content).toEqual('new')
})
