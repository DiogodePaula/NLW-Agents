import { useRooms } from "@/http/use-rooms";
import { dayjs } from "@/lib/dayjs";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function RoomList() {
	const { data, isLoading } = useRooms();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Rooms</CardTitle>
				<CardDescription>You can create a new room to start a new conversation.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-3">
					{isLoading ? (
						<div className="flex items-center justify-center">
							<Loader2 className="size-10 animate-spin" />
						</div>
					) : (
						data &&
						data?.map((room) => (
							<Link key={room.id} to={`/room/${room.id}`} className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50">
								<div className="flex-1 flex-col gap-1">
									<h3 className="font-medium">{room.name}</h3>

									<span className="flex items-center gap-2">
										<Badge variant="secondary" className="text-xs mt-2">
											{dayjs(room.createdAt).fromNow()}
										</Badge>
										<Badge variant="secondary" className="text-xs mt-2">
											{room.questionsCount} {room.questionsCount === 1 ? "question" : "questions"}
										</Badge>
									</span>
								</div>

								<span className="flex items-center gap-1 text-sm">
									Entrar
									<ArrowRight className="size-3" />
								</span>
							</Link>
						))
					)}
				</div>
			</CardContent>
		</Card>
	);
}
