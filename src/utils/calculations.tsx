function validateMath(values: any, name: string) {
    const newValue = { ...values, qty: values.qty && parseFloat(values.qty) > 0 ? parseFloat(values.qty) : null, unitprice: parseFloat(values.unitprice) || null, tax: parseFloat(values.tax) || null, amount: parseFloat(values.amount) || null };
    switch (name) {
        case "qty": updateAmount(newValue);
            break;
        case "unitprice": updateAmount(newValue);
            break;
        case "tax": updateAmount(newValue);
            break;
        case "amount": updateUnitPrice(newValue);
            break;
    }
    return newValue;
}

function updateAmount(values: any) {
    const qty = values.qty || 1;
    // (qty * unitprice)  + ((qty * unitprice) * (tax/100))
    values.amount = ((qty * values.unitprice) + ((qty * values.unitprice) * (values.tax / 100))).toFixed(2);
}

function updateUnitPrice(values: any) {
    const qty = values.qty || 1;
    // (amount/qty) /(1+tax)
    values.unitprice = ((values.amount / qty) / (1 + (values.tax / 100))).toFixed(2);
}

function handleTotals(items: any) {
    let TOTAL = 0;
    let AMOUNT = 0;
    let TAX = 0;
    items.forEach((o: any) => {
        const values = { qty: parseFloat(o.qty) || 1, unitprice: parseFloat(o.unitprice) || 0, tax: parseFloat(o.tax) || 0, amount: parseFloat(o.amount) || 0 };
        AMOUNT += parseFloat(((values.qty * values.unitprice)).toFixed(2));
        TAX += parseFloat((((values.qty * values.unitprice) * (values.tax / 100))).toFixed(2));
        TOTAL += parseFloat((values.amount).toFixed(2));
    });
    // return [parseFloat(AMOUNT.toFixed(2)), parseFloat(TAX.toFixed(2)), parseFloat(TOTAL.toFixed(2))];
    return [AMOUNT.toFixed(2), TAX.toFixed(2), TOTAL.toFixed(2)];
}

export { validateMath, handleTotals };