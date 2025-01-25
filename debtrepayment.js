document.getElementById('add-loan').addEventListener('click', function() {
    const loanContainer = document.getElementById('loan-container');

    const newLoanGroup = document.createElement('div');
    newLoanGroup.classList.add('loan-input-group');
    newLoanGroup.innerHTML = `
        <input type="number" name="loans[]" placeholder="Loan amount" class="loan-input">
        <input type="number" name="interestRates[]" placeholder="Interest rate (%)" class="interest-rate-input" disabled>
        <button type="button" class="remove-loan">Remove</button>
    `;
    loanContainer.appendChild(newLoanGroup);

    const loanInput = newLoanGroup.querySelector('.loan-input');
    const interestRateInput = newLoanGroup.querySelector('.interest-rate-input');
    const removeButton = newLoanGroup.querySelector('.remove-loan');

    loanInput.addEventListener('input', function() {
        if (loanInput.value) {
            interestRateInput.disabled = false;
        } else {
            interestRateInput.value = '';
            interestRateInput.disabled = true;
        }
    });

    // Remove the loan group
    removeButton.addEventListener('click', function() {
        loanContainer.removeChild(newLoanGroup);
    });
});

const initialLoanInput = document.querySelector('.loan-input');
const initialInterestRateInput = document.querySelector('.interest-rate-input');

initialLoanInput.addEventListener('input', function() {
    if (initialLoanInput.value) {
        initialInterestRateInput.disabled = false;
    } else {
        initialInterestRateInput.value = '';
        initialInterestRateInput.disabled = true;
    }
});