import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/button/Button'
import Display from '../components/display/Display'


const initialState = {
    valueDisplay: '0',
    operator: null,
    values: [ 0, 0 ],
    currentIndex: 0,
}

class Calculator extends Component {

    state = initialState

    constructor(props) {
        super(props)

        this.setNumber = this.setNumber.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.clearMemory = this.clearMemory.bind(this)
    }

    setNumber(number) {
        if(number === '.' && this.state.valueDisplay.includes('.')) {
            return 0
        }

        let newValue = ''
        if(number === '.') {
            newValue = this.state.valueDisplay + number
        } else {
            newValue = this.state.valueDisplay === '0' ? number 
                : this.state.valueDisplay + number
        }
        this.setState({ valueDisplay: newValue })

        if(number !== '.') {
            const currentIndex = this.state.currentIndex

            let values = [ ...this.state.values ]
            values[currentIndex] = parseFloat(newValue)

            this.setState({ values })
        }
        console.log(this.state);
    }

    setOperation(operator) {
        const newOperator = operator
        const oldOperator = this.state.operator

        if(newOperator === '=' && this.state.currentIndex === 0) {
            return 0
        }
        if(this.state.currentIndex == 0) {
            if(newOperator !== '=') {
                this.setState({ 
                    operator: newOperator, 
                    currentIndex: 1, 
                })
            }
        } else if(this.state.currentIndex === 1) {
            let newValue = this.state.values[0]

            if(oldOperator === '=') {
                this.setState({ operator: newOperator })
            } else {
                switch(oldOperator) {
                case '+':
                    newValue = this.state.values[0] + this.state.values[1]
                    break
                case '-':
                    newValue = this.state.values[0] - this.state.values[1]
                    break
                case '*':
                    newValue = this.state.values[0] * this.state.values[1]
                    break
                case '/':
                    newValue = this.state.values[0] / this.state.values[1]
                    break
                }

                const values = [ newValue, 0 ]

                this.setState({ 
                    values: values,
                    valueDisplay: parseFloat(newValue),
                    operator: newOperator,
                })
            }
        }
    }

    clearMemory() {
        this.setState(initialState)
        console.log('clear');
    }

    render() {
        return (
            <div className="Calculator">
                <Display display={ this.state.valueDisplay } />
                <Button label="C" click={ this.clearMemory } triple />
                <Button label="/" click={ this.setOperation } operation />
                <Button label="7" click={ this.setNumber } />
                <Button label="8" click={ this.setNumber } />
                <Button label="9" click={ this.setNumber } />
                <Button label="*" click={ this.setOperation } operation />
                <Button label="4" click={ this.setNumber } />
                <Button label="5" click={ this.setNumber } />
                <Button label="6" click={ this.setNumber } />
                <Button label="-" click={ this.setOperation } operation />
                <Button label="1" click={ this.setNumber } />
                <Button label="2" click={ this.setNumber } />
                <Button label="3" click={ this.setNumber } />
                <Button label="+" click={ this.setOperation } operation />
                <Button label="0" click={ this.setNumber } double />
                <Button label="." click={ this.setNumber } />
                <Button label="=" click={ this.setOperation } operation />
            </div>
        )
    }
}

export default Calculator