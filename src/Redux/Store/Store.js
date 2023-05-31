import { configureStore } from "@reduxjs/toolkit";

import UserdataSlice from "../Slices/UserdataSlice";

const store = configureStore({

    reducer: {
        
        userData: UserdataSlice

    }
});


export default store;