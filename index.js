const BRACKET_SIZE = 250000;

let incomeTF = document.querySelector("#totalIncome");
let deductionsTF = document.querySelector("#totalDeductions");

incomeTF.addEventListener("input", () => updateUI());
deductionsTF.addEventListener("input", () => updateUI());

function oldTax(income, deductions) {
  let taxableIncome = income - deductions;
  console.log("taxableIncome: ", taxableIncome);
  if (deductions > income) taxableIncome = 0;
  if (deductions < 0) taxableIncome = income;

  let tax = 0;
  let bracket = "0L-5L";

  if (taxableIncome > 500000 && taxableIncome <= 750000) {
    tax = BRACKET_SIZE * 0.05 + (taxableIncome - 500000) * 0.2;
    bracket = "5L-7.5L";
  } else if (taxableIncome > 750000 && taxableIncome <= 1000000) {
    tax =
      BRACKET_SIZE * 0.05 + BRACKET_SIZE * 0.2 + (taxableIncome - 750000) * 0.2;
    bracket = "7.5L-10L";
  } else if (taxableIncome > 1000000 && taxableIncome <= 1250000) {
    tax =
      BRACKET_SIZE * 0.05 +
      BRACKET_SIZE * 0.2 +
      BRACKET_SIZE * 0.2 +
      (taxableIncome - 1000000) * 0.3;
    bracket = "10L-12.5L";
  } else if (taxableIncome > 1250000 && taxableIncome <= 1500000) {
    tax =
      BRACKET_SIZE * 0.05 +
      BRACKET_SIZE * 0.2 +
      BRACKET_SIZE * 0.2 +
      BRACKET_SIZE * 0.3 +
      (taxableIncome - 1250000) * 0.3;
    bracket = "12.5L-15L";
  } else if (taxableIncome > 1500000) {
    tax =
      BRACKET_SIZE * 0.05 +
      BRACKET_SIZE * 0.2 +
      BRACKET_SIZE * 0.2 +
      BRACKET_SIZE * 0.3 +
      BRACKET_SIZE * 0.3 +
      (taxableIncome - 1500000) * 0.3;

    bracket = ">15L";
  }

  return {
    tax,
    bracket,
  };
}

function newTax(income) {
  let tax = 0;
  let bracket = "0L-5L";

  if (income > 500000 && income <= 750000) {
    tax = BRACKET_SIZE * 0.05 + (income - 500000) * 0.1;
    bracket = "5L-7.5L";
  } else if (income > 750000 && income <= 1000000) {
    tax = BRACKET_SIZE * 0.05 + BRACKET_SIZE * 0.1 + (income - 750000) * 0.15;
    bracket = "7.5L-10L";
  } else if (income > 1000000 && income <= 1250000) {
    tax =
      BRACKET_SIZE * 0.05 +
      BRACKET_SIZE * 0.1 +
      BRACKET_SIZE * 0.15 +
      (income - 1000000) * 0.2;
    bracket = "10L-12.5L";
  } else if (income > 1250000 && income <= 1500000) {
    tax =
      BRACKET_SIZE * 0.05 +
      BRACKET_SIZE * 0.1 +
      BRACKET_SIZE * 0.15 +
      BRACKET_SIZE * 0.2 +
      (income - 1250000) * 0.25;
    bracket = "12.5L-15L";
  } else if (income > 1500000) {
    tax =
      BRACKET_SIZE * 0.05 +
      BRACKET_SIZE * 0.1 +
      BRACKET_SIZE * 0.15 +
      BRACKET_SIZE * 0.2 +
      BRACKET_SIZE * 0.25 +
      (income - 1500000) * 0.3;
    bracket = ">15L";
  }

  return {
    tax,
    bracket,
  };
}

function updateUI() {
  let oldTaxText = document.querySelector("#oldTax");
  let newTaxText = document.querySelector("#newTax");
  let taxBracketText = document.querySelector("#taxBracket");
  let taxBracketDiffText = document.querySelector("#taxBracketDiff");

  let income = parseInt(incomeTF.value);
  let deductions = isNaN(parseInt(deductionsTF.value))
    ? 0
    : parseInt(deductionsTF.value);
  console.log("calculating: ", income, deductions);
  let OT = oldTax(income, deductions);
  let NT = newTax(income);
  console.log(OT, NT);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  oldTaxText.innerHTML = `OLD TAX: ${formatter.format(OT.tax)}`;
  newTaxText.innerHTML = `NEW TAX: ${formatter.format(NT.tax)}`;
  taxBracketText.innerHTML = `OLD: ${OT.bracket} | NEW: ${NT.bracket}`;

  if (OT.tax > NT.tax) {
    oldTaxText.style.color = "red";
    newTaxText.style.color = "green";
    taxBracketDiffText.innerHTML = `TAX SAVED: ${formatter.format(
      OT.tax - NT.tax
    )}`;
  } else if (OT.tax < NT.tax) {
    oldTaxText.style.color = "green";
    newTaxText.style.color = "red";
    taxBracketDiffText.innerHTML = `TAX SAVED: ${formatter.format(
      NT.tax - OT.tax
    )}`;
  }
}
