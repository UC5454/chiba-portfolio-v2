"use client";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = ["種類", "情報", "内容", "確認"];

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-md mx-auto mb-8">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum <= currentStep;
        const isCurrent = stepNum === currentStep;

        return (
          <div key={stepNum} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                  isCurrent
                    ? "bg-gold-retro text-navy-deep border-gold-retro shadow-[0_0_10px_rgba(255,215,0,0.4)]"
                    : isActive
                    ? "bg-gold-retro/80 text-navy-deep border-gold-retro/80"
                    : "bg-navy-light text-gray-500 border-gold-retro/20"
                }`}
                aria-current={isCurrent ? "step" : undefined}
              >
                {stepNum}
              </div>
              <span
                className={`text-[10px] md:text-xs mt-1 font-bold ${
                  isActive ? "text-gold-retro" : "text-gray-500"
                }`}
              >
                {stepLabels[i]}
              </span>
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 md:mx-2 mt-[-16px] transition-all duration-300 ${
                  stepNum < currentStep ? "bg-gold-retro/80" : "bg-gold-retro/20"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
