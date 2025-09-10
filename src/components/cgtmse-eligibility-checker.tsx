"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Info, Users, IndianRupee, CheckCircle, AlertTriangle } from "lucide-react"

type BusinessType = "manufacturing" | "service" | "trading"
type BusinessStage = "new" | "existing"

function formatINR(n: number) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: 0 })
}

export default function CGTMSEEligibilityChecker() {
  const [loanAmount, setLoanAmount] = useState<number | "">(1000000)
  const [businessType, setBusinessType] = useState<BusinessType>("manufacturing")
  const [businessStage, setBusinessStage] = useState<BusinessStage>("new")
  const [employees, setEmployees] = useState<number | "">(5)
  const [annualTurnover, setAnnualTurnover] = useState<number | "">(2000000)

  const parsed = typeof loanAmount === "number" ? loanAmount : Number(loanAmount) || 0
  const parsedEmployees = typeof employees === "number" ? employees : Number(employees) || 0
  const parsedTurnover = typeof annualTurnover === "number" ? annualTurnover : Number(annualTurnover) || 0

  const eligibility = useMemo(() => {
    if (parsed <= 0) return null

    const maxLoan = 50000000 // ₹5 Crore
    const isAmountEligible = parsed <= maxLoan

    // MSME criteria based on business type
    let employeeLimit = 0
    let turnoverLimit = 0

    if (businessType === "manufacturing") {
      employeeLimit = 50
      turnoverLimit = 250000000 // ₹25 Crore
    } else {
      employeeLimit = 10
      turnoverLimit = 100000000 // ₹10 Crore
    }

    const isEmployeeEligible = parsedEmployees <= employeeLimit
    const isTurnoverEligible = parsedTurnover <= turnoverLimit

    const guaranteeFee = Math.round(parsed * 0.0075) // 0.75% annual guarantee fee
    const processingFee = Math.round(parsed * 0.01) // Estimated 1% processing fee

    return {
      isAmountEligible,
      isEmployeeEligible,
      isTurnoverEligible,
      isFullyEligible: isAmountEligible && isEmployeeEligible && isTurnoverEligible,
      guaranteeFee,
      processingFee,
      employeeLimit,
      turnoverLimit,
      maxLoan,
    }
  }, [parsed, businessType, parsedEmployees, parsedTurnover])

  return (
    <Card className="border-[#FFF0C3]">
      <CardHeader>
        <CardTitle className="text-[#1E1E1E]">CGTMSE Eligibility Checker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="loan-amount" className="mb-1 block text-sm font-medium text-[#1E1E1E]">
              Loan Amount Required (₹)
            </label>
            <div className="relative">
              <IndianRupee className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1E1E1E] opacity-60" />
              <input
                id="loan-amount"
                type="number"
                inputMode="numeric"
                min={0}
                max={50000000}
                className="w-full rounded-md border border-[#E5E5E5] bg-white pl-9 pr-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
                placeholder="e.g., 1000000"
                value={loanAmount === "" ? "" : loanAmount}
                onChange={(e) => {
                  const v = e.target.value
                  if (v === "") setLoanAmount("")
                  else setLoanAmount(Math.max(0, Math.min(50000000, Math.floor(Number(v) || 0))))
                }}
              />
            </div>
            <p className="mt-1 text-xs text-[#1E1E1E] opacity-70">Maximum: ₹5 Crore</p>
          </div>

          <div>
            <label htmlFor="business-type" className="mb-1 block text-sm font-medium text-[#1E1E1E]">
              Business Type
            </label>
            <select
              id="business-type"
              className="w-full rounded-md border border-[#E5E5E5] bg-white px-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value as BusinessType)}
            >
              <option value="manufacturing">Manufacturing</option>
              <option value="service">Service</option>
              <option value="trading">Trading</option>
            </select>
          </div>

          <div>
            <label htmlFor="employees" className="mb-1 block text-sm font-medium text-[#1E1E1E]">
              Number of Employees
            </label>
            <div className="relative">
              <Users className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1E1E1E] opacity-60" />
              <input
                id="employees"
                type="number"
                inputMode="numeric"
                min={0}
                className="w-full rounded-md border border-[#E5E5E5] bg-white pl-9 pr-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
                placeholder="e.g., 5"
                value={employees === "" ? "" : employees}
                onChange={(e) => {
                  const v = e.target.value
                  if (v === "") setEmployees("")
                  else setEmployees(Math.max(0, Math.floor(Number(v) || 0)))
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="turnover" className="mb-1 block text-sm font-medium text-[#1E1E1E]">
              Annual Turnover (₹)
            </label>
            <div className="relative">
              <IndianRupee className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1E1E1E] opacity-60" />
              <input
                id="turnover"
                type="number"
                inputMode="numeric"
                min={0}
                className="w-full rounded-md border border-[#E5E5E5] bg-white pl-9 pr-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
                placeholder="e.g., 2000000"
                value={annualTurnover === "" ? "" : annualTurnover}
                onChange={(e) => {
                  const v = e.target.value
                  if (v === "") setAnnualTurnover("")
                  else setAnnualTurnover(Math.max(0, Math.floor(Number(v) || 0)))
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1E1E1E]">Business Stage</label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={businessStage === "new" ? "default" : "outline"}
              className={
                businessStage === "new"
                  ? "bg-[#F7C430] text-[#1E1E1E] hover:bg-[#E6B429]"
                  : "border-[#F7C430] text-[#1E1E1E] bg-transparent hover:bg-[#FFF0C3]"
              }
              onClick={() => setBusinessStage("new")}
            >
              New Business
            </Button>
            <Button
              type="button"
              variant={businessStage === "existing" ? "default" : "outline"}
              className={
                businessStage === "existing"
                  ? "bg-[#F7C430] text-[#1E1E1E] hover:bg-[#E6B429]"
                  : "border-[#F7C430] text-[#1E1E1E] bg-transparent hover:bg-[#FFF0C3]"
              }
              onClick={() => setBusinessStage("existing")}
            >
              Existing Business
            </Button>
          </div>
        </div>

        {eligibility ? (
          <div className="rounded-lg border border-[#FFF0C3] bg-[#FFFBEC] p-4">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {eligibility.isFullyEligible ? (
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Eligible
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-700">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  Check Requirements
                </Badge>
              )}
              <Badge className="bg-[#F7C430] text-[#1E1E1E]">
                {businessType === "manufacturing"
                  ? "Manufacturing"
                  : businessType === "service"
                    ? "Service"
                    : "Trading"}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  {eligibility.isAmountEligible ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm text-[#1E1E1E]">
                    Amount: ₹{formatINR(parsed)} / ₹{formatINR(eligibility.maxLoan)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {eligibility.isEmployeeEligible ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm text-[#1E1E1E]">
                    Employees: {parsedEmployees} / {eligibility.employeeLimit}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {eligibility.isTurnoverEligible ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm text-[#1E1E1E]">
                    Turnover: ₹{formatINR(parsedTurnover)} / ₹{formatINR(eligibility.turnoverLimit)}
                  </span>
                </div>
              </div>

              {eligibility.isFullyEligible && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 border-t border-[#FFF0C3] pt-3">
                  <div>
                    <p className="text-xs text-[#1E1E1E] opacity-70">Annual Guarantee Fee (0.75%)</p>
                    <p className="text-sm font-semibold text-[#1E1E1E]">₹{formatINR(eligibility.guaranteeFee)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#1E1E1E] opacity-70">Est. Processing Fee (1%)</p>
                    <p className="text-sm font-semibold text-[#1E1E1E]">₹{formatINR(eligibility.processingFee)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-[#E5E5E5] p-4 text-sm text-[#1E1E1E] opacity-70">
            Enter your loan amount to check CGTMSE eligibility.
          </div>
        )}

        <div className="flex items-start gap-2 rounded-md bg-[#FFF7D6] p-3">
          <Info className="mt-0.5 h-4 w-4 text-[#1E1E1E]" aria-hidden="true" />
          <p className="text-xs text-[#1E1E1E]">
            This is an indicative eligibility check. Final approval depends on bank assessment, business viability, and
            CGTMSE guidelines.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="bg-[#F7C430] text-[#1E1E1E] hover:bg-[#E6B429]">Apply for CGTMSE Loan</Button>
          <Button variant="outline" className="border-[#F7C430] text-[#1E1E1E] hover:bg-[#FFF0C3] bg-transparent">
            Talk to Expert
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
