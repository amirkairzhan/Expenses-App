let LIMIT = 10000;
let sum = 0;
const CURRENCY = 'тг';
const STATUS_IN_LIMIT = 'Все хорошо';
const STATUS_OUT_LIMIT = 'Лимит превышен.';
const STATUS_OUT_LIMIT_CLASSNAME = 'status_red';

//LIMIT POPUP - consts
const POPUP_OPENED_CLASSNAME = 'popup_open';
const BODY_FIXED_CLASSNAME = 'body_fixed';

const bodyNode = document.querySelector('body');
const popupNode = document.querySelector('.js-popup');
const popupBtnOpenNode = document.getElementById('popupOpenButton');
const popupContentNode = document.getElementById('js-popup__content')
const popupBtnCloseNode = document.getElementById('popupCloseButton');
const limitNode = document.getElementById('expensesLimit');
const inputLimitNode = document.getElementById('inputLimit');
const addLimitButtonNode = document.getElementById('addLimitButton');

//MAIN - consts
const inputNode = document.getElementById('inputExpense');
const categoryNode = document.getElementById('categoryExpense');
const addExpenseButtonNode = document.getElementById('addButton');
const expensesNode = document.getElementById('expenses');
const sumNode = document.getElementById('expensesSum');
const statusNode = document.getElementById('expensesStatus');
const restartButtonNode = document.getElementById('restartButton');

let expenses = [];

limitNode.innerHTML = LIMIT + CURRENCY;
sumNode.innerHTML = sum + CURRENCY;

//LIMIT POPUP - code
popupBtnOpenNode.addEventListener('click', togglePopup);
popupBtnCloseNode.addEventListener('click', togglePopup);

popupNode.addEventListener('click', (event) => {
    const isClickOutsideContent = !event.composedPath().includes(popupContentNode)

    if (isClickOutsideContent) {
        togglePopup();
    }
})

function togglePopup() {
    popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
    bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);
}

//MAIN - code
addLimitButtonNode.addEventListener('click', function () {
    getLimitFromUser();

    renderStatus(sum);
});

function getLimitFromUser() {
    if (inputLimitNode.value === '') {
        return;
    }

    LIMIT = parseInt(inputLimitNode.value);
    localStorage.setItem('limit', LIMIT);

    inputLimitNode.value = '';

    limitNode.innerText = LIMIT + CURRENCY;

    togglePopup();
};


addExpenseButtonNode.addEventListener('click', function () {
    getExpenseFromUser();

    render(expenses);
});

function getExpenseFromUser() {
    if (inputNode.value === '') {
        return;
    }

    const expense = { number: parseInt(inputNode.value), category: categoryNode.value };

    expenses.push(expense);

    inputNode.value = '';
};

function calculateSum(expenses) {
    let sum = 0;

    expenses.forEach(i => {
        sum += i.number;
    });

    return sum;
};

function render(expenses) {
    sum = calculateSum(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
}

function renderHistory(expenses) {
    let expensesHTML = '';

    expenses.forEach(i => {
        expensesHTML += `<p class="expense">${expenses.indexOf(i) + 1}. ${i.number + CURRENCY} - ${i.category}</p>`;
    });

    expensesNode.innerHTML = expensesHTML;
};

function renderSum(sum) {
    sumNode.innerHTML = sum + CURRENCY;
}

function renderStatus(sum) {
    if (sum <= LIMIT) {
        statusNode.innerHTML = STATUS_IN_LIMIT;
        statusNode.classList.remove(STATUS_OUT_LIMIT_CLASSNAME);
    } else {
        statusNode.innerHTML = STATUS_OUT_LIMIT + `(${LIMIT - sum}${CURRENCY})`;
        statusNode.classList.add(STATUS_OUT_LIMIT_CLASSNAME);
    }
}


restartButtonNode.addEventListener('click', function () {
    expenses = [];
    render(expenses);
},);