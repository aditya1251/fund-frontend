"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IndianRupee, Percent, Timer } from "lucide-react"

function formatINR(n: number) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: 0 })
}

export default function EMICalculator() {
  const [principal, setPrincipal] = useState<number | "">(500000)
  const [annualRate, setAnnualRate] = useState<number | "">(12)
  const [tenure, setTenure] = useState<number | "">(36)
  const [unit, setUnit] = useState<"months" | "years">("months")

  const p = typeof principal === "number" ? principal : Number(principal) || 0
  const rAnnual = typeof annualRate === "number" ? annualRate : Number(annualRate) || 0
  const t = typeof tenure === "number" ? tenure : Number(tenure) || 0
  const n = unit === "months" ? t : t * 12
  const r = rAnnual > 0 ? rAnnual / 12 / 100 : 0

  const result = useMemo(() => {
    if (p <= 0 || n <= 0) return null
    // EMI formula handling zero interest
    const emi = r === 0 ? Math.round(p / n) : Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
    const total = emi * n
    const interest = total - p
    return { emi, total, interest }
  }, [p, r, n])

  return (
    <Card className="border-[#FFF0C3]">
      <CardHeader>
        <CardTitle className="text-[#1E1E1E]">MSME EMI Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="principal" className="mb-1 block text-sm font-medium text-[#1E1E1E]">
              Loan Amount (₹)
            </label>
            <div className="relative">
              <IndianRupee className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1E1E1E] opacity-60" />
              <input
                id="principal"
                type="number"
                inputMode="numeric"
                min={0}
                className="w-full rounded-md border border-[#E5E5E5] bg-white pl-9 pr-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
                placeholder="e.g., 500000"
                value={principal === "" ? "" : principal}
                onChange={(e) => {
                  const v = e.target.value
                  if (v === "") setPrincipal("")
                  else setPrincipal(Math.max(0, Math.floor(Number(v) || 0)))
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="rate" className="mb-1 block text-sm font-medium text-[#1E1E1E]">
              Interest Rate (% p.a.)
            </label>
            <div className="relative">
              <Percent className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1E1E1E] opacity-60" />
              <input
                id="rate"
                type="number"
                inputMode="decimal"
                step="0.1"
                min={0}
                className="w-full rounded-md border border-[#E5E5E5] bg-white pl-9 pr-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
                value={annualRate === "" ? "" : annualRate}
                onChange={(e) => {
                  const v = e.target.value
                  if (v === "") setAnnualRate("")
                  else setAnnualRate(Math.max(0, Number(v) || 0))
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="tenure" className="mb-1 block text-sm font-medium text-[#1E1E1E]">
              Tenure
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Timer className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1E1E1E] opacity-60" />
                <input
                  id="tenure"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  className="w-full rounded-md border border-[#E5E5E5] bg-white pl-9 pr-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
                  value={tenure === "" ? "" : tenure}
                  onChange={(e) => {
                    const v = e.target.value
                    if (v === "") setTenure("")
                    else setTenure(Math.max(1, Math.floor(Number(v) || 0)))
                  }}
                />
              </div>
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant={unit === "months" ? "default" : "outline"}
                  className={
                    unit === "months"
                      ? "bg-[#F7C430] text-[#1E1E1E] hover:bg-[#E6B429]"
                      : "border-[#F7C430] text-[#1E1E1E] bg-transparent hover:bg-[#FFF0C3]"
                  }
                  onClick={() => setUnit("months")}
                >
                  Months
                </Button>
                <Button
                  type="button"
                  variant={unit === "years" ? "default" : "outline"}
                  className={
                    unit === "years"
                      ? "bg-[#F7C430] text-[#1E1E1E] hover:bg-[#E6B429]"
                      : "border-[#F7C430] text-[#1E1E1E] bg-transparent hover:bg-[#FFF0C3]"
                  }
                  onClick={() => setUnit("years")}
                >
                  Years
                </Button>
              </div>
            </div>
          </div>
        </div>

        {result ? (
          <div className="rounded-lg border border-[#FFF0C3] bg-[#FFFBEC] p-4">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="bg-[#1E1E1E] text-white">EMI</Badge>
              <Badge className="bg-[#F7C430] text-[#1E1E1E]">₹{formatINR(result.emi)}</Badge>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs text-[#1E1E1E] opacity-70">Total Interest</p>
                <p className="text-lg font-semibold text-[#1E1E1E]">₹{formatINR(result.interest)}</p>
              </div>
              <div>
                <p className="text-xs text-[#1E1E1E] opacity-70">Total Payment</p>
                <p className="text-lg font-semibold text-[#1E1E1E]">₹{formatINR(result.total)}</p>
              </div>
              <div>
                <p className="text-xs text-[#1E1E1E] opacity-70">Tenure</p>
                <p className="text-lg font-semibold text-[#1E1E1E]">
                  {n} {n === 1 ? "month" : "months"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-[#E5E5E5] p-4 text-sm text-[#1E1E1E] opacity-70">
            Enter loan amount, interest rate, and tenure to calculate your EMI.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
