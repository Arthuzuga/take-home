export const formatMoney = (value: string): string => {
    const newValue = value.replace(/\D/g,"") // remove letters and special characters
    const formatNumber = Number(newValue)/100 // convert to cents
    const valueOnString = formatNumber.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace("$","");
    return valueOnString
  }
