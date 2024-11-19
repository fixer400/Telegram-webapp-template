import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const getToken = createAsyncThunk('api/token', async (data:any, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/users/token/`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  } catch (error:any) {
    console.error('Ошибка во время выполнения запроса:', error)
    return rejectWithValue(error.response ? error.response.data : error.message)
  }
})

export const getUser = createAsyncThunk('api/user', async (data:any, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/users/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
    })
    return response.data
  } catch (error:any) {
    console.error('Ошибка во время выполнения запроса:', error)
    return rejectWithValue(error.response ? error.response.data : error.message)
  }
})


interface MainState {
  telegramUser?: any;
  user: any;
  token?: any;
}

const initialState: MainState = {
  user: undefined,
  token: undefined,
  telegramUser: undefined
}

const main = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setTelegramUser(state, action) {
      state.telegramUser = action.payload
    },
    setUser(state, action) {
      state.user = {
        ...state.user, 
        ...action.payload}
    },
  },
  extraReducers: builder => {
    builder.addCase(getToken.fulfilled, (state, action) => {
      state.token = action.payload.token
    })
  },
})

export const { setTelegramUser, setUser } = main.actions
export default main.reducer