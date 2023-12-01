import { createStore } from "@reduxjs/toolkit"


export const INCREMENENT = "increment"

const initialState = {counter: 0, showCounter: true}

const counterReducer = (state = initialState, action) => {

    if(action.type === INCREMENENT) {
    
        return {
    
            counter: state.counter + 1,

            showCounter: state.showCounter
        
        }
    
    }

    if(action.type === "increase") {
    
        return {
    
            counter: state.counter + action.amount,

            showCounter: state.showCounter
        
        }
    
    }

    if(action.type === "decrement") {
    
        return {
    
            counter: state.counter - 1,

            showCounter: state.showCounter
        
        }
    
    }

    if(action.type === "reset") {
    
        return {
    
            showCounter: !state.showCounter,

            counter: state.counter
        
        }
    
    }

    return state

}

const store = createStore(counterReducer)

export default store