"use client";

import { useState } from "react";
import LabeledSliderInput from "@/components/crm/labeledSlider";

const EmiCalculator = () => {
	const [loanAmount, setLoanAmount] = useState(10000000);
	const [interestRate, setInterestRate] = useState(10);
	const [tenure, setTenure] = useState(60);

	const monthlyRate = interestRate / (12 * 100);
	const emi =
		(loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
		(Math.pow(1 + monthlyRate, tenure) - 1);
	const totalPayment = emi * tenure;
	const totalInterest = totalPayment - loanAmount;

	return (
		<div className="mb-6">
			<h4 className="text-xl font-bold text-black mb-6">EMI Calculator</h4>
			<div className="bg-white bg-[url('/emi-bg.svg')] bg-center bg-contain bg-no-repeat rounded-xl shadow-md p-6 w-full">
				<div className="grid grid-cols-10 gap-4 items-center">
					<div className="space-y-2 col-span-4">
						<div>
							<label className="text-sm text-[#404040] block mb-1">
								Select Your Loan Type
							</label>
							<select className="w-full px-3 py-2 border border-[#717171] rounded text-sm text-[#404040] focus:outline-none">
								<option>Personal Loan</option>
								<option>Home Loan</option>
								<option>Car Loan</option>
							</select>
						</div>

						<LabeledSliderInput
							label="Loan Amount"
							value={loanAmount}
							min={100000}
							max={10000000}
							step={10000}
							unit=""
							minLabel="₹1L"
							maxLabel="₹1Cr"
							onChange={setLoanAmount}
						/>

						<LabeledSliderInput
							label="Rate Of Interest (P.A.)"
							value={interestRate}
							min={5}
							max={20}
							step={0.5}
							unit="%"
							minLabel="5%"
							maxLabel="20%"
							onChange={setInterestRate}
						/>

						<LabeledSliderInput
							label="Tenure Months"
							value={tenure}
							min={12}
							max={60}
							unit=""
							minLabel="12"
							maxLabel="60"
							onChange={setTenure}
						/>
					</div>

					{/* Right: Donut Chart + Results */}
					<div className="px-8 py-6 rounded-lg h-full col-span-6 flex items-center justify-evenly">
						<div className="flex items-center justify-center relative w-52 h-52 mb-4">
							{/* Outer Circle */}
							<div className="w-full h-full rounded-full border-[12px] border-[#ffd500] border-b-[#e2e2e2] border-l-[#e2e2e2]" />
							{/* Inner Circle */}
							<div className="absolute inset-6 rounded-full flex flex-col items-center justify-center text-center">
								<p className="text-xs text-gray-500 mb-1">
									Total Amount Payable
								</p>
								<p className="text-xl font-bold text-black">
									₹ {Math.round(totalPayment).toLocaleString("en-IN")}
								</p>
							</div>
						</div>

						{/* Details */}
						<div className="flex flex-col items-center justify-end gap-12">
							<div className="space-y-4 text-sm text-black font-medium">
								<div className="flex flex-col justify-between gap-0.5">
									<span className="before:content-[''] before:absolute before:-left-1 before:w-4 before:h-4 before:bg-[#ffd500] before:rounded-full relative px-4 text-xs">
										Principal Amount
									</span>
									<span>₹ {loanAmount.toLocaleString("en-IN")}</span>
								</div>
								<div className="flex flex-col justify-between gap-0.5">
									<span className="before:content-[''] before:absolute before:-left-1 before:w-4 before:h-4 before:bg-[#e2e2e2] before:rounded-full relative px-4 text-xs">
										Total Amount
									</span>
									<span>
										₹ {Math.round(totalPayment).toLocaleString("en-IN")}
									</span>
								</div>
							</div>
							<div className="flex justify-between gap-2 py-1 px-6 border-y-1 border-[#a4a4a4] text-base font-semibold text-black">
								<span>Monthly EMI</span>
								<span>₹ {Math.round(emi).toLocaleString("en-IN")}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmiCalculator;
