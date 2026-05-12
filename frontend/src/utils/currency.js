// Simple currency helper to format USD prices into INR for display
const DEFAULT_USD_TO_INR = 82.0; // change if you want a different conversion rate

export function formatINR(usdValue, { rate = DEFAULT_USD_TO_INR, withSymbol = true } = {}) {
  const inr = Number(usdValue) * rate;
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(inr);
  } catch (e) {
    const symbol = withSymbol ? '₹' : '';
    return `${symbol}${inr.toFixed(2)}`;
  }
}

export default formatINR;
