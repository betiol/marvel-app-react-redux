/**
 * Created by nikollasbetiol on 31/03/18.
 * @flow
 */

import React from "react";
import Spinner from "react-spinkit";
import { TextCentered } from "../util/styled";
import { CircularProgress } from "material-ui/Progress";
import { Typography } from "material-ui";

type Props = {
  message: string,
  size: number
};

const Loader = (props: Props) => {
  return (
    <TextCentered>
      <CircularProgress size={props.size} />
      <p style={styles.message}>{props.message}</p>
    </TextCentered>
  );
};

const styles = {
  message: {
    color: "#fff",
    fontFamily: "BentonSansCompBlackRegular",
    fontSize: 30
  }
};

export default Loader;
