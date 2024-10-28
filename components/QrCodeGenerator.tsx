"use client";
import React, { useState, ChangeEvent } from "react";
import { ModeToggle } from "./ModeToggle";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadIcon, LayoutGrid, Link, Mail } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { QRCodeSVG } from "qrcode.react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

const QrCodeGenerator = () => {
	const [url, setUrl] = useState("");
	const [color, setColor] = useState("#ffffff");
	const [bgColor, setBgColor] = useState("#000000");
	const [logo, setLogo] = useState<string | null>(null);
	const [logoFile, setLogoFile] = useState<File | null>(null);
	const [qrType, setQrType] = useState("link");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	const handleEmailInput = () => {
		const mailToLink = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(message)}`;
		setUrl(mailToLink)
	}
	const handleDownload = (type: "png" | "svg") => {
		console.log(logoFile, qrType)
		const qrCodeElement = document.getElementById("qr-code");
		if (qrCodeElement) {
			if (type === "png") {
				toPng(qrCodeElement)
					.then((dataUrl) => {
						saveAs(dataUrl, "qr-code.png");
					})
					.catch((err) => {
						console.log("Error generating qr code", err);
					});
			} else if (type === "svg") {
				const svgElement = qrCodeElement.querySelector("svg");
				if (svgElement) {
					const saveData = new Blob([svgElement.outerHTML], {
						type: "image/svg+xml;charset=utf-8",
					});
					saveAs(saveData, "qr-code.svg");
				}
			}
		}
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setLogoFile(file);
			const reader = new FileReader();
			reader.onloadend = () => setLogo(reader.result as string);
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="flex mx-6 max-w-[1250px] w-full min-h-[700px] h-full">
			<Card className="flex-1 relative flex flex-col w-full h-auto mx-auto bg-[#f2f2f2]/95 dark:bg-[#2f2f2f]/95 rounded-xl backdrop-blur-md shadow-xl">
				<div className="absolute top-4 right-4">
					<ModeToggle />
				</div>
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-center dark:text-[#dbcd09] text-[#a8b2bd]">
						QR Code Generator
					</CardTitle>
					<CardDescription />
				</CardHeader>
				<CardContent className="flex-1">
					<div className="h-full flex flex-col md:flex-row gap-8">
						<div className="flex-1 space-y-6">
							<Tabs defaultValue="link" className="w-[400px]" onValueChange={setQrType}>
								<TabsList className="grid h-10 w-full grid-cols-2">
									<TabsTrigger value="link" className="font-bold">
										<Link className="w-4 h-4 mr-2" />
										Link
									</TabsTrigger>
									<TabsTrigger value="email" className="font-bold">
										<Mail className="w-4 h-4 mr-2" />
										Email
									</TabsTrigger>
								</TabsList>
								<TabsContent value="link">
									<div className="space-y-6">
										<div className="space-y-2">
											<Label htmlFor="url" className="font-semibold">
												URL
											</Label>
											<Input
												id="url"
												className="w-full border-2 rounded-md outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
												value={url}
												placeholder="https://example.com"
												onChange={(e) => setUrl(e.target.value)}
											/>
										</div>
									</div>
								</TabsContent>
								<TabsContent value="email">
									<div className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="email" className="font-semibold">
												Email
											</Label>
											<Input
												id="email"
												className="w-full border-2 rounded-md outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
												value={email}
												placeholder="example@example.com"	
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="subject" className="font-semibold">
												Subject
											</Label>
											<Input
												id="subject"
												className="w-full border-2 rounded-md outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
												value={subject}
												placeholder="Subject"
												onChange={(e) => setSubject(e.target.value)}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="message" className="font-semibold">
												Message
											</Label>
											<Textarea
												id="message"
												className="w-full border-2 rounded-md outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
												value={message}
												placeholder="Message"
												onChange={(e) => setMessage(e.target.value)}
											/>
										</div>
										<Button className="w-full" onClick={handleEmailInput}>
												Generate Email QR Code
										</Button>
									</div>
								</TabsContent>
							</Tabs>

							{/* Color Inputs */}
							<div className="space-y-4">
								<div className="flex space-x-4">
									<div className="space-y-2">
										<Label htmlFor="color" className="font-semibold">
											QR Code Color
										</Label>
										<div className="flex items-center gap-1">
											<div
												className="relative w-12 h-12 rounded-md border-2 border-white/70"
												style={{ backgroundColor: color }}
											>
												<Input
													id="color"
													className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
													value={color}
													type="color"
													onChange={(e) => setColor(e.target.value)}
												/>
											</div>
											<Input
												type="text"
												value={color}
												onChange={(e) => setColor(e.target.value)}
												className="flex-1 border-2 bg-transparent h-12 border-white/70"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="bgColor" className="font-semibold">
											Background Color
										</Label>
										<div className="flex items-center gap-1">
											<div
												className="relative w-12 h-12 rounded-md border-2 border-white/70"
												style={{ backgroundColor: bgColor }}
											>
												<Input
													id="bgColor"
													className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
													value={bgColor}
													type="color"
													onChange={(e) => setBgColor(e.target.value)}
												/>
											</div>
											<Input
												type="text"
												value={bgColor}
												onChange={(e) => setBgColor(e.target.value)}
												className="flex-1 border-2 bg-transparent h-12 border-white/70"
											/>
										</div>
									</div>
								</div>

								{/* Logo Input */}
								<div className="space-y-2">
									<Label htmlFor="logo" className="font-semibold">
										Logo
									</Label>
									<Input
										id="logo"
										type="file"
										className="w-full border-2 rounded-md outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
										accept="image/*"
										onChange={handleFileChange}
									/>
								</div>
							</div>
						</div>

						{/* QR Code Preview */}
						<div className="relative flex-1 bg-[#e5e5e6] rounded-lg flex flex-col justify-center space-y-6 h-[600px]">
							<LayoutGrid className="w-8 h-8 absolute top-4 right-4 ring-4 text-black" />
							<div id="qr-code" className="flex justify-center">
								<QRCodeSVG
									value={url || "https://example.com"}
									size={256}
									fgColor={color}
									bgColor={bgColor}
									imageSettings={
										logo ? { src: logo, height: 50, width: 50, excavate: true } : undefined
									}
								/>
							</div>

							<div className="flex justify-center space-x-4">
								<Button variant={"outline"} onClick={() => handleDownload("png")}>
									<DownloadIcon className="w-4 h-4 mr-2" />
									Download PNG
								</Button>
								<Button variant={"outline"} onClick={() => handleDownload("svg")}>
									<DownloadIcon className="w-4 h-4 mr-2" />
									Download SVG
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default QrCodeGenerator;
