"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Info, IndianRupee, Percent } from "lucide-react"

type Category = "general" | "special"
type Area = "urban" | "rural"

function formatINR(n: number) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: 0 })
}

export default function PMEGPSubsidyCalculator() {
  const [projectCost, setProjectCost] = useState<number | "">("")
  const [category, setCategory] = useState<Category>("general")
  const [area, setArea] = useState<Area>("urban")
  const [promoterPct, setPromoterPct] = useState<number | "">()

  const parsedCost = typeof projectCost === "number" ? projectCost : Number(projectCost) || 0
  const parsedPct = typeof promoterPct === "number" ? promoterPct : Number(promoterPct) || 0

  const subsidyRate = useMemo(() => {
    if (category === "general" && area === "urban") return 0.15
    if (category === "general" && area === "rural") return 0.25
    if (category === "special" && area === "urban") return 0.25
    return 0.35 // special + rural
  }, [category, area])

  const results = useMemo(() => {
    if (parsedCost <= 0) return null
    const subsidy = Math.round(parsedCost * subsidyRate)
    const promoter = Math.round(parsedCost * (parsedPct / 100))
    const bankLoan = Math.max(0, parsedCost - subsidy - promoter)
    return { subsidy, promoter, bankLoan }
  }, [parsedCost, subsidyRate, parsedPct])

  return (
    <Card className="border-[#FFF0C3]">
      <CardHeader>
        <CardTitle className="text-[#1E1E1E]">PMEGP Subsidy Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="project-cost" className="mb-1 block text-sm font-medium text-[#1E1E1E]">
              Project Cost (₹)
            </label>
            <div className="relative">
              <IndianRupee className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1E1E1E] opacity-60" />
              <input
                id="project-cost"
                type="number"
                inputMode="numeric"
                min={0}
                className="w-full rounded-md border border-[#E5E5E5] bg-white pl-9 pr-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
                placeholder="e.g., 400000"
                value={projectCost === "" ? "" : projectCost}
                onChange={(e) => {
                  const v = e.target.value
                  if (v === "") setProjectCost("")
                  else setProjectCost(Math.max(0, Math.floor(Number(v) || 0)))
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="mb-1 block text-sm font-medium text-[#1E1E1E]">
              Applicant Category
            </label>
            <select
              id="category"
              className="w-full rounded-md border border-[#E5E5E5] bg-white px-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              <option value="general">General</option>
              <option value="special">Special (SC/ST/OBC/Minorities/Women/Ex-Servicemen)</option>
            </select>
          </div>

          <div>
            <label htmlFor="area" className="mb-1 block text-sm font-medium text-[#1E1E1E]">
              Business Area
            </label>
            <select
              id="area"
              className="w-full rounded-md border border-[#E5E5E5] bg-white px-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
              value={area}
              onChange={(e) => setArea(e.target.value as Area)}
            >
              <option value="urban">Urban</option>
              <option value="rural">Rural</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="promoter" className="mb-1 block text-sm font-medium text-[#1E1E1E]">
              Promoter Contribution (%)
            </label>
            <div className="relative">
              <Percent className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1E1E1E] opacity-60" />
              <input
                id="promoter"
                type="number"
                inputMode="numeric"
                min={0}
                max={100}
                className="w-full rounded-md border border-[#E5E5E5] bg-white pl-9 pr-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
                value={promoterPct === "" ? "" : promoterPct}
                onChange={(e) => {
                  const v = e.target.value
                  if (v === "") setPromoterPct("")
                  else setPromoterPct(Math.min(100, Math.max(0, Math.floor(Number(v) || 0))))
                }}
              />
            </div>
            <p className="mt-1 text-xs text-[#1E1E1E] opacity-70">Typical range is 5%-10%.</p>
          </div>

          <div className="flex items-end">
            <Button
              type="button"
              onClick={() => {
                setProjectCost("")
                setCategory("general")
                setArea("urban")
                setPromoterPct(10)
              }}
              className="w-full bg-[#F7C430] text-[#1E1E1E] hover:bg-[#E6B429]"
            >
              Reset
            </Button>
          </div>
        </div>

        {parsedCost > 0 ? (
          <div className="rounded-lg border border-[#FFF0C3] bg-[#FFFBEC] p-4">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="bg-[#1E1E1E] text-white">Subsidy Rate: {(subsidyRate * 100).toFixed(0)}%</Badge>
              <Badge className="bg-[#F7C430] text-[#1E1E1E]">
                Category: {category === "general" ? "General" : "Special"}
              </Badge>
              <Badge className="bg-[#FFF0C3] text-[#1E1E1E]">Area: {area === "urban" ? "Urban" : "Rural"}</Badge>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs text-[#1E1E1E] opacity-70">Estimated Subsidy</p>
                <p className="text-lg font-semibold text-[#1E1E1E]">₹{formatINR(results!.subsidy)}</p>
              </div>
              <div>
                <p className="text-xs text-[#1E1E1E] opacity-70">Promoter Contribution</p>
                <p className="text-lg font-semibold text-[#1E1E1E]">₹{formatINR(results!.promoter)}</p>
              </div>
              <div>
                <p className="text-xs text-[#1E1E1E] opacity-70">Indicative Bank Loan</p>
                <p className="text-lg font-semibold text-[#1E1E1E]">₹{formatINR(results!.bankLoan)}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-[#E5E5E5] p-4 text-sm text-[#1E1E1E] opacity-70">
            Enter your project cost to estimate subsidy and indicative loan.
          </div>
        )}

        <div className="flex items-start gap-2 rounded-md bg-[#FFF7D6] p-3">
          <Info className="mt-0.5 h-4 w-4 text-[#1E1E1E]" aria-hidden="true" />
          <p className="text-xs text-[#1E1E1E]">
            This tool provides estimates based on PMEGP subsidy bands. Actual eligibility and amounts depend on official
            guidelines, sector, and bank appraisal.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
