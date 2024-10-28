import QrCodeGenerator from "@/components/QrCodeGenerator";

export default function Home() {
	return (
		<div className="relative min-h-[100vh] h-full flex items-center justify-center">
			<QrCodeGenerator />
		</div>
	);
}
