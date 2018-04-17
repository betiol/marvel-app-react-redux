/**
 * Created by nikollasbetiol on 29/03/18.
 * @flow
 */

import React from "react";
import { withStyles } from "material-ui/styles";
import { Grid, Typography } from "material-ui";
import type { Element } from "react";

type Props = {
  classes: Object,
  type: string,
  children: Element<*>,
  genre: string
};

const styleSheet = theme => ({
  root: {
    flexDirection: "column",
    paddingTop: 60,
    flexGrow: "1",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  children: {
    textAlign: "center"
  }
});

const CarouselContainer = (props: Props) => {
  return (
    <Grid className={props.classes.root}>
      <Grid
        style={{ alignItems: "center", justifyContent: "center" }}
        xs={12}
        sm={12}
        spacing={8}
        container
        style={{ justifyContent: "center" }}
        className={props.classes.paper}
      >
        <Grid className={props.classes.children} xs={9} sm={9}>
          <Typography
            align={"left"}
            variant="display1"
            style={styles.title}
            className={props.classes.title}
          >
            {`${props.type} RELACIONADOS A ESTE ${props.genre}`}
          </Typography>
          {props.children}
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = {
  title: {
    fontSize: 30,
    paddingLeft: 5,
    fontFamily: "BentonSansCompBlackRegular",
    color: "#fff"
  }
};

export default withStyles(styleSheet)(CarouselContainer);
