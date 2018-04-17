/**
 * Created by nikollasbetiol on 01/04/18.
 * @flow
 */

import React from "react";
import Typography from "material-ui/Typography/Typography";

type Props = {
  message: string
};

const NoHaveData = (props: Props) => {
  return <Typography style={styles.message}>{props.message}</Typography>;
};

const styles = {
  message: {
    fontFamily: "BentonSansCompBlackRegular",
    color: "#fff",
    textAlign: "center",
    fontSize: 35
  }
};

export default NoHaveData;
