const displayINRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-RW',{
        style : "currency",
        currency : 'RWF',
        minimumFractionDigits : 2
    })

    return formatter.format(num)

}

export default displayINRCurrency