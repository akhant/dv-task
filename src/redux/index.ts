import { InvItem } from './../interfaces/index';
import { normalizeData } from './../utils/index';
import {
  configureStore,
  ThunkAction,
  Action,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import app from '../firebase';

// --------------------- actions ----------------------
export const getPlaces = createAsyncThunk('places/get', async (arg) => {
  const response = await app.firestore().collection('places').get();
  let docs = response.docs.map((x) => ({
    id: x.id,
    data: { name: x.data().name },
    parts: x.data().parts && x.data().parts.map((part: any) => part.id),
  }));

  return normalizeData(docs);
});

export const getInventory = createAsyncThunk('inventory/get', async (arg) => {
  const response = await app.firestore().collection('inventory').get();

  let docs = response.docs.map((x) => ({
    id: x.id,
    data: { name: x.data().name, count: x.data().count },
    placeId: x.data().place && x.data().place.id,
  }));
  return { docs };
});

export const addInv = createAsyncThunk(
  'inventory/add',
  //@ts-ignore
  async ({ placeId }) => {
    let filestore = app.firestore();
    const response = await filestore.collection('inventory').add({
      name: '',
      count: 0,
      place: filestore.collection('places').doc(placeId),
    });
    return {
      invItem: { data: { name: '', count: 0 }, id: response.id, placeId },
    };
  }
);

export const updateInv = createAsyncThunk(
  'inventory/update',
  //@ts-ignore
  async ({ id, name, count, placeId }) => {
    await app
      .firestore()
      .collection('inventory')
      .doc(id)
      .set({
        name,
        count,
        place: app.firestore().collection('places').doc(placeId),
      });
    return { invItem: { id, data: { name, count }, placeId } };
  }
);

export const removeInv = createAsyncThunk(
  'inventory/remove',
  //@ts-ignore
  async ({ id }) => {
    app.firestore().collection('inventory').doc(id).delete();

    return { id };
  }
);

// --------------------- reducers ----------------------

const preloadedState = {
  inventory: [],
  places: [],
};

const placesSlice = createSlice({
  name: 'places',
  initialState: preloadedState.places,
  reducers: {},
  extraReducers: {
    //@ts-ignore
    [getPlaces.fulfilled]: (state, action) => {
      return action.payload;
    },
    //@ts-ignore
    [getPlaces.rejected]: (state, action) => {
      return [];
    },
  },
});

const dataSlice = createSlice({
  name: 'data',
  initialState: { placeId: 'main', buildingId: 'main' },
  reducers: {
    setPlaceId(state, action) {
      return { ...state, placeId: action.payload.placeId };
    },
    setBuildingId(state, action) {
      return { ...state, buildingId: action.payload.buildingId };
    },
  },
});

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: preloadedState.inventory,
  reducers: {},
  extraReducers: {
    //@ts-ignore
    [getInventory.fulfilled]: (state, action) => {
      state = action.payload.docs;
      return state;
    },
    //@ts-ignore
    [getInventory.rejected]: (state, action) => {
      return state;
    },
    //@ts-ignore
    [addInv.fulfilled]: (state, action) => {
      return [...state, action.payload.invItem];
    },
    //@ts-ignore
    [addInv.rejected]: (state, action) => {
      return state;
    },
    //@ts-ignore
    [updateInv.fulfilled]: (state, action) => {
      const { invItem } = action.payload;
      return state.map((item: any) => {
        if (item.id === invItem.id) {
          const newItem = { ...invItem };
          return newItem;
        } else {
          return item;
        }
      });
    },
    //@ts-ignore
    [updateInv.rejected]: (state, action) => {
      return state;
    },
    //@ts-ignore
    [removeInv.fulfilled]: (state, action) => {
      return state.filter((el: InvItem) => el.id !== action.payload.id);
    },
    //@ts-ignore
    [removeInv.rejected]: (state, action) => {
      return state;
    },
  },
});

// --------------------- config ----------------------
const reducer = {
  inventory: inventorySlice.reducer,
  places: placesSlice.reducer,
  data: dataSlice.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const { setPlaceId, setBuildingId } = dataSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
