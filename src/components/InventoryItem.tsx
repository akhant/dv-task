import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { InventoryItemProps } from '../interfaces';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
// import { removeInv, store, updateInv } from '../redux';
import { Button, TextField } from '@material-ui/core';
import { removeInv, store, updateInv } from '../redux';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    wordBreak: 'break-all',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  inputCount: {
    width: 100,
    '& input': {
      textAlign: 'center',
    },
  },
}));

const InventoryItem: React.FC<InventoryItemProps> = React.memo(({ item }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [name, setName] = React.useState(item.data?.name);
  const [count, setCount] = React.useState(item.data?.count);

  const handleOpen = () => {
    setExpanded((state) => !state);
  };
  const handleDelete = (event: any) => {
    event.stopPropagation();
    //@ts-ignore
    store.dispatch(removeInv({ id: item.id }));
  };

  const handleUpdateInv = () => {
    store.dispatch(
      //@ts-ignore
      updateInv({
        id: item.id,
        name,
        count: Number(count),
        placeId: item.placeId,
      })
    );
  };

  return (
    <Accordion expanded={expanded} onChange={handleOpen}>
      <AccordionSummary
        //className={classes.summary}
        aria-controls='panel1bh-content'
        id='panel1bh-header'
        //@ts-ignore
        classes={{ content: classes.content }}
      >
        <Typography className={classes.heading}>{item.data.name}</Typography>
        <Typography className={classes.secondaryHeading}>
          {item.data.count}
        </Typography>
        <DeleteOutlineOutlinedIcon onClick={handleDelete} />
      </AccordionSummary>
      <AccordionDetails classes={{ root: classes.details }}>
        <TextField
          value={name}
          onChange={(event) => setName(event.target.value)}
          label='Название'
          variant='outlined'
        />
        <TextField
          classes={{ root: classes.inputCount }}
          value={count}
          onChange={(event) => setCount(event.target.value)}
          label='Количество'
          variant='outlined'
        />
        <Button variant='outlined' onClick={handleUpdateInv}>
          Сохранить
        </Button>
      </AccordionDetails>
    </Accordion>
  );
});

export default InventoryItem;
