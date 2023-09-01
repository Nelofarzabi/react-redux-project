import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  missions: [],
  loading: false,
  error: '',
};

export const fetchMissions = createAsyncThunk('missions/fetchMissions', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://api.spacexdata.com/v3/missions');
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
const missionsSlice = createSlice({
  name: 'mission',
  initialState,
  reducers: {
    joinMission: (state, action) => {
      const { id } = action.payload;
      const mission = state.missions.find((mission) => mission.id === id);
      mission.joined = !mission.joined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;
        if (data) {
          state.missions = data.map((mission) => {
            const { mission_id: id, mission_name: name, description } = mission;
            return { id, name, description };
          });
        }
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { joinMission } = missionsSlice.actions;
export default missionsSlice.reducer;
