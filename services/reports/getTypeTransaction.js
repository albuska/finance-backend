const getTypeTransaction = (path) => {
        if (path.includes('expenses')) return 'expense';
        if(path.includes('income')) return 'income';
}

module.exports = getTypeTransaction
