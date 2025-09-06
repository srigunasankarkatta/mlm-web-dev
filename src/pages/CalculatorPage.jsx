import React from "react";
import IncomeCalculator from "../components/IncomeCalculator";

/**
 * Calculator Page Component
 *
 * A standalone page that displays the Income Calculator component
 * centered on the page for easy access and testing.
 */
const CalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            MLM Income Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your potential earnings from direct referrals, level
            income, club bonuses, and autopool completions. All calculations
            update in real-time as you modify the input parameters.
          </p>
        </div>

        <IncomeCalculator isOpen={true} onClose={() => {}} />
      </div>
    </div>
  );
};

export default CalculatorPage;
