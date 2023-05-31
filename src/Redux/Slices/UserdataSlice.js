import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({

    name: 'userData',

    initialState: {

        users: []

    },

    reducers : {
        
        addUserData(state, action) {

            if(action.payload.gender === "male" ) {
                console.log('IN male')
                action.payload.avtar = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fmale-avatar_93&psig=AOvVaw3xsREYTJ0DuWNbsmP25FLg&ust=1685525848146000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCICZ5Z7fnP8CFQAAAAAdAAAAABAD"
            }
            else if(action.payload?.gender === "Female") {
                console.log('IN female')
                action.payload.avtar = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fuxwing.com%2Ffemale-user-icon&psig=AOvVaw0pkcUjOiDRvjP4v7biAFIV&ust=1685526056563000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMC6jYTgnP8CFQAAAAAdAAAAABAD"
            }

            state.userDetail = { ...action.payload }

        },

        addUsers(state,action) {
            state.users.push(action.payload);
        }
    }
});

export const { addUserData, addUsers } = userDataSlice.actions;
export default userDataSlice.reducer;