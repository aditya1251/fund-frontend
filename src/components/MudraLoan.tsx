"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

export default function MudraEstimator() {
  const [amount, setAmount] = useState<number | "">("")
  const parsed = typeof amount === "number" ? amount : Number(amount) || 0

  const result = useMemo(() => {
    if (!parsed || parsed <= 0) return null
    if (parsed <= 50000) {
      return {
        category: "Shishu",
        range: "Up to ₹50,000",
        note: "Ideal for very early-stage businesses just getting started.",
        color: "bg-green-100 text-green-700",
      }
    }
    if (parsed <= 500000) {
      return {
        category: "Kishore",
        range: "₹50,001 to ₹5,00,000",
        note: "Suitable for growing businesses expanding operations.",
        color: "bg-blue-100 text-blue-700",
      }
    }
    if (parsed <= 1000000) {
      return {
        category: "Tarun",
        range: "₹5,00,001 to ₹10,00,000",
        note: "Best for established businesses ready for bigger growth.",
        color: "bg-purple-100 text-purple-700",
      }
    }
    return {
      category: "Above MUDRA",
      range: "Over ₹10,00,000",
      note: "Requested amount exceeds MUDRA limits. Consider other SME loan options.",
      color: "bg-red-100 text-red-700",
    }
  }, [parsed])

  function formatINR(n: number) {
    return n.toLocaleString("en-IN")
  }

  return (
    <Card className="border-[#FFF0C3]">
      <CardHeader>
        <CardTitle className="text-[#1E1E1E]">MUDRA Category Estimator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <label className="block text-sm font-medium text-[#1E1E1E]" htmlFor="loan-amount">
          Desired Loan Amount (₹)
        </label>
        <input
          id="loan-amount"
          type="number"
          inputMode="numeric"
          min={0}
          placeholder="e.g., 250000"
          className="w-full rounded-md border border-[#E5E5E5] bg-white px-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
          value={amount === "" ? "" : amount}
          onChange={(e) => {
            const v = e.target.value
            if (v === "") setAmount("")
            else setAmount(Math.max(0, Math.floor(Number(v) || 0)))
          }}
          aria-describedby="loan-amount-help"
        />
        <p id="loan-amount-help" className="text-xs text-[#1E1E1E] opacity-70">
          Enter the approximate amount you need. This tool suggests a category based on MUDRA limits.
        </p>

        {result ? (
          <div className="rounded-lg border border-[#FFF0C3] bg-[#FFFBEC] p-4">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge className="bg-[#1E1E1E] text-white">{result.category}</Badge>
              <Badge className="bg-[#F7C430] text-[#1E1E1E]">{result.range}</Badge>
              <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${result.color}`}>
                Suggested
              </span>
            </div>
            <p className="text-sm text-[#1E1E1E]">{result.note}</p>
            {parsed > 0 && parsed <= 1000000 && (
              <p className="mt-2 text-xs text-[#1E1E1E] opacity-70">
                You entered ₹{formatINR(parsed)}. The suggested category is based solely on loan amount ranges.
              </p>
            )}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-[#E5E5E5] p-4 text-sm text-[#1E1E1E] opacity-70">
            Enter an amount to see the suggested MUDRA category.
          </div>
        )}

        <div className="flex items-start gap-2 rounded-md bg-[#FFF7D6] p-3">
          <Info className="mt-0.5 h-4 w-4 text-[#1E1E1E]" aria-hidden="true" />
          <p className="text-xs text-[#1E1E1E]">
            Guidance only. Actual eligibility depends on lender assessment and MUDRA guidelines.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="bg-[#F7C430] text-[#1E1E1E] hover:bg-[#E6B429]">Check Eligibility</Button>
          <Button variant="outline" className="border-[#F7C430] text-[#1E1E1E] hover:bg-[#FFF0C3] bg-transparent">
            Talk to Expert
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
