class Calcutator{
    constructor(previousOperandButtonTextEmlement,currentOperandButtonTextEmlement){
        this.previousOperandButtonTextEmlement = previousOperandButtonTextEmlement
        this.currentOperandButtonTextEmlement = currentOperandButtonTextEmlement
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand =''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
    appendNumber(number){
        if(number == '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }
    chooseOperation(operation){
        if(this.currentOperand == '') return
        if(this.previousOperand != ''){
            this.compute()
        }
        this.operation =operation
        this.previousOperand =this.currentOperand
        this.currentOperand = ''
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand =computation
        this.operation = undefined
        this.previousOperand =''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDights = parseFloat(stringNumber.split('.')[0])
        const decimalDights = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDights)){
            integerDisplay =''
        }else{
            integerDisplay = integerDights.toLocaleString('en',{
            maximumFractionDigits: 0})
        }
        if(decimalDights != null){
            return `${integerDisplay}.${decimalDights}`
        } else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandButtonTextEmlement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandButtonTextEmlement.innerText =  
            ` ${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandButtonTextEmlement.innerText = ''
        }
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandButtonTextEmlement = document.querySelector('[data-previous-operand]')
const currentOperandButtonTextEmlement = document.querySelector('[data-current-operand]')

const clacutator = new Calcutator(previousOperandButtonTextEmlement, currentOperandButtonTextEmlement)

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        clacutator.appendNumber(button.innerText)
        clacutator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        clacutator.chooseOperation(button.innerText)
        clacutator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button=>{
    clacutator.compute()
    clacutator.updateDisplay()
})

allClearButton.addEventListener('click', button=>{
    clacutator.clear()
    clacutator.updateDisplay()
})

deleteButton.addEventListener('click', button=>{
    clacutator.delete()
    clacutator.updateDisplay()
})