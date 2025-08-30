"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  AlertTriangle,
  Percent,
  IndianRupee,
  Scale,
  Gauge,
} from "lucide-react";

function formatINR(n: number) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

type Classification = {
  label: string;
  color: string;
  tone: "good" | "warn" | "bad";
};

function classifyCurrentRatio(r: number): Classification {
  if (!isFinite(r))
    return { label: "N/A", color: "bg-gray-100 text-gray-700", tone: "warn" };
  if (r < 1)
    return {
      label: "Low (Liquidity Risk)",
      color: "bg-red-100 text-red-700",
      tone: "bad",
    };
  if (r <= 2)
    return {
      label: "Healthy",
      color: "bg-green-100 text-green-700",
      tone: "good",
    };
  return {
    label: "High (Excess WC?)",
    color: "bg-amber-100 text-amber-700",
    tone: "warn",
  };
}

function classifyQuickRatio(r: number): Classification {
  if (!isFinite(r))
    return { label: "N/A", color: "bg-gray-100 text-gray-700", tone: "warn" };
  if (r < 1)
    return { label: "Low", color: "bg-red-100 text-red-700", tone: "bad" };
  return {
    label: "Comfortable",
    color: "bg-green-100 text-green-700",
    tone: "good",
  };
}

function classifyDebtToEquity(r: number): Classification {
  if (!isFinite(r))
    return { label: "N/A", color: "bg-gray-100 text-gray-700", tone: "warn" };
  if (r < 1)
    return {
      label: "Low Leverage",
      color: "bg-green-100 text-green-700",
      tone: "good",
    };
  if (r <= 2)
    return {
      label: "Moderate",
      color: "bg-amber-100 text-amber-700",
      tone: "warn",
    };
  return {
    label: "High Leverage",
    color: "bg-red-100 text-red-700",
    tone: "bad",
  };
}

