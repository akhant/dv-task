import React from 'react';
import { InvItem, PlaceCardElementProps } from '../interfaces';
import { store, setPlaceId, RootState } from '../redux';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import StorageIcon from '@material-ui/icons/Storage';

const useStyles = makeStyles((theme: any) => ({
  title: {
    fontSize: 14,
  },
  card: {
    cursor: 'pointer',
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    transition: theme.transitions.create(['transform', 'background'], {
      duration: 500,
    }),
    '&:hover': {
      transform: 'translate(-3%,-3%)',
      background: 'linear-gradient(0deg, #d1d1e0 30%, #e1e1ea 90%)',
    },
  },
  active: {
    background: 'linear-gradient(0deg, #d1d1e0 30%, #e1e1ea 90%)',
  },
  iconStorageWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const PlaceCardElement: React.FC<PlaceCardElementProps> = ({ item }) => {
  const classes = useStyles();
  const { inventory } = useSelector((state: RootState) => state);
  const {
    data: { placeId },
  } = useSelector((state: RootState) => state);
  const handleClick = (event: any) => {
    store.dispatch(setPlaceId({ placeId: item.id }));
  };
  const hasInventory = (inv: InvItem[], id: string) => {
    return inv.findIndex((el: InvItem) => el.placeId === id) !== -1;
  };
  return (
    <Card
      className={`${
        placeId === item.id ? classes.card + ' ' + classes.active : classes.card
      }`}
      onClick={handleClick}
    >
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          {item.data.name}
        </Typography>
        <div className={classes.iconStorageWrapper}>
          {hasInventory(inventory, item.id) && <StorageIcon />}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceCardElement;
