import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    users:[],
    token:'',
    isLoggedIn:false,
    currentUser: null, 
    loginError:null,
    purchasedPolicy:[],
    claimRequest:[],
    formState:''
}
//thunk function for submiting the purchase form
export const purchasePolicy = createAsyncThunk('user/purchasePolicy',
  async (formData,{rejectWithValue}) => { 
    try {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(formData)
        },1000)
    })
    } catch (error) {
     return  rejectWithValue("Failed to purchase policy")
    }
      
  }
)
//thunk function for claim file
export const fileClaim = createAsyncThunk('user/fileClaim',
  async (claimData,{rejectWithValue}) => { 
    try {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(claimData)
        },1000)
    })
    } catch (error) {
     return  rejectWithValue("Failed to claim filing")
    }
      
  }
)

const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signUp:(state,action) => { 
          return {
            ...state,
           users:[...state.users,action.payload]
          } 
        },
        login:(state,action) => { 
          const { email,password } = action.payload;
          const user = state.users.find((user) => user.email === email && user.password === password)
          if(user){
            state.currentUser = user;
            state.isLoggedIn = true;
            state.loginError = null
          }else{
            state.isLoggedIn = false;
            state.loginError = "Invalid Username and password"
          }
        },
        logout:(state) => {
            state.currentUser = null;
            state.isLoggedIn = false;
        },
        payment:(state,action) => {
          const {policyId,userEmail} = action.payload;
          const policyUser =  state.purchasedPolicy.find((policy) => policy.policyNumber === Number(policyId) && policy.userEmail === userEmail)
          console.log(policyUser)
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(purchasePolicy.pending,(state,action) => {
          state.formState = "Loading"
        })
        .addCase(purchasePolicy.fulfilled,(state,action) => {
           state.formState = "Success"
           state.purchasedPolicy.push(action.payload)
        })
        .addCase(purchasePolicy.rejected,(state,action) => {
           state.formState = "Error"
        })
        .addCase(fileClaim.pending,(state,action) => {
          state.formState = "Loading"
        })
        .addCase(fileClaim.fulfilled,(state,action) => {
           state.formState = "Success"
           state.claimRequest.push(action.payload)
        })
        .addCase(fileClaim.rejected,(state,action) => {
           state.formState = "Error"
        })
    }
})

export const{signUp,login,logout,payment} = UserSlice.actions

export default UserSlice.reducer