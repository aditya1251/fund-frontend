"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft } from "lucide-react"

interface LoanFormData {
  // Step 1: Personal Information
  fullName: string
  fatherSpouseName: string
  dateOfBirth: string
  age: string
  gender: string
  maritalStatus: string
  nationality: string
  panNumber: string
  aadhaarNumber: string
  contactNumber: string
  emailAddress: string

  // Step 2: Address Details
  currentAddress: string
  currentCity: string
  currentState: string
  currentPincode: string
  ownership: string
  permanentAddress: string
  permanentCity: string
  permanentState: string
  permanentPincode: string
  sameAsCurrent: boolean

  // Step 3: Employment & Income
  occupation: string
  employerBusinessName: string
  designation: string
  workExperience: string
  monthlyIncome: string
  otherIncome: string
  officeAddress: string

  // Step 4: Loan Requirements
  loanAmount: string
  purpose: string
  propertyType: string
  propertyLocation: string
  propertyValue: string
  loanTenure: string
  downPayment: string

  // Step 5: Bank Details
  bankName: string
  branch: string
  accountNumber: string
  ifscCode: string

  // Step 6: Co-Applicant Details
  coApplicantName: string
  relationship: string
  coApplicantDOB: string
  coApplicantPAN: string
  coApplicantIncome: string
  coApplicantOccupation: string

