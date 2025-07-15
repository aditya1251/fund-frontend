"use client";

import Image from "next/image";
import vector from "../../public/assets/vector.png"

import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/Slider";

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenure, setTenure] = useState(3); // Default tenure in years (e.g., 3 years)
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate EMI
  useEffect(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12; // Convert years to months for EMI calculation

    if (monthlyRate === 0) {
      setMonthlyEMI(principal / months);
      setTotalAmount(principal);
    } else {
      const emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      setMonthlyEMI(emi);
      setTotalAmount(emi * months);
    }
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("₹", "₹ ");
  };

  const progressPercentage = ((monthlyEMI * (tenure * 12)) / totalAmount) * 100; // Corrected calculation for progress bar using total months

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fffaed" }}>
      {/* Header Section */}
      <div className="text-center pt-12 pb-8">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          EMI CALCULATOR
        </h1>{" "}
        {/* Larger, bolder heading */}
        <p className="text-gray-700 max-w-md mx-auto text-lg leading-relaxed">
          Connecting individuals and businesses to verified and impactful
          government support programs.
        </p>{" "}
        {/* Slightly darker, larger text */}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-12">
          {" "}
          {/* Increased gap */}
          {/* Left Content */}
          <div>
            <p className="text-md text-gray-600 mb-3 font-medium">
              Check EMI Easily In Seconds
            </p>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              PLAN YOUR REPAYMENTS
              <br />
              EASILY IN SECONDS
            </h2>{" "}
            {/* Darker heading */}
            <p className="text-gray-700 text-xl leading-relaxed">
              Quickly calculate your monthly EMI by entering the loan amount,
              interest rate, and tenure. Plan your repayments with clarity and
              confidence.
            </p>{" "}
            {/* Larger, darker text */}
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center">
            <div className="relative">
              <Image
                src={vector}
                alt="Financial planning illustration"
                className="w-full max-w-lg h-auto"
              />{" "}
              {/* Slightly larger max-width for image */}
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <Card className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100 pt-10">
          {" "}
          {/* More pronounced shadow and subtle border */}
          <CardContent className="p-10">
            {" "}
            {/* Increased padding */}
            <div className="grid lg:grid-cols-2 gap-16">
              {" "}
              {/* Increased gap */}
              {/* Input Section */}
              <div className="space-y-10">
                {" "}
                {/* Increased vertical spacing */}
                {/* Loan Type */}
                <div>
                  <Label className="text-sm text-gray-700 mb-2 block font-semibold">
                    Select Your Loan Type
                  </Label>{" "}
                  {/* Darker, bolder label */}
                  <Select defaultValue="personal" className="text-black">
                    <SelectTrigger className="w-full h-14 border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                      {" "}
                      {/* Taller, rounded, focus style */}
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal Loan</SelectItem>
                      <SelectItem value="home">Home Loan</SelectItem>
                      <SelectItem value="car">Car Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Loan Amount */}
                <div>
                  <Label className="text-sm text-gray-700 mb-2 block font-semibold">
                    Loan Amount
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                      ₹
                    </span>{" "}
                    {/* Currency symbol inside input */}
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="h-14 border-gray-300 text-gray-800 text-lg pl-8 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />{" "}
                    {/* Taller, rounded, focus style, padding for symbol */}
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>₹1 Lakh</span>
                    <span>₹10 Crore</span>
                  </div>{" "}
                  {/* More explicit labels */}
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm text-gray-700 font-semibold">
                      Rate Of Interest (P.A.)
                    </Label>
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="text-black border-1"
                      step="0.1"
                    />{" "}
                    {/* Slightly larger input */}
                  </div>
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value: number[]) =>
                      setInterestRate(value[0])
                    }
                    max={20}
                    min={5}
                    step={0.1}
                    className="w-full [&>span:first-child]:bg-yellow-400 [&>span:first-child]:shadow-none [&>span:first-child]:rounded-full [&>span:first-child]:w-4 [&>span:first-child]:h-4 [&>span:first-child]:-mt-1.5"
                  />{" "}
                  {/* Custom slider track and thumb styles if possible */}
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>5%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm text-gray-700 font-semibold">
                      Tenure (Years)
                    </Label>{" "}
                    {/* Clarified label to Years */}
                    <Input
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-24 h-10 text-center border-gray-300 rounded-md text-base focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  <Slider
                    value={[tenure]}
                    onValueChange={(value: number[]) => setTenure(value[0])}
                    max={20} // Maximum tenure set to 20 years
                    min={1} // Minimum tenure set to 1 year
                    step={1}
                    className="w-full [&>span:first-child]:bg-yellow-400 [&>span:first-child]:shadow-none [&>span:first-child]:rounded-full [&>span:first-child]:w-4 [&>span:first-child]:h-4 [&>span:first-child]:-mt-1.5"
                  />{" "}
                  {/* Custom slider track and thumb styles if possible */}
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>1 Year</span>
                    <span>20 Years</span>
                  </div>{" "}
                  {/* Clarified labels for years */}
                </div>
              </div>

              {/* Results Section */}
              <div className="flex flex-col items-center justify-center">
                {/* Circular Progress */}
                <div className="relative w-64 h-64 mb-10">
                  {" "}
                  {/* Larger circle */}
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e2e2e2"
                      strokeWidth="8"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#facc15"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${progressPercentage * 2.51} 251.2`}
                      strokeLinecap="round"
                    />{" "}
                    {/* Slightly richer yellow */}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <p className="text-lg text-gray-600 mb-1">
                      Your Monthly EMI
                    </p>
                    <p className="text-4xl font-extrabold text-gray-900 leading-tight">
                      {formatCurrency(monthlyEMI)}
                    </p>{" "}
                    {/* Larger, bolder EMI */}
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-6 w-full max-w-xs">
                  {" "}
                  {/* Increased spacing */}
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: "#facc15" }}
                      ></div>{" "}
                      {/* Larger color indicator */}
                      <span className="text-base text-gray-700 font-medium">
                        Loan Amount
                      </span>{" "}
                      {/* Clarified label */}
                    </div>
                    <span className="font-bold text-gray-800 text-lg">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: "#a78bfa" }}
                      ></div>{" "}
                      {/* New color for total interest */}
                      <span className="text-base text-gray-700 font-medium">
                        Total Interest Payable
                      </span>
                    </div>
                    <span className="font-bold text-gray-800 text-lg">
                      {formatCurrency(totalAmount - loanAmount)}
                    </span>{" "}
                    {/* Added Total Interest Payable */}
                  </div>

                  <div className="border-t pt-6 border-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900 text-wrap">
                        Total Amount Payable
                      </span>{" "}
                      {/* Emphasized Total Amount */}
                      <span className="text-xl font-extrabold text-gray-900 ">
                        {formatCurrency(totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}