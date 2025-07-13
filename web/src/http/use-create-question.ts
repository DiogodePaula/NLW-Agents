import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRequest } from "./types/create-question-request";
import type { CreateQuestionResponse } from "./types/create-question-response";
import type { GetRoomQuestionsResponse } from "./types/get-rooms-questions-response";

export function useCreateQuestion(roomId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ question }: CreateQuestionRequest) => {
			const response = await fetch(`http://localhost:3333/rooms/${roomId}/questions`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ question }),
			});

			const result: CreateQuestionResponse = await response.json();

			return result;
		},
		// APLICAÇÃO DO CONCEITO DE INTERFACE OTIMISTA
		// executa no momento que for feita a chamada para a API
		onMutate: ({ question }) => {
			const questions = queryClient.getQueryData<GetRoomQuestionsResponse>(["get-questions", roomId]);

			const questionsArray = questions ?? [];

			const newQuestion = {
				id: crypto.randomUUID(),
				question,
				answer: null,
				createdAt: new Date().toISOString(),
				isGeneratingAnswer: true,
			};

			queryClient.setQueryData(["get-questions", roomId], [newQuestion, ...questionsArray]);

			return { newQuestion, questions };
		},
		onSuccess: (data, _variables, context) => {
			queryClient.setQueryData<GetRoomQuestionsResponse>(["get-questions", roomId], (questions) => {
				if (!questions) return questions;

				if (!context?.newQuestion) return questions;

				return questions.map((question) => {
					// se a pergunta for a nova, atualiza a resposta
					if (question.id === context.newQuestion.id) {
						return { ...context.newQuestion, id: question.id, answer: data.answer, isGeneratingAnswer: false };
					}

					return question;
				});
			});
		},
		onError: (_error, _variables, context) => {
			if (context?.questions) {
				// se de erro volta a listagem antiga
				queryClient.setQueryData<GetRoomQuestionsResponse>(["get-questions", roomId], context.questions);
			}
		},
	});
}