export default function FinanceRatioAnalyzer() {
  const [currentAssets, setCurrentAssets] = useState<number | "">("");
  const [inventory, setInventory] = useState<number | "">("");
  const [nonCurrentAssets, setNonCurrentAssets] = useState<number | "">("");
  const [currentLiabilities, setCurrentLiabilities] = useState<number | "">("");
  const [nonCurrentLiabilities, setNonCurrentLiabilities] = useState<
    number | ""
  >("");
  const [equityInput, setEquityInput] = useState<number | "">("");

  const ca =
    typeof currentAssets === "number"
      ? currentAssets
      : Number(currentAssets) || 0;
  const inv =
    typeof inventory === "number" ? inventory : Number(inventory) || 0;
  const nca =
    typeof nonCurrentAssets === "number"
      ? nonCurrentAssets
      : Number(nonCurrentAssets) || 0;
  const cl =
    typeof currentLiabilities === "number"
      ? currentLiabilities
      : Number(currentLiabilities) || 0;
  const ncl =
    typeof nonCurrentLiabilities === "number"
      ? nonCurrentLiabilities
      : Number(nonCurrentLiabilities) || 0;
  const eqInput =
    typeof equityInput === "number" ? equityInput : Number(equityInput) || 0;

  const totals = useMemo(() => {
    const assets = ca + nca;
    const liabilities = cl + ncl;
    const computedEquity = assets - liabilities;
    return { assets, liabilities, computedEquity };
  }, [ca, nca, cl, ncl]);

  const ratios = useMemo(() => {
    const currentRatio = cl > 0 ? ca / cl : Number.POSITIVE_INFINITY;
    const quickRatio =
      cl > 0 ? Math.max(0, ca - inv) / cl : Number.POSITIVE_INFINITY;
    const equityBase = eqInput > 0 ? eqInput : totals.computedEquity;
    const dToE =
      equityBase > 0 ? (cl + ncl) / equityBase : Number.POSITIVE_INFINITY;
    return { currentRatio, quickRatio, dToE };
  }, [ca, cl, inv, ncl, eqInput, totals.computedEquity]);

  const equalityOk =
    Math.abs(
      totals.assets - (totals.liabilities + (eqInput || totals.computedEquity))
    ) <= 1;

  function reset() {
    setCurrentAssets("");
    setInventory("");
    setNonCurrentAssets("");
    setCurrentLiabilities("");
    setNonCurrentLiabilities("");
    setEquityInput("");
  }

  return (
    <Card className="border-[#FFF0C3]">
      <CardHeader>
        <CardTitle className="text-[#1E1E1E]">Financial Health Check</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="ca"
              className="mb-1 block text-sm font-medium text-[#1E1E1E]"
            >
              Current Assets (₹)
            </label>
            <div className="relative">
              <IndianRupee className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1E1E1E] opacity-60" />
              <input
                id="ca"
                type="number"
                inputMode="numeric"
                min={0}
                className="w-full rounded-md border border-[#E5E5E5] bg-white pl-9 pr-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
                placeholder="e.g., 350000"
                value={currentAssets === "" ? "" : currentAssets}
                onChange={(e) =>
                  setCurrentAssets(
                    e.target.value === ""
                      ? ""
                      : Math.max(0, Math.floor(Number(e.target.value) || 0))
                  )
                }
              />
            </div>
            <p className="mt-1 text-xs text-[#1E1E1E] opacity-70">
              Cash, receivables, inventory, etc.
            </p>
          </div>

          <div>
            <label
              htmlFor="inv"
              className="mb-1 block text-sm font-medium text-[#1E1E1E]"
            >
              Inventory (₹)
            </label>
            <div className="relative">
              <IndianRupee className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1E1E1E] opacity-60" />
              <input
                id="inv"
                type="number"
                inputMode="numeric"
                min={0}
                className="w-full rounded-md border border-[#E5E5E5] bg-white pl-9 pr-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
                placeholder="e.g., 120000"
                value={inventory === "" ? "" : inventory}
                onChange={(e) =>
                  setInventory(
                    e.target.value === ""
                      ? ""
                      : Math.max(0, Math.floor(Number(e.target.value) || 0))
                  )
                }
              />
            </div>
            <p className="mt-1 text-xs text-[#1E1E1E] opacity-70">
              Used for Quick Ratio calculation.
            </p>
          </div>

          <div>
            <label
              htmlFor="nca"
              className="mb-1 block text-sm font-medium text-[#1E1E1E]"
            >
              Non-Current Assets (₹)
            </label>
            <div className="relative">
              <IndianRupee className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1E1E1E] opacity-60" />
              <input
                id="nca"
                type="number"
                inputMode="numeric"
                min={0}
                className="w-full rounded-md border border-[#E5E5E5] bg-white pl-9 pr-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
                placeholder="e.g., 800000"
                value={nonCurrentAssets === "" ? "" : nonCurrentAssets}
                onChange={(e) =>
                  setNonCurrentAssets(
                    e.target.value === ""
                      ? ""
                      : Math.max(0, Math.floor(Number(e.target.value) || 0))
                  )
                }
              />
            </div>
            <p className="mt-1 text-xs text-[#1E1E1E] opacity-70">
              Plant & machinery, property, etc.
            </p>
          </div>

          <div>
            <label
              htmlFor="cl"
              className="mb-1 block text-sm font-medium text-[#1E1E1E]"
            >
              Current Liabilities (₹)
            </label>
            <div className="relative">
              <IndianRupee className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1E1E1E] opacity-60" />
              <input
                id="cl"
                type="number"
                inputMode="numeric"
                min={0}
                className="w-full rounded-md border border-[#E5E5E5] bg-white pl-9 pr-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
                placeholder="e.g., 250000"
                value={currentLiabilities === "" ? "" : currentLiabilities}
                onChange={(e) =>
                  setCurrentLiabilities(
                    e.target.value === ""
                      ? ""
                      : Math.max(0, Math.floor(Number(e.target.value) || 0))
                  )
                }
              />
            </div>
            <p className="mt-1 text-xs text-[#1E1E1E] opacity-70">
              Payables, short-term loans, taxes, etc.
            </p>
          </div>

          <div>
            <label
              htmlFor="ncl"
              className="mb-1 block text-sm font-medium text-[#1E1E1E]"
            >
              Non-Current Liabilities (₹)
            </label>
            <div className="relative">
              <IndianRupee className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1E1E1E] opacity-60" />
              <input
                id="ncl"
                type="number"
                inputMode="numeric"
                min={0}
                className="w-full rounded-md border border-[#E5E5E5] bg-white pl-9 pr-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
                placeholder="e.g., 400000"
                value={
                  nonCurrentLiabilities === "" ? "" : nonCurrentLiabilities
                }
                onChange={(e) =>
                  setNonCurrentLiabilities(
                    e.target.value === ""
                      ? ""
                      : Math.max(0, Math.floor(Number(e.target.value) || 0))
                  )
                }
              />
            </div>
            <p className="mt-1 text-xs text-[#1E1E1E] opacity-70">
              Term loans, long-term borrowings.
            </p>
          </div>

          <div>
            <label
              htmlFor="eq"
              className="mb-1 block text-sm font-medium text-[#1E1E1E]"
            >
              Owner's Equity (₹) — optional
            </label>
            <div className="relative">
              <IndianRupee className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1E1E1E] opacity-60" />
              <input
                id="eq"
                type="number"
                inputMode="numeric"
                min={0}
                className="w-full rounded-md border border-[#E5E5E5] bg-white pl-9 pr-3 py-2 text-[#1E1E1E] outline-none focus:ring-2 focus:ring-[#F7C430]"
                placeholder="Auto-computed if left blank"
                value={equityInput === "" ? "" : equityInput}
                onChange={(e) =>
                  setEquityInput(
                    e.target.value === ""
                      ? ""
                      : Math.max(0, Math.floor(Number(e.target.value) || 0))
                  )
                }
              />
            </div>
            <p className="mt-1 text-xs text-[#1E1E1E] opacity-70">
              If blank, calculated as Assets − Liabilities.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-[#1E1E1E] opacity-70">
            Fill amounts in ₹ to see insights.
          </div>
          <Button
            onClick={reset}
            className="bg-[#F7C430] text-[#1E1E1E] hover:bg-[#E6B429]"
            type="button"
          >
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="border-[#FFF0C3]">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <Scale className="h-4 w-4 text-[#1E1E1E]" />
                <span className="text-sm font-medium text-[#1E1E1E]">
                  Assets
                </span>
              </div>
              <p className="text-lg font-semibold text-[#1E1E1E]">
                ₹{formatINR(totals.assets)}
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#FFF0C3]">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <Percent className="h-4 w-4 text-[#1E1E1E]" />
                <span className="text-sm font-medium text-[#1E1E1E]">
                  Liabilities
                </span>
              </div>
              <p className="text-lg font-semibold text-[#1E1E1E]">
                ₹{formatINR(totals.liabilities)}
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#FFF0C3]">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <Gauge className="h-4 w-4 text-[#1E1E1E]" />
                <span className="text-sm font-medium text-[#1E1E1E]">
                  Equity (computed)
                </span>
              </div>
              <p className="text-lg font-semibold text-[#1E1E1E]">
                ₹{formatINR(eqInput > 0 ? eqInput : totals.computedEquity)}
              </p>
            </CardContent>
          </Card>
        </div>

        <div
          className={`rounded-lg border p-4 ${
            equalityOk
              ? "border-green-200 bg-green-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <div className="flex items-center gap-2">
            {equalityOk ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-600" />
            )}
            <span className="text-sm font-medium text-[#1E1E1E]">
              {equalityOk ? "Balanced:" : "Not Balanced:"} Assets = Liabilities
              + Equity
            </span>
          </div>
          {!equalityOk && (
            <p className="mt-1 text-xs text-[#1E1E1E] opacity-80">
              Adjust numbers so totals align with the accounting equation.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Current Ratio */}
          <Card className="border-[#FFF0C3]">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-[#1E1E1E]">
                  Current Ratio
                </span>
                <Badge className="bg-[#F7C430] text-[#1E1E1E]">
                  {Number.isFinite(ratios.currentRatio)
                    ? ratios.currentRatio.toFixed(2)
                    : "∞"}
                </Badge>
              </div>
              <div
                className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${
                  classifyCurrentRatio(ratios.currentRatio).color
                }`}
              >
                {classifyCurrentRatio(ratios.currentRatio).label}
              </div>
            </CardContent>
          </Card>

          {/* Quick Ratio */}
          <Card className="border-[#FFF0C3]">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-[#1E1E1E]">
                  Quick Ratio
                </span>
                <Badge className="bg-[#F7C430] text-[#1E1E1E]">
                  {Number.isFinite(ratios.quickRatio)
                    ? ratios.quickRatio.toFixed(2)
                    : "∞"}
                </Badge>
              </div>
              <div
                className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${
                  classifyQuickRatio(ratios.quickRatio).color
                }`}
              >
                {classifyQuickRatio(ratios.quickRatio).label}
              </div>
            </CardContent>
          </Card>

          {/* Debt to Equity */}
          <Card className="border-[#FFF0C3]">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-[#1E1E1E]">
                  Debt to Equity
                </span>
                <Badge className="bg-[#F7C430] text-[#1E1E1E]">
                  {Number.isFinite(ratios.dToE) ? ratios.dToE.toFixed(2) : "∞"}
                </Badge>
              </div>
              <div
                className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${
                  classifyDebtToEquity(ratios.dToE).color
                }`}
              >
                {classifyDebtToEquity(ratios.dToE).label}
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-xs text-[#1E1E1E] opacity-70">
          This tool is for guidance only and does not replace professional
          financial advice. For audited or bank-ready statements, please consult
          our team.
        </p>
      </CardContent>
    </Card>
  );
}
