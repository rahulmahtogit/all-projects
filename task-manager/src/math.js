const calculateTip = function(total,tipPercent){
    const tip = total*tipPercent
    return total + tip
}

const celsiusToFarenheit = (temp)=>{
return (temp*1.8) + 32
}


module.exports = {
    calculateTip,celsiusToFarenheit
}