const displayRWFCurrency = (value) => {
    const formatter = new Intl.NumberFormat("en-RW", {
        style: "currency",
        currency: "RWF",
        minimumFractionDigits: 0,
    });
    return formatter.format(value);
};

export default displayRWFCurrency;
