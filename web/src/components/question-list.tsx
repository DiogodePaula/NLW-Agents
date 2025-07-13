import { useRoomQuestions } from "@/http/use-room-questions";
import { Loader2 } from "lucide-react";
import { QuestionItem } from "./question-item";

interface QuestionListProps {
	roomId: string;
}

export function QuestionList({ roomId }: QuestionListProps) {
	const { data, isLoading } = useRoomQuestions(roomId);

	console.log(data);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold text-2xl text-foreground">Perguntas & Respostas</h2>
			</div>

			{isLoading ? (
				<div className="flex items-center justify-center">
					<Loader2 className="size-10 animate-spin" />
				</div>
			) : (
				data && data?.map((question) => <QuestionItem key={question.id} question={question} />)
			)}
		</div>
	);
}
