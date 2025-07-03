import React from "react";

interface LabeledSliderInputProps {
	label: string;
	value: number | string;
	min: number;
	max: number;
	step?: number;
	unit?: string;
	minLabel?: string;
	maxLabel?: string;
	onChange: (val: number) => void;
}

const LabeledSliderInput: React.FC<LabeledSliderInputProps> = ({
	label,
	value,
	min,
	max,
	step = 1,
	unit = "",
	minLabel,
	maxLabel,
	onChange,
}) => {
	return (
		<div className="grid grid-cols-5 items-center gap-2">
			<label className="col-span-3 text-[#404040] text-sm">{label}</label>

			<input
				type="text"
				readOnly
				value={typeof value === "number" ? `${value}${unit}` : value}
				className="col-span-2 text-center text-sm bg-[#fffaed] px-3 py-2 rounded border border-[#717171] text-[#404040]"
			/>

			<div className="col-span-5 flex flex-col items-center">
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={(e) => onChange(Number(e.target.value))}
					className="calculator-slider"
				/>
				<div className="flex justify-between w-full">
					<span className="text-xs font-light text-[#404040]">
						{minLabel || min}
					</span>
					<span className="text-xs font-light text-[#404040]">
						{maxLabel || max}
					</span>
				</div>
			</div>
		</div>
	);
};

export default LabeledSliderInput;
