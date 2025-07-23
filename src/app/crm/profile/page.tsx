"use client";
import React, { useState } from "react";
import { Pencil, Save, X, ChevronRight, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
	const [isEditMode, setIsEditMode] = useState(false);
	const router = useRouter();

	const handleBack = () => {
		router.push("/crm");
	};

	const handleResetPassword = () => {
		router.push("/reset-pass");
	};

	const [formData, setFormData] = useState({
		fullName: "Ruth Mishra",
		email: "example@gmail.com",
		phone: "9370539617",
		age: "18",
		dsaCode: "556845",
		password: "ruthmishra@123",
		accountHolderName: "Ruth Mishra",
		accountNumber: "example@gmail.com",
		ifsc: "9370539617",
		branchName: "18",
		bankName: "556845",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSave = () => {
		setIsEditMode(false);
	};

	const handleCancel = () => {
		setIsEditMode(false);
	};



	return (
		<div className="px-8">
			<div className="w-full py-2 flex items-center gap-4 border-b border-gray-100">
				<div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
					<img
						src="/placeholder.svg"
						alt="User Avatar"
						className="w-full h-full object-cover"
					/>
				</div>
				<div>
					<div className="font-medium text-md text-black">{"user?.name"}</div>
					<div className="text-sm text-gray-500">{"user?.email"}</div>
				</div>
				<div className="ml-auto">
					<button
						onClick={handleBack}
						className="text-sm text-black bg-[#f5d949] rounded-md px-4 py-2 flex items-center gap-2"
					>
						BACK <ChevronRight className="w-4 h-4" />
					</button>
				</div>
			</div>
			<div className="max-w-5xl mx-auto py-8 rounded-md">
				<div className="flex justify-between items-center mb-6">
					<h4 className="text-xl font-semibold text-black">Basic Details</h4>
					<button
						onClick={() => setIsEditMode(true)}
						className="text-[#29a073] flex items-center gap-1"
					>
						<Pencil size={16} />
						Edit
					</button>
				</div>

				{/* Basic Details */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					<InputField
						label="Full Name"
						name="fullName"
						value={formData.fullName}
						editable={isEditMode}
						onChange={handleChange}
					/>
					<InputField
						label="Email"
						name="email"
						value={formData.email}
						editable={isEditMode}
						onChange={handleChange}
					/>
					<InputField
						label="Phone No."
						name="phone"
						value={formData.phone}
						editable={isEditMode}
						onChange={handleChange}
					/>
					<InputField
						label="Age"
						name="age"
						value={formData.age}
						editable={isEditMode}
						onChange={handleChange}
					/>
					<InputField
						label="DSA Code"
						name="dsaCode"
						value={formData.dsaCode}
						editable={isEditMode}
						onChange={handleChange}
					/>
					{isEditMode ? (
						<div className="flex gap-4 mt-6">
							<button
								onClick={handleResetPassword}
								className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700"
							>
								<RefreshCw size={16} />
								Reset Password
							</button>
						</div>
					) : (
						<InputField
							label="Password"
							name="password"
							value="********"
							editable={isEditMode}
							onChange={handleChange}
							type="password"
						/>
					)}
				</div>

				<h4 className="text-xl font-semibold mb-4 text-black">Bank Details</h4>

				{/* Bank Details */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<InputField
						label="Account Holder Name"
						name="accountHolderName"
						value={formData.accountHolderName}
						editable={isEditMode}
						onChange={handleChange}
					/>
					<InputField
						label="Account Number"
						name="accountNumber"
						value={formData.accountNumber}
						editable={isEditMode}
						onChange={handleChange}
					/>
					<InputField
						label="IFSC Code"
						name="ifsc"
						value={formData.ifsc}
						editable={isEditMode}
						onChange={handleChange}
					/>
					<InputField
						label="Branch Name"
						name="branchName"
						value={formData.branchName}
						editable={isEditMode}
						onChange={handleChange}
					/>
					<InputField
						label="Bank Name"
						name="bankName"
						value={formData.bankName}
						editable={isEditMode}
						onChange={handleChange}
					/>

					{isEditMode && (
						<div className="flex gap-4 mt-6">
							<button
								onClick={handleSave}
								className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
							>
								<Save size={16} />
								Save
							</button>
							<button
								onClick={handleCancel}
								className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700"
							>
								<X size={16} />
								Cancel
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

type InputProps = {
	label: string;
	name: string;
	value: string;
	editable: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
};

const InputField = ({
	label,
	name,
	value,
	editable,
	onChange,
	type = "text",
}: InputProps) => (
	<div className="flex flex-col">
		<label className="text-sm text-gray-700 mb-1">{label}</label>
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			readOnly={!editable}
			className={`px-3 py-2 border rounded ${
				editable
					? "border-gray-400 text-gray-400"
					: "border-black bg-gray-100 text-gray-600"
			}`}
		/>
	</div>
);
