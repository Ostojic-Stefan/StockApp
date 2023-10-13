import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Structure } from "../types";
import axios from "axios";
import { RootState } from "../store";

function formatForSubscription(sym: string) {
  return `t${sym.toUpperCase()}`;
}

interface InitialData {
  data: Structure[];
  symbols: string[];
  currPairSnapshot: Structure | null;
}

const initialState: InitialData = {
  data: [],
  symbols: [],
  currPairSnapshot: null,
};

export const getTopSymbols = createAsyncThunk<string[], void>(
  "tradingPairs/getTopSymbols",
  async function (_arg, { rejectWithValue }) {
    try {
      const response = await axios.get<string[]>("/v1/symbols");
      return response.data.slice(0, 5);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const pairsSlice = createSlice({
  name: "tradingPairs",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setCurrPair(state, action) {
      state.currPairSnapshot = { ...action.payload };
    },
  },
  extraReducers: function (builder) {
    builder.addCase(getTopSymbols.fulfilled, (state, action) => {
      state.symbols = action.payload.map(formatForSubscription);
    });
    builder.addCase(getTopSymbols.rejected, (_state, _action) => {
      console.log("Failed to get the top symbols");
    });
  },
});

export const selector = (store: RootState) => store.tradingPairs.data;

export const { setData, setCurrPair } = pairsSlice.actions;
export default pairsSlice.reducer;
