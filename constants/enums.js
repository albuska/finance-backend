const categoryOfExpensesEnum = {
    TRANSPORT: 'Transport',
    PRODUCTS: 'Products',
    HEALTH: 'Health',
    ALCOHOL: 'Alcohol',
    ENTERTAINMENT: 'Entertainment',
    HOUSING: 'Housing',
    TECHNIQUE: 'Technique',
    COMMUNAL: 'Communal, communication',
    SPORTS_HOBBIES: 'Sports, hobbies',
    EDUCATION: 'Education',
    OTHER: 'Other'
}

const categoryOfIncomeEnum = {
    SALARY: 'Salary',
    OTHER_INCOME: 'Other income',

}


const typeOfTransactionEnum = {
    INCOME: 'income',
    EXPENSES: 'expense'
}

const REFRESH_TOKEN_COOKIE = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: 'None'
}

module.exports = {
    categoryOfExpensesEnum,
    categoryOfIncomeEnum,
    typeOfTransactionEnum,
    REFRESH_TOKEN_COOKIE
}