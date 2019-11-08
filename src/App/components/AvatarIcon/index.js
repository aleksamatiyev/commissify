import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

const AvatarIcon = ({ src }) => {
  const classes = useStyles();

  return (
    <Avatar alt="Remy Sharp" src={src} className={classes.bigAvatar} />
  );
}

export default AvatarIcon