import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { PlaceItem } from '../interfaces';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState, setBuildingId, setPlaceId, store } from '../redux';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: 300,
    marginTop: 40,
    marginBottom: 40,
  },
}));

const BuildingPicker = () => {
  const classes = useStyles();
  const { places } = useSelector((state: RootState) => state);
  const [building, setBuilding] = useState('Главный офис');

  const handleChangeBuilding = (event: any) => {
    store.dispatch(
      setBuildingId({ buildingId: event.nativeEvent.target.dataset.id })
    );
    store.dispatch(
      setPlaceId({ placeId: event.nativeEvent.target.dataset.id })
    );
    setBuilding(event.target.value);
  };

  return (
    <FormControl variant='outlined' className={classes.formControl}>
      <InputLabel id='demo-simple-select-label'>Здание</InputLabel>
      <Select
        labelId='building-select'
        id='building-select'
        value={building}
        onChange={handleChangeBuilding}
        label='Здание'
      >
        {places?.map((item: PlaceItem) => {
          //select buildings
          if (item.id === 'main' || item.id === 'production') {
            return (
              <MenuItem key={item.id} data-id={item.id} value={item.data.name}>
                {item.data.name}
              </MenuItem>
            );
          }
        })}
      </Select>
    </FormControl>
  );
};

export default BuildingPicker;
