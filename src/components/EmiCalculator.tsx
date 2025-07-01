"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
// import { Slider } from "@/components/ui/slider"
import { Slider } from "./ui/Slider"

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000)
  const [interestRate, setInterestRate] = useState(10)
  const [tenure, setTenure] = useState(40)
  const [monthlyEMI, setMonthlyEMI] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  // Calculate EMI
  useEffect(() => {
    const principal = loanAmount
    const monthlyRate = interestRate / 12 / 100
    const months = tenure

    if (monthlyRate === 0) {
      setMonthlyEMI(principal / months)
      setTotalAmount(principal)
    } else {
      const emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
      setMonthlyEMI(emi)
      setTotalAmount(emi * months)
    }
  }, [loanAmount, interestRate, tenure])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("₹", "₹ ")
  }

  const progressPercentage = ((monthlyEMI * tenure) / loanAmount) * 100

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fffaed" }}>
      {/* Header Section */}
      <div className="text-center pt-12 pb-8">
        <h1 className="text-4xl font-bold text-black mb-4">EMI CALCULATOR</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Connecting Individuals And Businesses To Verified And Impactful Government Support Programs.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left Content */}
          <div>
            <p className="text-sm text-gray-600 mb-4">Check EMI Easily In Seconds</p>
            <h2 className="text-4xl font-bold text-black mb-6 leading-tight">
              PLAN YOUR REPAYMENTS
              <br />
              EASILY IN SECONDS
            </h2>
            <p className="text-gray-600 text-lg">
              Quickly Calculate Your Monthly Emi By Entering The Loan Amount, Interest Rate, And Tenure. Plan Your
              Repayments With Clarity And Confidence.
            </p>
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="/fundsraize-illustration.png"
                alt="Financial planning illustration"
                className="w-full max-w-md h-auto"
              />
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <Card className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Input Section */}
              <div className="space-y-8">
                {/* Loan Type */}
                <div>
                  <Label className="text-sm text-gray-600 mb-2 block">Select Your Loan Type</Label>
                  <Select defaultValue="personal">
                    <SelectTrigger className="w-full h-12 border-gray-300">
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
                  <Label className="text-sm text-gray-600 mb-2 block">Loan Amount</Label>
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="h-12 border-gray-300"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹1L</span>
                    <span>₹10Cr</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm text-gray-600">Rate Of Interest (P.A.)</Label>
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-20 h-8 text-center border-gray-300"
                      step="0.1"
                    />
                  </div>
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value: number[]) => setInterestRate(value[0])}
                    max={20}
                    min={5}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm text-gray-600">Tenure Months</Label>
                    <Input
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-20 h-8 text-center border-gray-300"
                    />
                  </div>
                  <Slider
                    value={[tenure]}
                    onValueChange={(value: number[]) => setTenure(value[0])}
                    max={60}
                    min={12}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>12</span>
                    <span>60</span>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="flex flex-col items-center justify-center">
                {/* Circular Progress */}
                <div className="relative w-48 h-48 mb-8">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle cx="50" cy="50" r="40" stroke="#e2e2e2" strokeWidth="8" fill="none" />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#ffd500"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${progressPercentage * 2.51} 251.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-sm text-gray-600">Total Amount Payable</p>
                    <p className="text-2xl font-bold text-black">{formatCurrency(totalAmount)}</p>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-4 w-full max-w-xs">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ffd500" }}></div>
                      <span className="text-sm text-gray-600">Principle Amount</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(loanAmount)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <span className="font-semibold">{formatCurrency(totalAmount)}</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Monthly EMI</span>
                      <span className="text-xl font-bold">{formatCurrency(monthlyEMI)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
