"use client";

import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type SliderPrimitiveProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange">;

export interface SliderProps extends SliderPrimitiveProps {
  value: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ value, min = 0, max = 100, step = 1, onValueChange, className, ...props }, ref) => {
    const currentValue = value?.[0] ?? min;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = Number(event.target.value);
      onValueChange?.([nextValue]);
    };

    return (
      <div className={cn("relative w-full", className)}>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          className="h-2 w-full appearance-none rounded-full bg-white/10 outline-none transition-all duration-150"
          {...props}
        />
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 9999px;
            background: linear-gradient(135deg, #22d3ee, #6366f1);
            border: 2px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 4px 12px -6px rgba(56, 189, 248, 0.6);
            cursor: pointer;
          }
          input[type="range"]::-moz-range-thumb {
            height: 16px;
            width: 16px;
            border-radius: 9999px;
            background: linear-gradient(135deg, #22d3ee, #6366f1);
            border: 2px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 4px 12px -6px rgba(56, 189, 248, 0.6);
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }
);

Slider.displayName = "Slider";

