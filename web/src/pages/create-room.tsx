import { CreateRoomsForm } from "@/components/create-rooms-form";
import { RoomList } from "@/components/room-list";

export function CreateRoom() {
	return (
		<div className="min-h-screen py-8 px-4">
			<div className=" mx-auto max-w-4xl">
				<div className="grid grid-cols-2 items-start gap-8">
					<CreateRoomsForm />
					<RoomList />
				</div>
			</div>
		</div>
	);
}
