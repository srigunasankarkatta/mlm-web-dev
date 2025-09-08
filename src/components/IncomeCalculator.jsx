import React, { useState, useEffect } from "react";
import { Download, Info, ChevronDown, ChevronUp } from "lucide-react";
import {
  computeIncome,
  validateInputs,
  DEFAULT_CONFIG,
  DEFAULT_PACKAGES,
} from "../utils/calc";

/**
 * Income Calculator Component
 *
 * A comprehensive MLM income calculator with real-time calculations,
 * input validation, and export functionality.
 */
const IncomeCalculator = ({ isOpen, onClose }) => {
  // State for all inputs
  const [selectedPackage, setSelectedPackage] = useState(
    DEFAULT_PACKAGES[0] || { name: "Default", price: 0 }
  );
  const [numDirects, setNumDirects] = useState(0);
  const [levelCounts, setLevelCounts] = useState(
    Array.from({ length: 10 }).map(() => 0)
  );
  const [numLevels, setNumLevels] = useState(3);
  const [clubJoins, setClubJoins] = useState(0);
  const [autopoolCompletions, setAutopoolCompletions] = useState([0, 0, 0]);
  const [hasPackage1, setHasPackage1] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customDirectPercentages, setCustomDirectPercentages] = useState(
    DEFAULT_CONFIG.directPercentages
  );
  const [customLevelPercentages, setCustomLevelPercentages] = useState(
    DEFAULT_CONFIG.levelPercentages
  );

  // State for calculations and validation
  const [calculation, setCalculation] = useState(null);
  const [errors, setErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);

  // Real-time calculation effect
  useEffect(() => {
    if (!isOpen) return;

    setIsCalculating(true);

    // Debounce calculation to avoid excessive re-renders
    const timeoutId = setTimeout(() => {
      try {
        const inputs = {
          selectedPackage,
          numDirects,
          levelCounts: levelCounts.slice(0, numLevels),
          clubJoins,
          autopoolCompletions,
          hasPackage1,
          customDirectPercentages: showAdvanced
            ? customDirectPercentages
            : undefined,
          customLevelPercentages: showAdvanced
            ? customLevelPercentages
            : undefined,
        };

        const validationErrors = validateInputs(inputs);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
          // NOTE: computeIncome signature expected by utils/calc.js in this project
          // may be computeIncome(inputs, DEFAULT_CONFIG) — keep as used by this component.
          const result = computeIncome(inputs, DEFAULT_CONFIG);
          setCalculation(result);
        } else {
          setCalculation(null);
        }
      } catch (error) {
        console.error("Calculation error:", error);
        setCalculation(null);
      } finally {
        setIsCalculating(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [
    selectedPackage,
    numDirects,
    levelCounts,
    numLevels,
    clubJoins,
    autopoolCompletions,
    hasPackage1,
    showAdvanced,
    customDirectPercentages,
    customLevelPercentages,
    isOpen,
  ]);

  // Handle level count changes
  const handleLevelCountChange = (index, value) => {
    const newLevelCounts = [...levelCounts];
    newLevelCounts[index] = Math.max(0, parseInt(value, 10) || 0);
    setLevelCounts(newLevelCounts);
  };

  // Handle autopool completion changes
  const handleAutopoolChange = (index, value) => {
    const newCompletions = [...autopoolCompletions];
    newCompletions[index] = Math.max(0, parseInt(value, 10) || 0);
    setAutopoolCompletions(newCompletions);
  };

  // Handle custom percentage changes
  const handleDirectPercentageChange = (index, value) => {
    const newPercentages = [...customDirectPercentages];
    newPercentages[index] = Math.max(0, parseFloat(value) || 0);
    setCustomDirectPercentages(newPercentages);
  };

  const handleLevelPercentageChange = (index, value) => {
    const newPercentages = [...customLevelPercentages];
    newPercentages[index] = Math.max(0, parseFloat(value) || 0);
    setCustomLevelPercentages(newPercentages);
  };

  // Export calculation to JSON
  const exportToJSON = () => {
    if (!calculation) return;

    const exportData = {
      inputs: {
        selectedPackage,
        numDirects,
        levelCounts: levelCounts.slice(0, numLevels),
        clubJoins,
        autopoolCompletions,
        hasPackage1,
      },
      calculation,
      timestamp: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `mlm-income-calculation-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Reset form
  const resetForm = () => {
    setSelectedPackage(DEFAULT_PACKAGES[0] || { name: "Default", price: 0 });
    setNumDirects(0);
    setLevelCounts(Array.from({ length: 10 }).map(() => 0));
    setNumLevels(3);
    setClubJoins(0);
    setAutopoolCompletions([0, 0, 0]);
    setHasPackage1(true);
    setShowAdvanced(false);
    setCustomDirectPercentages(DEFAULT_CONFIG.directPercentages);
    setCustomLevelPercentages(DEFAULT_CONFIG.levelPercentages);
    setErrors({});
    setCalculation(null);
  };

  if (!isOpen) return null;

  return (
    <div className="relative w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400/20 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-400/20 rounded-full blur-2xl animate-pulse delay-2000" />
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-green-400/20 rounded-full blur-lg animate-pulse delay-3000" />
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-4000" />
        <div className="absolute top-20 right-1/2 w-20 h-20 bg-indigo-400/20 rounded-full blur-lg animate-pulse delay-5000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section (Left Column) */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Input Parameters
            </h3>

            {/* Package Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Selected Package
              </label>
              <select
                value={selectedPackage?.name}
                onChange={(e) => {
                  const pkg =
                    DEFAULT_PACKAGES.find((p) => p.name === e.target.value) ||
                    DEFAULT_PACKAGES[0];
                  setSelectedPackage(pkg);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-gray-800"
              >
                {DEFAULT_PACKAGES.map((pkg) => (
                  <option key={pkg.name} value={pkg.name}>
                    {pkg.name} - ${pkg.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Package-1 Eligibility */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="hasPackage1"
                checked={hasPackage1}
                onChange={(e) => setHasPackage1(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="hasPackage1"
                className="text-sm font-medium text-gray-800"
              >
                Has Package-1 (Required for income eligibility)
              </label>
              <div className="group relative">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Without Package-1, no income will be paid regardless of
                  calculations
                </div>
              </div>
            </div>

            {/* Direct Referrals */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Number of Direct Referrals (0-4)
              </label>
              <input
                type="number"
                min="0"
                max="4"
                value={numDirects}
                onChange={(e) =>
                  setNumDirects(
                    Math.max(0, Math.min(4, parseInt(e.target.value, 10) || 0))
                  )
                }
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-gray-800 ${
                  errors.numDirects ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.numDirects && (
                <p className="text-red-500 text-sm mt-1">{errors.numDirects}</p>
              )}
              <div className="mt-2 text-xs text-gray-500">
                Direct percentages:{" "}
                {DEFAULT_CONFIG.directPercentages.join("%, ")}%
              </div>
            </div>

            {/* Level Income */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-800">
                  Level Income
                </label>
                <div className="flex items-center space-x-2">
                  <label className="text-xs text-gray-600">Levels:</label>
                  <select
                    value={numLevels}
                    onChange={(e) => setNumLevels(parseInt(e.target.value, 10))}
                    className="text-xs border border-gray-300 rounded px-2 py-1 bg-white/80 backdrop-blur-sm text-gray-800"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                {Array.from({ length: numLevels }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <label className="text-sm text-gray-800 w-16">
                      Level {index + 1}:
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={levelCounts[index] || 0}
                      onChange={(e) =>
                        handleLevelCountChange(index, e.target.value)
                      }
                      className={`flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-gray-800 ${
                        errors[`levelCount_${index}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <span className="text-xs text-gray-600 w-12">
                      {DEFAULT_CONFIG.levelPercentages[index] || 0}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Club Bonus */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Club Joins
              </label>
              <input
                type="number"
                min="0"
                value={clubJoins}
                onChange={(e) =>
                  setClubJoins(Math.max(0, parseInt(e.target.value, 10) || 0))
                }
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-gray-800 ${
                  errors.clubJoins ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.clubJoins && (
                <p className="text-red-500 text-sm mt-1">{errors.clubJoins}</p>
              )}
              <div className="mt-2 text-xs text-gray-500">
                Bonus per join: ${DEFAULT_CONFIG.clubBonusPerJoin}
              </div>
            </div>

            {/* AutoPool */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                AutoPool Completions
              </label>
              <div className="space-y-2">
                {DEFAULT_CONFIG.autopool.poolSizes.map((poolSize, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <label className="text-sm text-gray-800 w-20">
                      Pool {index + 1}:
                    </label>
                    <span className="text-xs text-gray-600 w-12">
                      {poolSize} members
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={autopoolCompletions[index] || 0}
                      onChange={(e) =>
                        handleAutopoolChange(index, e.target.value)
                      }
                      className={`flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-gray-800 ${
                        errors[`autopool_${index}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <span className="text-xs text-gray-600 w-12">
                      ${DEFAULT_CONFIG.autopool.payouts[index] || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Configuration */}
            <div className="border-t pt-4">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
                type="button"
              >
                {showAdvanced ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                <span>Advanced Configuration</span>
              </button>

              {showAdvanced && (
                <div className="mt-4 space-y-4 p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Custom Direct Percentages
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {customDirectPercentages.map((percentage, index) => (
                        <input
                          key={index}
                          type="number"
                          step="0.1"
                          min="0"
                          value={percentage}
                          onChange={(e) =>
                            handleDirectPercentageChange(index, e.target.value)
                          }
                          className="p-2 border border-gray-300 rounded text-sm bg-white/80 backdrop-blur-sm text-gray-800"
                          placeholder={`Direct ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Custom Level Percentages
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {customLevelPercentages
                        .slice(0, 10)
                        .map((percentage, index) => (
                          <input
                            key={index}
                            type="number"
                            step="0.1"
                            min="0"
                            value={percentage}
                            onChange={(e) =>
                              handleLevelPercentageChange(index, e.target.value)
                            }
                            className="p-2 border border-gray-300 rounded text-sm bg-white/80 backdrop-blur-sm text-gray-800"
                            placeholder={`Level ${index + 1}`}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                type="button"
              >
                Reset
              </button>
              <button
                onClick={exportToJSON}
                disabled={!calculation}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                type="button"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON</span>
              </button>
            </div>
          </div>

          {/* Results Section (Right Column) */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Calculation Results
            </h3>

            {isCalculating && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                <p className="text-gray-500 mt-2">Calculating...</p>
              </div>
            )}

            {calculation && !isCalculating && (
              <div className="space-y-6">
                {/* Direct Income */}
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                  <h4 className="font-semibold text-teal-800 mb-3">
                    Direct Income
                  </h4>
                  {calculation.directIncome?.breakdown?.length > 0 ? (
                    <div className="space-y-2">
                      {calculation.directIncome.breakdown.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-700">
                            Direct {item.direct} ({item.percentage}%):
                          </span>
                          <span className="font-medium text-gray-900">
                            ${item.amount}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-teal-300 pt-2 flex justify-between font-semibold">
                        <span className="text-gray-800">Total Direct:</span>
                        <span className="text-gray-900">
                          ${calculation.directIncome.total}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No direct referrals</p>
                  )}
                </div>

                {/* Level Income */}
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-3">
                    Level Income
                  </h4>
                  {calculation.levelIncome?.breakdown?.length > 0 ? (
                    <div className="space-y-2">
                      {calculation.levelIncome.breakdown.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-700">
                            Level {item.level} ({item.count} × {item.percentage}
                            %):
                          </span>
                          <span className="font-medium text-gray-900">
                            ${item.amount}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-emerald-300 pt-2 flex justify-between font-semibold">
                        <span className="text-gray-800">Total Level:</span>
                        <span className="text-gray-900">
                          ${calculation.levelIncome.total}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No level income</p>
                  )}
                </div>

                {/* Club Bonus */}
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-3">
                    Club Bonus
                  </h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {calculation.clubBonus.joins} joins × $
                      {calculation.clubBonus.bonusPerJoin}:
                    </span>
                    <span className="font-medium text-gray-900">
                      ${calculation.clubBonus.total}
                    </span>
                  </div>
                </div>

                {/* AutoPool Income */}
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-800 mb-3">
                    AutoPool Income
                  </h4>
                  {calculation.autopoolIncome?.breakdown?.length > 0 ? (
                    <div className="space-y-2">
                      {calculation.autopoolIncome.breakdown.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-700">
                              Pool {item.level} ({item.completions} × $
                              {item.payout}):
                            </span>
                            <span className="font-medium text-gray-900">
                              ${item.amount}
                            </span>
                          </div>
                        )
                      )}
                      <div className="border-t border-indigo-300 pt-2 flex justify-between font-semibold">
                        <span className="text-gray-800">Total AutoPool:</span>
                        <span className="text-gray-900">
                          ${calculation.autopoolIncome.total}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No autopool completions
                    </p>
                  )}
                </div>

                {/* Totals */}
                <div className="bg-slate-100 p-6 rounded-lg border border-slate-300">
                  <h4 className="font-semibold text-slate-800 mb-4 text-center">
                    Income Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-800">Grand Total:</span>
                      <span className="font-bold text-teal-600">
                        ${calculation.totals.grandTotal}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-800">Payable Net:</span>
                      <span
                        className={`font-bold ${
                          calculation.totals.payableNet > 0
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        ${calculation.totals.payableNet}
                      </span>
                    </div>
                    {!calculation.eligibility?.hasPackage1 && (
                      <div className="text-center text-red-600 text-sm font-medium">
                        ⚠️ No income payable - Package-1 required
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {!calculation &&
              !isCalculating &&
              Object.keys(errors).length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">
                    Please fix the following errors:
                  </h4>
                  <ul className="text-sm text-red-600 space-y-1">
                    {Object.values(errors).map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeCalculator;
