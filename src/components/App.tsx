import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState, store, addInv, getPlaces } from '../redux';
import Disposition from './Disposition';
import InventoryList from './InventoryList';
import { Divider, Grid, makeStyles } from '@material-ui/core';
import BuildingPicker from './BuildingPicker';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { findMinLevelIds } from '../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },

  divider: {
    alignSelf: 'stretch',
  },
  addIcon: {
    cursor: 'pointer',
    color: '#43d691',
    fontSize: 50,
    transition: theme.transitions.create(['transform'], {
      duration: 500,
    }),
    '&:hover': {
      color: '#2ed185',
      transform: 'scale(1.1)',
    },
  },
  addIconWrapper: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: 20,
    width: '80%',
  },
}));

function App() {
  const classes = useStyles();
  const { places, data } = useSelector((state: RootState) => state);

  useEffect(() => {
    store.dispatch(getPlaces());
  }, []);

  const handleAddInv = () => {
    //@ts-ignore
    store.dispatch(addInv({ placeId: store.getState().data.placeId }));
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.root} container direction='row'>
        <Grid container direction='column' alignItems='center' item xs={6}>
          <BuildingPicker />
          <Divider className={classes.divider} variant='middle' />
          <Disposition />
        </Grid>
        <Grid item xs={1}>
          <Divider orientation='vertical' />
        </Grid>
        <Grid item xs={5}>
          <InventoryList />
          {findMinLevelIds(places).some((item) => item === data.placeId) && (
            <div className={classes.addIconWrapper}>
              <AddCircleIcon
                className={classes.addIcon}
                onClick={handleAddInv}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