  // Step 7: Declaration
  declarationAccepted: boolean
}

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loanType, setLoanType] = useState("")
  const [loanSubtype, setLoanSubtype] = useState("")
  const [formData, setFormData] = useState<LoanFormData>({
    fullName: "",
    fatherSpouseName: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    maritalStatus: "",
    nationality: "",
    panNumber: "",
    aadhaarNumber: "",
    contactNumber: "",
    emailAddress: "",
    currentAddress: "",
    currentCity: "",
    currentState: "",
    currentPincode: "",
    ownership: "",
    permanentAddress: "",
    permanentCity: "",
    permanentState: "",
    permanentPincode: "",
    sameAsCurrent: false,
    occupation: "",
    employerBusinessName: "",
    designation: "",
    workExperience: "",
    monthlyIncome: "",
    otherIncome: "",
    officeAddress: "",
    loanAmount: "",
    purpose: "",
    propertyType: "",
    propertyLocation: "",
    propertyValue: "",
    loanTenure: "",
    downPayment: "",
    bankName: "",
    branch: "",
    accountNumber: "",
    ifscCode: "",
    coApplicantName: "",
    relationship: "",
    coApplicantDOB: "",
    coApplicantPAN: "",
    coApplicantIncome: "",
    coApplicantOccupation: "",
    declarationAccepted: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isValidating, setIsValidating] = useState(false)

  // Validation functions for each step
  const validateStep1 = () => {
    const stepErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) stepErrors.fullName = "Full name is required"
    if (!formData.fatherSpouseName.trim()) stepErrors.fatherSpouseName = "Father's/Spouse's name is required"
    if (!formData.dateOfBirth) stepErrors.dateOfBirth = "Date of birth is required"
    if (!formData.age.trim()) stepErrors.age = "Age is required"
    if (!formData.gender) stepErrors.gender = "Gender is required"
    if (!formData.maritalStatus) stepErrors.maritalStatus = "Marital status is required"
    if (!formData.nationality.trim()) stepErrors.nationality = "Nationality is required"
    if (!formData.panNumber.trim()) stepErrors.panNumber = "PAN number is required"
    if (!formData.aadhaarNumber.trim()) stepErrors.aadhaarNumber = "Aadhaar number is required"
    if (!formData.contactNumber.trim()) stepErrors.contactNumber = "Contact number is required"
    if (!formData.emailAddress.trim()) stepErrors.emailAddress = "Email address is required"

    return stepErrors
  }

  const validateStep2 = () => {
    const stepErrors: Record<string, string> = {}

    if (!formData.currentAddress.trim()) stepErrors.currentAddress = "Current address is required"
    if (!formData.currentCity.trim()) stepErrors.currentCity = "Current city is required"
    if (!formData.currentState.trim()) stepErrors.currentState = "Current state is required"
    if (!formData.currentPincode.trim()) stepErrors.currentPincode = "Current pincode is required"
    if (!formData.ownership) stepErrors.ownership = "Ownership type is required"

    if (!formData.sameAsCurrent) {
      if (!formData.permanentAddress.trim()) stepErrors.permanentAddress = "Permanent address is required"
      if (!formData.permanentCity.trim()) stepErrors.permanentCity = "Permanent city is required"
      if (!formData.permanentState.trim()) stepErrors.permanentState = "Permanent state is required"
      if (!formData.permanentPincode.trim()) stepErrors.permanentPincode = "Permanent pincode is required"
    }

    return stepErrors
  }

  const validateStep3 = () => {
    const stepErrors: Record<string, string> = {}

    if (!formData.occupation) stepErrors.occupation = "Occupation is required"
    if (!formData.employerBusinessName.trim()) stepErrors.employerBusinessName = "Employer/Business name is required"
    if (!formData.workExperience.trim()) stepErrors.workExperience = "Work experience is required"
    if (!formData.monthlyIncome.trim()) stepErrors.monthlyIncome = "Monthly income is required"

    return stepErrors
  }

  const validateStep4 = () => {
    const stepErrors: Record<string, string> = {}

    if (!formData.loanAmount.trim()) stepErrors.loanAmount = "Loan amount is required"
    if (!formData.purpose) stepErrors.purpose = "Purpose is required"
    if (!formData.propertyType) stepErrors.propertyType = "Property type is required"
    if (!formData.propertyLocation.trim()) stepErrors.propertyLocation = "Property location is required"
    if (!formData.propertyValue.trim()) stepErrors.propertyValue = "Property value is required"
    if (!formData.loanTenure) stepErrors.loanTenure = "Loan tenure is required"
    if (!formData.downPayment.trim()) stepErrors.downPayment = "Down payment is required"

    return stepErrors
  }

  const validateStep5 = () => {
    const stepErrors: Record<string, string> = {}

    if (!formData.bankName.trim()) stepErrors.bankName = "Bank name is required"
    if (!formData.branch.trim()) stepErrors.branch = "Branch is required"
    if (!formData.accountNumber.trim()) stepErrors.accountNumber = "Account number is required"
    if (!formData.ifscCode.trim()) stepErrors.ifscCode = "IFSC code is required"

    return stepErrors
  }

  const validateStep6 = () => {
    // Step 6 is optional, so no required validations
    return {}
  }

  const validateStep7 = () => {
    const stepErrors: Record<string, string> = {}

    if (!formData.declarationAccepted) stepErrors.declarationAccepted = "You must accept the declaration to proceed"

    return stepErrors
  }

  const validateCurrentStep = () => {
    let stepErrors: Record<string, string> = {}

    switch (currentStep) {
      case 1:
        stepErrors = validateStep1()
        break
      case 2:
        stepErrors = validateStep2()
        break
      case 3:
        stepErrors = validateStep3()
        break
      case 4:
        stepErrors = validateStep4()
        break
      case 5:
        stepErrors = validateStep5()
        break
      case 6:
        stepErrors = validateStep6()
        break
      case 7:
        stepErrors = validateStep7()
        break
    }

    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  // Demo submit function
  const handleSubmit = () => {
    console.log("=== LOAN APPLICATION SUBMITTED ===")
    console.log("Loan Type:", loanType)
    console.log("Loan Subtype:", loanSubtype)
    console.log("Form Data:", formData)
    console.log("=== END OF SUBMISSION ===")

    // Show success message
    alert("Application submitted successfully! Check console for details.")
  }

  // Update the handleNext function
  const handleNext = () => {
    setIsValidating(true)

    if (validateCurrentStep()) {
      if (currentStep < 7) {
        setCurrentStep(currentStep + 1)
        setErrors({}) // Clear errors when moving to next step
      } else {
        handleSubmit()
      }
    }

    setIsValidating(false)
  }

  useEffect(() => {
    // Get loan type and subtype from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    setLoanType(urlParams.get("type") || "Home Loan")
    setLoanSubtype(urlParams.get("subtype") || "")
  }, [])

  const steps = [1, 2, 3, 4, 5, 6, 7]
  const stepTitles = [
    "Personal Information",
    "Address Details",
    "Employment & Income Details",
    "Loan Requirements",
    "Bank Details",
    "Co-Applicant Details",
    "Declaration",
  ]

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: keyof LoanFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const renderError = (fieldName: string) => {
    if (errors[fieldName]) {
      return <p className="text-red-500 text-sm mt-1">{errors[fieldName]}</p>
    }
    return null
  }

  const handleSameAsCurrentChange = (checked: boolean) => {
    updateFormData("sameAsCurrent", checked)
    if (checked) {
      // Copy current address to permanent address
      updateFormData("permanentAddress", formData.currentAddress)
      updateFormData("permanentCity", formData.currentCity)
      updateFormData("permanentState", formData.currentState)
      updateFormData("permanentPincode", formData.currentPincode)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-[#2d2c2c] font-medium">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("fullName")}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherSpouseName" className="text-[#2d2c2c] font-medium">
                  Father's / Spouse's Name *
                </Label>
                <Input
                  id="fatherSpouseName"
                  placeholder="Enter father's or spouse's name"
                  value={formData.fatherSpouseName}
                  onChange={(e) => updateFormData("fatherSpouseName", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("fatherSpouseName")}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-[#2d2c2c] font-medium">
                  Date of Birth *
                </Label>
                <div className="relative">
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                    className="bg-[#eff0f6] border-0 h-12"
                  />
                </div>
                {renderError("dateOfBirth")}
              </div>
              <div className="space-y-2">
                <Label htmlFor="age" className="text-[#2d2c2c] font-medium">
                  Age *
                </Label>
                <Input
                  id="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => updateFormData("age", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("age")}
              </div>
              <div className="space-y-2">
                <Label className="text-[#2d2c2c] font-medium">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                  <SelectTrigger className="border-0 h-12">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {renderError("gender")}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[#2d2c2c] font-medium">Marital Status *</Label>
                <Select
                  value={formData.maritalStatus}
                  onValueChange={(value) => updateFormData("maritalStatus", value)}
                >
                  <SelectTrigger className="bg-[#eff0f6] border-0 h-12">
                    <SelectValue placeholder="Select Marital Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                  </SelectContent>
                </Select>
                {renderError("maritalStatus")}
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality" className="text-[#2d2c2c] font-medium">
                  Nationality *
                </Label>
                <Input
                  id="nationality"
                  placeholder="Enter nationality"
                  value={formData.nationality}
                  onChange={(e) => updateFormData("nationality", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("nationality")}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="panNumber" className="text-[#2d2c2c] font-medium">
                  PAN Number *
                </Label>
                <Input
                  id="panNumber"
                  placeholder="Enter PAN number"
                  value={formData.panNumber}
                  onChange={(e) => updateFormData("panNumber", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("panNumber")}
              </div>
              <div className="space-y-2">
                <Label htmlFor="aadhaarNumber" className="text-[#2d2c2c] font-medium">
                  Aadhaar Number *
                </Label>
                <Input
                  id="aadhaarNumber"
                  placeholder="Enter Aadhaar number"
                  value={formData.aadhaarNumber}
                  onChange={(e) => updateFormData("aadhaarNumber", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("aadhaarNumber")}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactNumber" className="text-[#2d2c2c] font-medium">
                  Contact Number *
                </Label>
                <Input
                  id="contactNumber"
                  placeholder="Enter contact number"
                  value={formData.contactNumber}
                  onChange={(e) => updateFormData("contactNumber", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("contactNumber")}
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailAddress" className="text-[#2d2c2c] font-medium">
                  Email Address *
                </Label>
                <Input
                  id="emailAddress"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.emailAddress}
                  onChange={(e) => updateFormData("emailAddress", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("emailAddress")}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#2d2c2c]">Current Residential Address</h3>
              <div className="space-y-2">
                <Label htmlFor="currentAddress" className="text-[#2d2c2c] font-medium">
                  Address *
                </Label>
                <Textarea
                  id="currentAddress"
                  placeholder="Enter current address"
                  value={formData.currentAddress}
                  onChange={(e) => updateFormData("currentAddress", e.target.value)}
                  className="bg-[#eff0f6] border-0 min-h-[80px] placeholder:text-[#999999]"
                />
                {renderError("currentAddress")}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentCity" className="text-[#2d2c2c] font-medium">
                    City *
                  </Label>
                  <Input
                    id="currentCity"
                    placeholder="Enter city"
                    value={formData.currentCity}
                    onChange={(e) => updateFormData("currentCity", e.target.value)}
                    className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                  />
                  {renderError("currentCity")}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentState" className="text-[#2d2c2c] font-medium">
                    State *
                  </Label>
                  <Input
                    id="currentState"
                    placeholder="Enter state"
                    value={formData.currentState}
                    onChange={(e) => updateFormData("currentState", e.target.value)}
                    className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                  />
                  {renderError("currentState")}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentPincode" className="text-[#2d2c2c] font-medium">
                    Pincode *
                  </Label>
                  <Input
                    id="currentPincode"
                    placeholder="Enter pincode"
                    value={formData.currentPincode}
                    onChange={(e) => updateFormData("currentPincode", e.target.value)}
                    className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                  />
                  {renderError("currentPincode")}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[#2d2c2c] font-medium">Ownership *</Label>
                <Select value={formData.ownership} onValueChange={(value) => updateFormData("ownership", value)}>
                  <SelectTrigger className="bg-[#eff0f6] border-0 h-12">
                    <SelectValue placeholder="Select ownership type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owned">Owned</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                    <SelectItem value="parental">Parental</SelectItem>
                  </SelectContent>
                </Select>
                {renderError("ownership")}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sameAsCurrent"
                  checked={formData.sameAsCurrent}
                  onCheckedChange={handleSameAsCurrentChange}
                />
                <Label htmlFor="sameAsCurrent" className="text-[#2d2c2c] font-medium">
                  Permanent address same as current address
                </Label>
              </div>

              {!formData.sameAsCurrent && (
                <>
                  <h3 className="text-lg font-medium text-[#2d2c2c]">Permanent Address</h3>
                  <div className="space-y-2">
                    <Label htmlFor="permanentAddress" className="text-[#2d2c2c] font-medium">
                      Address
                    </Label>
                    <Textarea
                      id="permanentAddress"
                      placeholder="Enter permanent address"
                      value={formData.permanentAddress}
                      onChange={(e) => updateFormData("permanentAddress", e.target.value)}
                      className="bg-[#eff0f6] border-0 min-h-[80px] placeholder:text-[#999999]"
                    />
                    {renderError("permanentAddress")}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="permanentCity" className="text-[#2d2c2c] font-medium">
                        City
                      </Label>
                      <Input
                        id="permanentCity"
                        placeholder="Enter city"
                        value={formData.permanentCity}
                        onChange={(e) => updateFormData("permanentCity", e.target.value)}
                        className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                      />
                      {renderError("permanentCity")}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="permanentState" className="text-[#2d2c2c] font-medium">
                        State
                      </Label>
                      <Input
                        id="permanentState"
                        placeholder="Enter state"
                        value={formData.permanentState}
                        onChange={(e) => updateFormData("permanentState", e.target.value)}
                        className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                      />
                      {renderError("permanentState")}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="permanentPincode" className="text-[#2d2c2c] font-medium">
                        Pincode
                      </Label>
                      <Input
                        id="permanentPincode"
                        placeholder="Enter pincode"
                        value={formData.permanentPincode}
                        onChange={(e) => updateFormData("permanentPincode", e.target.value)}
                        className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                      />
                      {renderError("permanentPincode")}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[#2d2c2c] font-medium">Occupation *</Label>
                <Select value={formData.occupation} onValueChange={(value) => updateFormData("occupation", value)}>
                  <SelectTrigger className="bg-[#eff0f6] border-0 h-12">
                    <SelectValue placeholder="Select occupation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="self-employed">Self-Employed</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
                {renderError("occupation")}
              </div>
              <div className="space-y-2">
                <Label htmlFor="employerBusinessName" className="text-[#2d2c2c] font-medium">
                  Employer / Business Name *
                </Label>
                <Input
                  id="employerBusinessName"
                  placeholder="Enter employer or business name"
                  value={formData.employerBusinessName}
                  onChange={(e) => updateFormData("employerBusinessName", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("employerBusinessName")}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="designation" className="text-[#2d2c2c] font-medium">
                  Designation
                </Label>
                <Input
                  id="designation"
                  placeholder="Enter designation"
                  value={formData.designation}
                  onChange={(e) => updateFormData("designation", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workExperience" className="text-[#2d2c2c] font-medium">
                  Work Experience (Years) *
                </Label>
                <Input
                  id="workExperience"
                  placeholder="Enter work experience"
                  value={formData.workExperience}
                  onChange={(e) => updateFormData("workExperience", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("workExperience")}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome" className="text-[#2d2c2c] font-medium">
                  Monthly Income (₹) *
                </Label>
                <Input
                  id="monthlyIncome"
                  placeholder="Enter monthly income"
                  value={formData.monthlyIncome}
                  onChange={(e) => updateFormData("monthlyIncome", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("monthlyIncome")}
              </div>
              <div className="space-y-2">
                <Label htmlFor="otherIncome" className="text-[#2d2c2c] font-medium">
                  Other Income Sources (₹)
                </Label>
                <Input
                  id="otherIncome"
                  placeholder="Enter other income"
                  value={formData.otherIncome}
                  onChange={(e) => updateFormData("otherIncome", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="officeAddress" className="text-[#2d2c2c] font-medium">
                Office Address
              </Label>
              <Textarea
                id="officeAddress"
                placeholder="Enter office address"
                value={formData.officeAddress}
                onChange={(e) => updateFormData("officeAddress", e.target.value)}
                className="bg-[#eff0f6] border-0 min-h-[80px] placeholder:text-[#999999]"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="loanAmount" className="text-[#2d2c2c] font-medium">
                  Loan Amount Requested (₹) *
                </Label>
                <Input
                  id="loanAmount"
                  placeholder="Enter loan amount"
                  value={formData.loanAmount}
                  onChange={(e) => updateFormData("loanAmount", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("loanAmount")}
              </div>
              <div className="space-y-2">
                <Label className="text-[#2d2c2c] font-medium">Purpose *</Label>
                <Select value={formData.purpose} onValueChange={(value) => updateFormData("purpose", value)}>
                  <SelectTrigger className="bg-[#eff0f6] border-0 h-12">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home-purchase">Home Purchase</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="renovation">Renovation</SelectItem>
                    <SelectItem value="plot-construction">Plot + Construction</SelectItem>
                  </SelectContent>
                </Select>
                {renderError("purpose")}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[#2d2c2c] font-medium">Property Type *</Label>
                <Select value={formData.propertyType} onValueChange={(value) => updateFormData("propertyType", value)}>
                  <SelectTrigger className="bg-[#eff0f6] border-0 h-12">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="independent-house">Independent House</SelectItem>
                    <SelectItem value="plot">Plot</SelectItem>
                  </SelectContent>
                </Select>
                {renderError("propertyType")}
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyLocation" className="text-[#2d2c2c] font-medium">
                  Property Location *
                </Label>
                <Input
                  id="propertyLocation"
                  placeholder="Enter property location"
                  value={formData.propertyLocation}
                  onChange={(e) => updateFormData("propertyLocation", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("propertyLocation")}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="propertyValue" className="text-[#2d2c2c] font-medium">
                  Property Value (Approx.) (₹) *
                </Label>
                <Input
                  id="propertyValue"
                  placeholder="Enter property value"
                  value={formData.propertyValue}
                  onChange={(e) => updateFormData("propertyValue", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("propertyValue")}
              </div>
              <div className="space-y-2">
                <Label className="text-[#2d2c2c] font-medium">Loan Tenure Requested *</Label>
                <Select value={formData.loanTenure} onValueChange={(value) => updateFormData("loanTenure", value)}>
                  <SelectTrigger className="bg-[#eff0f6] border-0 h-12">
                    <SelectValue placeholder="Select loan tenure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 years</SelectItem>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                    <SelectItem value="25">25 years</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {renderError("loanTenure")}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="downPayment" className="text-[#2d2c2c] font-medium">
                Down Payment (Own Contribution) (₹) *
              </Label>
              <Input
                id="downPayment"
                placeholder="Enter down payment amount"
                value={formData.downPayment}
                onChange={(e) => updateFormData("downPayment", e.target.value)}
                className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
              />
              {renderError("downPayment")}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bankName" className="text-[#2d2c2c] font-medium">
                  Bank Name *
                </Label>
                <Input
                  id="bankName"
                  placeholder="Enter bank name"
                  value={formData.bankName}
                  onChange={(e) => updateFormData("bankName", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("bankName")}
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch" className="text-[#2d2c2c] font-medium">
                  Branch *
                </Label>
                <Input
                  id="branch"
                  placeholder="Enter branch name"
                  value={formData.branch}
                  onChange={(e) => updateFormData("branch", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("branch")}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="accountNumber" className="text-[#2d2c2c] font-medium">
                  Account Number *
                </Label>
                <Input
                  id="accountNumber"
                  placeholder="Enter account number"
                  value={formData.accountNumber}
                  onChange={(e) => updateFormData("accountNumber", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("accountNumber")}
              </div>
              <div className="space-y-2">
                <Label htmlFor="ifscCode" className="text-[#2d2c2c] font-medium">
                  IFSC Code *
                </Label>
                <Input
                  id="ifscCode"
                  placeholder="Enter IFSC code"
                  value={formData.ifscCode}
                  onChange={(e) => updateFormData("ifscCode", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
                {renderError("ifscCode")}
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-[#6f6c90] text-sm">
                Co-applicant details are optional but can help improve loan eligibility
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="coApplicantName" className="text-[#2d2c2c] font-medium">
                  Full Name
                </Label>
                <Input
                  id="coApplicantName"
                  placeholder="Enter co-applicant name"
                  value={formData.coApplicantName}
                  onChange={(e) => updateFormData("coApplicantName", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship" className="text-[#2d2c2c] font-medium">
                  Relationship with Applicant
                </Label>
                <Input
                  id="relationship"
                  placeholder="Enter relationship"
                  value={formData.relationship}
                  onChange={(e) => updateFormData("relationship", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="coApplicantDOB" className="text-[#2d2c2c] font-medium">
                  Date of Birth
                </Label>
                <Input
                  id="coApplicantDOB"
                  type="date"
                  value={formData.coApplicantDOB}
                  onChange={(e) => updateFormData("coApplicantDOB", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coApplicantPAN" className="text-[#2d2c2c] font-medium">
                  PAN Number
                </Label>
                <Input
                  id="coApplicantPAN"
                  placeholder="Enter PAN number"
                  value={formData.coApplicantPAN}
                  onChange={(e) => updateFormData("coApplicantPAN", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="coApplicantIncome" className="text-[#2d2c2c] font-medium">
                  Income (Monthly) (₹)
                </Label>
                <Input
                  id="coApplicantIncome"
                  placeholder="Enter monthly income"
                  value={formData.coApplicantIncome}
                  onChange={(e) => updateFormData("coApplicantIncome", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coApplicantOccupation" className="text-[#2d2c2c] font-medium">
                  Occupation
                </Label>
                <Input
                  id="coApplicantOccupation"
                  placeholder="Enter occupation"
                  value={formData.coApplicantOccupation}
                  onChange={(e) => updateFormData("coApplicantOccupation", e.target.value)}
                  className="bg-[#eff0f6] border-0 h-12 placeholder:text-[#999999]"
                />
              </div>
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div className="bg-[#eff0f6] p-6 rounded-lg">
              <h3 className="text-lg font-medium text-[#2d2c2c] mb-4">Declaration</h3>
              <p className="text-[#40444c] text-sm leading-relaxed mb-6">
                I/we hereby declare that the information provided in this application is true and correct to the best of
                my/our knowledge. I/we authorize the lender to verify the details submitted and access my/our credit
                history. I/we agree to comply with the terms and conditions of the home loan if sanctioned.
              </p>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="declarationAccepted"
                  checked={formData.declarationAccepted}
                  onCheckedChange={(checked) => updateFormData("declarationAccepted", checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="declarationAccepted" className="text-[#2d2c2c] font-medium text-sm leading-relaxed">
                  I accept the above declaration and agree to the terms and conditions *
                </Label>
              </div>
              {renderError("declarationAccepted")}
            </div>

            <div className="bg-[#f9f9f9] p-6 rounded-lg">
              <h4 className="text-md font-medium text-[#2d2c2c] mb-3">Application Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-[#6f6c90]">Loan Type:</span>
                  <span className="ml-2 text-[#2d2c2c] font-medium">{loanType}</span>
                </div>
                <div>
                  <span className="text-[#6f6c90]">Loan Amount:</span>
                  <span className="ml-2 text-[#2d2c2c] font-medium">₹{formData.loanAmount}</span>
                </div>
                <div>
                  <span className="text-[#6f6c90]">Applicant Name:</span>
                  <span className="ml-2 text-[#2d2c2c] font-medium">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-[#6f6c90]">Property Type:</span>
                  <span className="ml-2 text-[#2d2c2c] font-medium">{formData.propertyType}</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3] p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6 shadow-sm border-0">
          <CardHeader className="flex flex-row items-center gap-4 py-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-[#2d2c2c] text-white hover:bg-[#40444c]"
              onClick={() => window.history.back()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold text-[#2d2c2c]">
                {loanType} Application {loanSubtype && `- ${loanSubtype}`}
              </h1>
              <Badge className="bg-[#f5d949] text-[#2d2c2c] hover:bg-[#f5d949] font-medium px-3 py-1">
                In Progress
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Main Form Card */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-8">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8 overflow-x-auto">
              <div className="flex items-center gap-2 md:gap-4 min-w-max">
                {steps.map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step === currentStep
                          ? "bg-[#f5d949] text-[#2d2c2c]"
                          : step < currentStep
                            ? "bg-[#4ade80] text-white"
                            : "bg-[#edeef1] text-[#6f6c90]"
                      }`}
                    >
                      {step}
                    </div>
                    {index < steps.length - 1 && <div className="w-4 md:w-8 h-0.5 bg-[#edeef1] mx-1 md:mx-2" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Info */}
            <div className="text-center mb-8">
              <p className="text-[#f5d949] text-sm font-medium mb-2">Step {currentStep}/7</p>
              <h2 className="text-xl font-semibold text-[#2d2c2c]">{stepTitles[currentStep - 1]}</h2>
            </div>

            {/* Form Content */}
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                variant="outline"
                className="px-8 py-3 h-12 border-[#edeef1] text-[#6f6c90] hover:bg-[#eff0f6] bg-transparent"
              >
                Previous
              </Button>
              <Button
                onClick={currentStep === 7 ? handleSubmit : handleNext}
                disabled={(currentStep === 7 && !formData.declarationAccepted) || isValidating}
                className="bg-[#f5d949] hover:bg-[#ffe45c] text-[#2d2c2c] font-medium px-8 py-3 h-12"
              >
                {isValidating ? "Validating..." : currentStep === 7 ? "Submit Application" : "Next Step"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
