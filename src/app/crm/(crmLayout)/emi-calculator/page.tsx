"use client";

import { useState } from "react";
// Assuming LabeledSliderInput is a separate component and handles its internal responsiveness
import LabeledSliderInput from "@/components/crm/labeledSlider"; 
// Assuming Loading is a separate component
import Loading from "@/components/Loading"; 

const EmiCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(10000000);
    const [interestRate, setInterestRate] = useState(10);
    const [tenure, setTenure] = useState(60); // In months
    const [loanType, setLoanType] = useState("Personal Loan"); // State for loan type

    // EMI Calculation
    const monthlyRate = interestRate / (12 * 100);
    const emi =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - loanAmount;

    return (
        <div className="mb-6">
            <h4 className="text-xl font-bold text-black mb-6">EMI Calculator</h4>
            {/* Main Calculator Card: Responsive padding, background, and grid layout */}
            <div className="bg-white bg-[url('/emi-bg.svg')] bg-center bg-contain bg-no-repeat rounded-xl shadow-md p-4 sm:p-6 w-full">
                {/* Responsive Grid: 1 column on mobile, 2 columns on medium (md), 10 columns on large (lg) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 items-center">
                    {/* Left Section (Inputs): Takes full width on mobile, half on md, 4/10 on lg */}
                    <div className="space-y-4 col-span-full md:col-span-1 lg:col-span-4"> {/* Increased space-y to 4 for better spacing */}
                        <div>
                            <label className="text-sm text-[#404040] block mb-1">
                                Select Your Loan Type
                            </label>
                            <select 
                                value={loanType} 
                                onChange={(e) => setLoanType(e.target.value)}
                                className="w-full px-3 py-2 border border-[#717171] rounded text-sm text-[#404040] focus:outline-none"
                            >
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

                    {/* Right Section (Donut Chart + Results): Takes full width on mobile, half on md, 6/10 on lg */}
                    {/* Responsive padding and flexible alignment */}
                    <div className="col-span-full md:col-span-1 lg:col-span-6 px-4 py-4 md:px-8 md:py-6 rounded-lg h-full flex flex-col md:flex-row items-center justify-evenly">
                        {/* Donut Chart Container: Responsive sizing */}
                        <div className="flex items-center justify-center relative w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 mb-4 md:mb-0 md:mr-4 flex-shrink-0">
                            {/* Outer Circle */}
                            <div className="w-full h-full rounded-full border-[12px] border-[#ffd500] border-b-[#e2e2e2] border-l-[#e2e2e2]" />
                            {/* Inner Circle: Responsive inset */}
                            <div className="absolute inset-4 sm:inset-5 lg:inset-6 rounded-full flex flex-col items-center justify-center text-center">
                                <p className="text-xs text-gray-500 mb-1">
                                    Total Amount Payable
                                </p>
                                <p className="text-xl font-bold text-black">
                                    ₹ {Math.round(totalPayment).toLocaleString("en-IN")}
                                </p>
                            </div>
                        </div>

                        {/* Details: Responsive gap and alignment */}
                        <div className="flex flex-col items-start md:items-center justify-end gap-6 sm:gap-8 lg:gap-12 mt-4 md:mt-0 w-full md:w-auto">
                            <div className="space-y-4 text-sm text-black font-medium w-full"> {/* Added w-full */}
                                <div className="flex flex-col justify-between gap-0.5">
                                    <span className="before:content-[''] before:absolute before:-left-1 before:w-4 before:h-4 before:bg-[#ffd500] before:rounded-full relative pl-6 text-xs sm:text-sm"> {/* Increased left padding for icon */}
                                        Principal Amount
                                    </span>
                                    <span className="text-sm sm:text-base font-semibold">₹ {loanAmount.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex flex-col justify-between gap-0.5">
                                    <span className="before:content-[''] before:absolute before:-left-1 before:w-4 before:h-4 before:bg-[#e2e2e2] before:rounded-full relative pl-6 text-xs sm:text-sm"> {/* Increased left padding for icon */}
                                        Total Interest
                                    </span>
                                    <span className="text-sm sm:text-base font-semibold">
                                        ₹ {Math.round(totalInterest).toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between w-full py-1 px-4 sm:px-6 border-y border-[#a4a4a4] text-base font-semibold text-black"> {/* Changed gap-2 to w-full, added flex-col sm:flex-row for responsiveness */}
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