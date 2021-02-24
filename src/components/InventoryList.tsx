import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { InventoryListProps, InvItem } from '../interfaces';
import { getInventory, RootState, store } from '../redux';
import InventoryItem from './InventoryItem';
import { filterInventory } from '../utils';

const useStyles = makeStyles({
  root: {
    marginTop: 40,
    width: '80%',
  },
});
const InventoryList: React.FC<InventoryListProps> = React.memo(() => {
  useEffect(() => {
    store.dispatch(getInventory());
  }, []);
  const classes = useStyles();
  const { places, inventory, data } = useSelector((state: RootState) => state);

  let inv = filterInventory(places, inventory, data.placeId);

  return (
    <div className={classes.root}>
      {!inventory.length ? (
        <div>No data</div>
      ) : (
        inv.map((item: InvItem) => {
          return <InventoryItem key={item.id} item={item} />;
        })
      )}
    </div>
  );
});

export default InventoryList;
