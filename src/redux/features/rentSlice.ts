import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RentResponse } from "../../../interface"

type RentState = {
    rentItems: RentResponse[]
}

const initialState: RentState = { rentItems: []}

export const rentSlice = createSlice ({
    name: "Rent",
    initialState,
    reducers: {
        addBooking: (state, action:PayloadAction<RentResponse>)=>{
            const duplicateIndex = state.rentItems.findIndex(obj => 
                obj.carRental === action.payload.carRental &&
                obj.car === action.payload.car
            )
            if(duplicateIndex === -1) {
                state.rentItems.push(action.payload)
            } else {
                state.rentItems[duplicateIndex] = action.payload
            }
        },
        removeBooking: (state, action:PayloadAction<RentResponse>)=> {
            const remainItems = state.rentItems.filter( obj => {
                return ((obj._id !== action.payload._id))
            })
            state.rentItems = remainItems
        }
    }
})

export const { addBooking, removeBooking } = rentSlice.actions
export default rentSlice.reducer