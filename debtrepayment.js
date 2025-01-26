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

document.getElementById('inputForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    console.log("test");
    const formData = {
        income: document.getElementById('income').value,
        loan: document.getElementById('loans').value,
        interestRate: document.getElementById('interestRates').value,
        compoundRate: document.getElementById('numInt').value,
        numYear:document.getElementById('numYear').value,
    };

    console.log("formData", formData);

    const response = await fetch('https://qr7h5xifmzlvumrz6hcdilbf6a0xtkge.lambda-url.us-west-2.on.aws/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'income': document.getElementById('income').value,
            'loan': document.getElementById('loans').value,
            'interestRate': document.getElementById('interestRates').value,
            'compoundRate': document.getElementById('numInt').value,
            'numYear':document.getElementById('numYear').value,
        },
        body: formData, // Convert the data to JSON
    })
    .then((response) => response.json()) // Parse the JSON response
    .then((json) => {
        console.log(json);  // Handle response from Lambda

        
        // Display the result on the page
        const resultMessage = `
            <p>Monthly Amount: $${parseFloat(json.amtMonthly).toFixed(2)}</p>
            <p>Percent Savings: ${parseFloat(json.perSavings).toFixed(2)}%</p>
        `;
        document.getElementById("result-message").innerHTML = resultMessage;
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById("result-message").textContent = 'An error occurred. Please try again.';
    });
});