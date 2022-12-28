let logo = document.querySelector('#logo')
let ccn = document.querySelector('#ccn')
let cardName = document.querySelector('#name')
let exp = document.querySelector('#expdate')
let cardContainer = document.querySelector('.card-container')
let cvvNumber = document.querySelector('#cvvNumber')
let form = document.querySelector('.form')

let fname = document.querySelector('#fname')
let fccn = document.querySelector('#fccn')
let fexp = document.querySelector('#fexp')
let fccv = document.querySelector('#fccv')
let submit = document.querySelector('button')

submit.disabled = true;

let validName = false;
let validCCN = false;
let validDate = false;
let validCVV = false;

let validForm = false;

//LUHN ALGORITHM
function luhn_checksum(code) {
    var len = code.length
    var parity = len % 2
    var sum = 0
    for (var i = len-1; i >= 0; i--) {
        var d = parseInt(code.charAt(i))
        if (i % 2 == parity) { d *= 2 }
        if (d > 9) { d -= 9 }
        sum += d
    }
    return sum % 10
}

//LUHN VALIDATE
function luhn_validate(fullcode) {
    return luhn_checksum(fullcode) == 0
}

function fadeAnimation() {
    logo.classList.remove('animated')
    
    setTimeout(() => {
        logo.classList.add('animated')
    }, 1)
}

function checkValid() {
    if (validName && validCCN && validDate && validCVV) {
        submit.disabled = false;
        submit.style.cursor = 'pointer'
        submit.style.animation = 'buttonColor 1s'
        submit.style.animationFillMode = 'forwards'
    } else {
        submit.disabled = true;
        submit.style.backgroundColor = 'gray'
    }
}



fname.addEventListener('input', () => {                      // NAME ON CARD
    checkValid();
    if (fname.value === '') {
        cardName.textContent = 'JOHN DOE'
    } else {
        let typedName = fname.value;
        cardName.textContent = typedName.toUpperCase();
    }

    if (fname.value.length >= 5) {
        validName = true;
        fname.style.border = '2px solid rgb(85, 211, 131)'
        changeToGreen()
    } else {
        validName = false;
        fname.style.border = '2px solid rgb(252, 21, 102)'
    }
})

fccn.addEventListener('input', () => {              //CREDIT CARD NUMBER
    checkValid()
    //invalid
    if (fccn.value.length >= 17 || fccn.value.match(/[a-z]/i)) {
        return false;
    }

    //display ccn
    if (!(fccn.value === '')) {
        ccn.textContent = fccn.value.match(/.{1,4}/g).join(' ')   
    } else {
        ccn.textContent = '•••• •••• •••• ••••';
        logo.src=''
    }

    //card type validation
    if (fccn.value.match(/3[47][0-9]{13}/) && luhn_validate(fccn.value)) {
        logo.src = 'images/amex.png'
        fadeAnimation()
        fccn.style.border = '2px solid rgb(85, 211, 131)'
        console.log('AMEX')
        validCCN = true;
    } else if (fccn.value.match(/65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})/) && luhn_validate(fccn.value)) {
        logo.src = 'images/discover.png'
        fadeAnimation()
        fccn.style.border = '2px solid rgb(85, 211, 131)'
        console.log('Discover')
        validCCN = true;
    } else if (fccn.value.match(/(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))/) && luhn_validate(fccn.value)) {
        logo.src = 'images/master.png'
        fadeAnimation()
        fccn.style.border = '2px solid rgb(85, 211, 131)'
        console.log('MasterCard')
        validCCN = true;
    } else if (fccn.value.match(/4[0-9]{15}?/) && luhn_validate(fccn.value)) {
        logo.src = 'images/visa.png'
        fadeAnimation()
        fccn.style.border = '2px solid rgb(85, 211, 131)'
        console.log('Visa')
        validCCN = true;
    } else {
        logo.src = ''
        fadeAnimation()
        fccn.style.border = '2px solid rgb(252, 21, 102)'
        validCCN = false;
    }
})

fexp.addEventListener('input', () => {               //Expiration Date
    checkValid()
    if (fexp.value === '') {
        exp.textContent = '01 / 23'
    } else if (fexp.value.includes('/')) {
        exp.textContent = fexp.value
    } else {
        exp.textContent = fexp.value.match(/.{1,2}/g).join(' / ')
    }
    let date = new Date()
    let currentMonth = date.getMonth() + 1
    let currentYear = date.getFullYear()
    
    if (parseInt(fexp.value.slice(2,4)) === parseInt(currentYear.toString().slice(2,4)) && (parseInt(fexp.value.slice(0,2) > parseInt(currentYear.toString().slice(0,2))))) {
        fexp.style.border = '2px solid rgb(85, 211, 131)'
        validDate = true
    } else if (parseInt(fexp.value.slice(2,4)) > parseInt(currentYear.toString().slice(2,4))) {
        fexp.style.border = '2px solid rgb(85, 211, 131)'
        validDate = true
    } else {
        fexp.style.border = '2px solid rgb(252, 21, 102)'
        validDate = false;
    }
})

fccv.addEventListener('input', () => {              // CVV
    checkValid();
    cvvNumber.textContent = fccv.value;
    cvvNumber.style.fontStyle = 'italic';

    if (fccv.value.length >= 3) {
        validCVV = true
        fccv.style.border = '2px solid rgb(85, 211, 131)'
    } else {
        validCVV = false
        fccv.style.border = '2px solid rgb(252, 21, 102)'
    }
})

submit.addEventListener('click', () => {
    checkValid()
    if (checkValid()) {
        form.submit();
    }
})

fname.addEventListener('click', () => {
    cardContainer.style.transform = ''
})

fccn.addEventListener('click', () => {
    cardContainer.style.transform = ''
})

fexp.addEventListener('click', () => {
    cardContainer.style.transform = ''
})

fccv.addEventListener('click', () => {
    cardContainer.style.transform = 'rotateY(180deg)'
})

