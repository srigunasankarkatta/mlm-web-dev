/**
 * MLM Income Calculator Utility Functions
 *
 * This module contains the core calculation logic for MLM income computation.
 * All business rules are driven by configuration objects to ensure maintainability.
 */

/**
 * Default configuration for MLM income calculations
 */
export const DEFAULT_CONFIG = {
  directPercentages: [6, 9, 12, 15],
  levelPercentages: [5, 4, 3, 2, 1, 0.5, 0.5, 0.5, 0.25, 0.25],
  clubBonusPerJoin: 0.5,
  autopool: {
    poolSizes: [4, 16, 64],
    payouts: [5, 10, 20],
  },
};

/**
 * Default packages array
 */
export const DEFAULT_PACKAGES = [
  { name: "Package-1", price: 20 },
  { name: "Package-2", price: 40 },
  { name: "Package-3", price: 80 },
  { name: "Package-4", price: 160 },
  { name: "Package-5", price: 320 },
];

/**
 * Validates input values and returns error messages
 * @param {Object} inputs - Input values to validate
 * @returns {Object} - Object containing validation errors
 */
export function validateInputs(inputs) {
  const errors = {};

  // Validate number of directs (0-4)
  if (inputs.numDirects < 0 || inputs.numDirects > 4) {
    errors.numDirects = "Number of directs must be between 0 and 4";
  }

  // Validate level counts (non-negative integers)
  if (inputs.levelCounts) {
    inputs.levelCounts.forEach((count, index) => {
      if (count < 0 || !Number.isInteger(count)) {
        errors[`levelCount_${index}`] =
          "Level count must be a non-negative integer";
      }
    });
  }

  // Validate club joins (non-negative)
  if (inputs.clubJoins < 0) {
    errors.clubJoins = "Club joins must be non-negative";
  }

  // Validate autopool completions (non-negative)
  if (inputs.autopoolCompletions) {
    inputs.autopoolCompletions.forEach((completion, index) => {
      if (completion < 0 || !Number.isInteger(completion)) {
        errors[`autopool_${index}`] =
          "Autopool completion must be a non-negative integer";
      }
    });
  }

  return errors;
}

/**
 * Calculates direct income breakdown
 * @param {number} numDirects - Number of direct referrals (0-4)
 * @param {number} packagePrice - Price of the selected package
 * @param {Array} directPercentages - Array of direct percentages
 * @returns {Object} - Direct income breakdown
 */
function calculateDirectIncome(numDirects, packagePrice, directPercentages) {
  const breakdown = [];
  let total = 0;

  for (let i = 0; i < numDirects; i++) {
    const percentage = directPercentages[i] || 0;
    const amount = (packagePrice * percentage) / 100;
    breakdown.push({
      direct: i + 1,
      percentage,
      amount: parseFloat(amount.toFixed(2)),
    });
    total += amount;
  }

  return {
    breakdown,
    total: parseFloat(total.toFixed(2)),
  };
}

/**
 * Calculates level income breakdown
 * @param {Array} levelCounts - Array of counts for each level
 * @param {number} packagePrice - Price of the selected package
 * @param {Array} levelPercentages - Array of level percentages
 * @returns {Object} - Level income breakdown
 */
function calculateLevelIncome(levelCounts, packagePrice, levelPercentages) {
  const breakdown = [];
  let total = 0;

  levelCounts.forEach((count, index) => {
    const percentage = levelPercentages[index] || 0;
    const amount = (count * (packagePrice * percentage)) / 100;
    breakdown.push({
      level: index + 1,
      count,
      percentage,
      amount: parseFloat(amount.toFixed(2)),
    });
    total += amount;
  });

  return {
    breakdown,
    total: parseFloat(total.toFixed(2)),
  };
}

/**
 * Calculates club bonus
 * @param {number} clubJoins - Number of new club joins
 * @param {number} clubBonusPerJoin - Bonus amount per join
 * @returns {number} - Total club bonus
 */
function calculateClubBonus(clubJoins, clubBonusPerJoin) {
  return parseFloat((clubJoins * clubBonusPerJoin).toFixed(2));
}

