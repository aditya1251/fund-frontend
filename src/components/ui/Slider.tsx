import React from 'react'

interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  max: number
  min: number
  step: number
  className?: string
}

export function Slider({ value, onValueChange, max, min, step, className = '' }: SliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    onValueChange([newValue])
  }

  return (
    <div className={`relative flex w-full touch-none select-none items-center ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleChange}
        className="relative h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 outline-none transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 slider"
        style={{
          background: `linear-gradient(to right, #ffd500 0%, #ffd500 ${((value[0] - min) / (max - min)) * 100}%, #e2e2e2 ${((value[0] - min) / (max - min)) * 100}%, #e2e2e2 100%)`
        }}
      />
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffd500;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffd500;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}
