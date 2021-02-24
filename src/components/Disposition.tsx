import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { PlaceItem } from '../interfaces';
import { RootState } from '../redux';
import PlaceCardElement from './PlaceCardElement';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 40,
  },
}));

const Disposition = () => {
  const classes = useStyles();
  const { places, data } = useSelector((state: RootState) => state);
  const rootItem = places.find((building: PlaceItem) => {
    return building.id === data.buildingId;
  });

  const renderChildrens = (item: PlaceItem | undefined) => {
    if (!item) return <div>No data</div>;
    return (
      <Grid key={item.id} alignItems='center' container direction='column'>
        <PlaceCardElement item={item} />
        <Grid
          justify='center'
          wrap='nowrap'
          container
          item
          direction={'row'}
          xs={6}
        >
          {item.childrens?.map((child: PlaceItem) => {
            return renderChildrens(child);
          })}
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid className={classes.root} container>
      {renderChildrens(rootItem)}
    </Grid>
  );
};

export default Disposition;