/**
 * Calculates autopool income
 * @param {Array} completions - Array of completions per pool level
 * @param {Array} poolSizes - Array of pool sizes
 * @param {Array} payouts - Array of payouts per pool
 * @returns {Object} - Autopool income breakdown
 */
function calculateAutopoolIncome(completions, poolSizes, payouts) {
  const breakdown = [];
  let total = 0;

  completions.forEach((completion, index) => {
    const poolSize = poolSizes[index] || 0;
    const payout = payouts[index] || 0;
    const amount = completion * payout;
    breakdown.push({
      level: index + 1,
      poolSize,
      completions: completion,
      payout,
      amount: parseFloat(amount.toFixed(2)),
    });
    total += amount;
  });

  return {
    breakdown,
    total: parseFloat(total.toFixed(2)),
  };
}

/**
 * Main income calculation function
 * @param {Object} inputs - Input parameters
 * @param {Object} config - Configuration object (optional, uses DEFAULT_CONFIG if not provided)
 * @returns {Object} - Complete income calculation result
 */
export function computeIncome(inputs, config = DEFAULT_CONFIG) {
  const {
    selectedPackage,
    numDirects = 0,
    levelCounts = [],
    clubJoins = 0,
    autopoolCompletions = [],
    hasPackage1 = true,
    customDirectPercentages,
    customLevelPercentages,
  } = inputs;

  // Use custom percentages if provided, otherwise use config
  const directPercentages = customDirectPercentages || config.directPercentages;
  const levelPercentages = customLevelPercentages || config.levelPercentages;
  const clubBonusPerJoin = config.clubBonusPerJoin;
  const autopool = config.autopool;

  // Calculate each income type
  const directIncome = calculateDirectIncome(
    numDirects,
    selectedPackage?.price || 0,
    directPercentages
  );

  const levelIncome = calculateLevelIncome(
    levelCounts,
    selectedPackage?.price || 0,
    levelPercentages
  );

  const clubBonus = calculateClubBonus(clubJoins, clubBonusPerJoin);

  const autopoolIncome = calculateAutopoolIncome(
    autopoolCompletions,
    autopool.poolSizes,
    autopool.payouts
  );

  // Calculate totals
  const grandTotal =
    directIncome.total + levelIncome.total + clubBonus + autopoolIncome.total;
  const payableNet = hasPackage1 ? grandTotal : 0;

  return {
    directIncome,
    levelIncome,
    clubBonus: {
      joins: clubJoins,
      bonusPerJoin: clubBonusPerJoin,
      total: clubBonus,
    },
    autopoolIncome,
    totals: {
      grandTotal: parseFloat(grandTotal.toFixed(2)),
      payableNet: parseFloat(payableNet.toFixed(2)),
    },
    eligibility: {
      hasPackage1,
      isEligible: hasPackage1,
    },
  };
}

/**
 * Unit test examples for computeIncome function
 *
 * Example 1: Basic calculation with Package-1
 * const result = computeIncome({
 *   selectedPackage: { name: 'Package-1', price: 20 },
 *   numDirects: 2,
 *   levelCounts: [5, 3, 1],
 *   clubJoins: 10,
 *   autopoolCompletions: [1, 0, 0],
 *   hasPackage1: true
 * });
 * Expected: Direct income for 2 directs (6% + 9% of $20), level income for 3 levels, etc.
 *
 * Example 2: No Package-1 eligibility
 * const result = computeIncome({
 *   selectedPackage: { name: 'Package-2', price: 40 },
 *   numDirects: 4,
 *   levelCounts: [10, 5, 2],
 *   clubJoins: 20,
 *   autopoolCompletions: [2, 1, 0],
 *   hasPackage1: false
 * });
 * Expected: All calculations done but payableNet = 0 due to no Package-1
 *
 * Example 3: Custom percentages
 * const result = computeIncome({
 *   selectedPackage: { name: 'Package-1', price: 20 },
 *   numDirects: 3,
 *   levelCounts: [8, 4],
 *   clubJoins: 15,
 *   autopoolCompletions: [1, 1, 0],
 *   hasPackage1: true,
 *   customDirectPercentages: [8, 10, 12, 14],
 *   customLevelPercentages: [6, 4, 2, 1]
 * });
 * Expected: Uses custom percentages instead of default config
 */
