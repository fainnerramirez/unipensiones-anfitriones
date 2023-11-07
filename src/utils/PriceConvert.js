export const ConvertPrice = (price) => {
    const formattedValue = price.replace(/[\.,]/g, '');
    const formattedNumber = new Intl.NumberFormat('es-ES').format(formattedValue);
    return formattedNumber;
}