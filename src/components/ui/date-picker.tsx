"use client"

import React, { useState } from "react"
import { TextField } from "@mui/material"
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

interface DatePickerProps {
  date?: Date
  setDate: (date: Date | undefined) => void
  className?: string
  disabled?: boolean
}

export function DatePicker({ date, setDate, className, disabled }: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        value={date || null}
        onChange={(newDate) => {
          if (newDate) {
            setDate(newDate);
          } else {
            setDate(undefined);
          }
        }}
        disabled={disabled}
        sx={{
          width: '100%',
          '& .MuiInputBase-root': {
            backgroundColor: '#f1f1f1',
            borderRadius: '6px',
            border: '0',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '& .MuiInputBase-input': {
            padding: '12px',
            color: 'black',
          },
        }}
      />
    </LocalizationProvider>
  )
}
