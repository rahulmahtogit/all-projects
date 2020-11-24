const { TestScheduler } = require('jest')
const {calculateTip,celsiusToFarenheit} = require('../src/math')

test('Calc',()=>{
   const total = calculateTip(10,.3)
   if(total !== 13){
       throw new Error("Total should be 13. Got" + total)
   }
})

test('CalcTemp',()=>{
    const incel = celsiusToFarenheit(100)
    if(incel !== 212){
        throw new Error("Total Should be 212 Got " + incel)
    }

})

// test('Hello World',()=>{

// })

// test('',()=>{
//     throw new Error("Some errer")
// })