import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Mic, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

const isRecordingSupported = !!navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === "function" && typeof window.MediaRecorder === "function";

type RoomParams = {
	roomId: string;
};

export function RecordRoomAudio() {
	const [isRecording, setIsRecording] = useState(false);
	const [recordingTime, setRecordingTime] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const params = useParams<RoomParams>();
	const recorder = useRef<MediaRecorder | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (isRecording) {
			setRecordingTime(0);
			timerRef.current = setInterval(() => {
				setRecordingTime((prev) => prev + 1);
			}, 1000);
		} else {
			if (timerRef.current) clearInterval(timerRef.current);
		}
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isRecording]);

	function formatTime(seconds: number) {
		const min = String(Math.floor(seconds / 60)).padStart(2, "0");
		const sec = String(seconds % 60).padStart(2, "0");
		return `${min}:${sec}`;
	}

	async function stopRecording() {
		setIsRecording(false);

		if (recorder.current && recorder.current.state !== "inactive") {
			recorder.current.stop();
		}

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
	}

	async function uploadAudio(audio: Blob) {
		setIsLoading(true);
		// application/multipart/form-data
		const formData = new FormData();
		formData.append("file", audio, "audio.webm");

		const response = await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
			method: "POST",
			body: formData,
		});

		const result = await response.json();
		console.log(result);
		setIsLoading(false);
		setRecordingTime(0); // Reinicia o contador após enviar o áudio
	}

	async function createRecorder(audio: MediaStream) {
		recorder.current = new MediaRecorder(audio, {
			mimeType: "audio/webm",
			audioBitsPerSecond: 64_000,
		});

		recorder.current.ondataavailable = (event) => {
			if (event.data.size > 0) {
				uploadAudio(event.data);
			}
		};

		recorder.current.onstart = () => {
			console.log("gravando...");
		};

		recorder.current.onstop = () => {
			console.log("parou de gravar");
		};

		recorder.current.start();
	}

	async function startRecording() {
		if (!isRecordingSupported) {
			alert("Gravação de áudio não suportada");
			return;
		}

		setIsRecording(true);

		// pegar video ou audio do usuário
		const audio = await navigator.mediaDevices.getUserMedia({
			audio: {
				echoCancellation: true,
				noiseSuppression: true,
				sampleRate: 44_100,
			},
		});

		await createRecorder(audio);

		intervalRef.current = setInterval(() => {
			recorder.current?.stop();
			// aqui no navegador eu nao consigo parar o audio e pegar um pedaço dele
			// tenho que que dar o stop e começar de novo
			createRecorder(audio);
		}, 5000);
	}

	if (!params.roomId) {
		return <Navigate replace to="/" />;
	}

	return (
		<div className="min-h-screen bg-zinc-950">
			<div className="container mx-auto max-w-4xl px-4 py-8">
				<Link to={`/room/${params.roomId}`}>
					<Button variant="outline" className="flex items-center gap-2 mb-4">
						<ArrowLeft className="size-4 mr-2" />
						Voltar para Perguntas
					</Button>
				</Link>
				<div className="flex flex-col items-center gap-6 p-8 rounded-2xl shadow-xl bg-card text-card-foreground border justify-center min-h-[60vh]">
					<div className="relative flex items-center justify-center mb-2">
						<span
							className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300
						${isRecording ? "bg-red-500/20 animate-pulse shadow-2xl" : "bg-zinc-700/30"}`}>
							{isRecording ? <Mic className="w-16 h-16 text-red-600 animate-pulse" /> : <Mic className="w-16 h-16 text-zinc-500" />}
						</span>
					</div>

					{isRecording && <span className="mb-2 bg-black/70 text-white px-4 py-1 rounded-full text-xl font-mono shadow text-center">{formatTime(recordingTime)}</span>}

					<Button
						onClick={isRecording ? stopRecording : startRecording}
						className={`w-44 h-14 text-lg font-bold flex items-center justify-center gap-2 transition-all duration-200
					${isRecording ? "bg-red-600 hover:bg-red-700" : "bg-primary hover:bg-primary/90"}`}
						disabled={isLoading}>
						{isLoading ? (
							<Loader2 className="animate-spin w-6 h-6" />
						) : isRecording ? (
							<>
								<Square className="w-6 h-6" /> Parar
							</>
						) : (
							<>
								<Mic className="w-6 h-6" /> Gravar áudio
							</>
						)}
					</Button>

					{isRecording && (
						<p className="text-red-600 font-semibold text-lg flex items-center gap-2">
							<Loader2 className="animate-spin w-5 h-5" /> Gravando...
						</p>
					)}
					{isLoading && (
						<p className="text-primary font-semibold text-lg flex items-center gap-2">
							<Loader2 className="animate-spin w-5 h-5" /> Enviando áudio...
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
