import { useCreateRoom } from "@/http/use-create-room";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

// javascript cheio de validação
const createRoomSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	description: z.string(),
});

// tipagem do formulario
type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomsForm() {
	const { mutateAsync: createRoom } = useCreateRoom();

	const createRoomForm = useForm<CreateRoomFormData>({
		resolver: zodResolver(createRoomSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	async function handleCreateRoom({ name, description }: CreateRoomFormData) {
		const { roomId } = await createRoom({ name, description });

		if (roomId) {
			toast.success("Room created successfully");
			createRoomForm.reset();
		} else {
			toast.error("Failed to create room");
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create Rooms</CardTitle>
				<CardDescription>Create a new room</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...createRoomForm}>
					<form onSubmit={createRoomForm.handleSubmit(handleCreateRoom)} className="flex flex-col gap-4">
						<FormField
							control={createRoomForm.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Rooms name" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={createRoomForm.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea {...field} placeholder="Rooms description" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full">
							Create Room
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
