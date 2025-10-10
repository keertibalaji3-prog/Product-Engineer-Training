function calculateInterest() {  
    const principal = parseFloat(document.getElementById('principal').value);
    // const rate = parseFloat(document.getElementById('rate').value);
    const time = parseFloat(document.getElementById('time').value);

    let rate;

    if (isNaN(principal) || isNaN(time)) {
        alert('Please enter valid numbers in all fields');
        return;

    }
    
    if (principal <= 0 || time <= 0) {
        alert('Please enter positive values');
        return;
    }

    if (principal > 10000 || principal < 500) {
        return alert(`prinicipal should be between 500 and 10000`);
    }

    if (principal < 1000) {
        rate = 5;
    }
    else if (principal >= 1000 && principal <= 5000){
        rate = 7;
    }
    else {
        rate = 10;
    }

    let bonus = 0;
    if (time > 5) {
        bonus = 2;
        rate += bonus;
    }

    const interest = (principal * rate * time) / 100;
    const totalAmount = principal + interest;
    
    document.getElementById('interest').textContent = interest.toFixed(2);
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);



    //   const monthlyInterest = interest / (time * 12);
    //   const effectiveRate = ((totalAmount - principal) / principal * 100).toFixed(2);
    //   document.getElementById('additionalInfo').textContent = 
    //   `Monthly Interest: ${monthlyInterest.toFixed(2)} | Effective Rate: ${effectiveRate}%`;

}



