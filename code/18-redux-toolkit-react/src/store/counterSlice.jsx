import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = {counter: 0, showCounter: true}

const counterSlice = createSlice({

    name: "counter",

    initialCounterState,

    reducers: {
    
        increment(state) {
        
            state.counter + 1
        
        },

        decrement(state) {
            
            state.counter - 1
        
        },

        increase(state, action) {
        
            state.counter = state.counter + action.payload
        
        },

        reset(state) {
        
            state.counter = !state.showCounter
        
        },
        
    }

})

export const counterActions = counterSlice.actions

export default counterSlice