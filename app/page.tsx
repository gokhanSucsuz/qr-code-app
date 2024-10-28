import QrCodeGenerator from "@/components/QrCodeGenerator";
import Image from "next/image";

export default function Home() {
	return (
		<div className="relative min-h-[100vh] h-full flex items-center justify-center">
			<QrCodeGenerator />
		</div>
	);
}
