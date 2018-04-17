//@flow

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { Link } from "react-router-dom";
import Logo from "../sources/logo.png";
import Tabs, { Tab } from "material-ui/Tabs";
import { withRouter } from "react-router";
import { Button } from "material-ui";
import { connect } from "react-redux";
import { compose } from "recompose";
import { clearComicFilter } from "../actions/comics";
const styleSheet = theme => ({
  root: {
    width: "100%"
  },
  logo: {
    marginRight: theme.spacing.unit,
    alignSelf: "flex-start"
  },
  flex: {
    flex: 1
  },
  orderWidget: {
    marginRight: theme.spacing.unit
  },
  topBar: {
    [theme.breakpoints.up("md")]: {
      height: 60
    },
    [theme.breakpoints.only("xs")]: {
      height: "auto",
      padding: theme.spacing.unit
    }
  },
  toolbarRoot: {
    [theme.breakpoints.only("xs")]: {
      height: "auto",
      flexDirection: "column"
    }
  },
  leftContent: {
    flex: 1,
    display: "flex",
    alignItems: "center"
  },
  rightContent: {
    flex: 1,
    display: "flex",
    alignItems: "center"
  }
});

const Header = (props: void): any => {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        classes={{
          root: props.classes.topBar
        }}
      >
        <Toolbar className={classes.toolbarRoot}>
          <div
            style={{ justifyContent: "center" }}
            className={classes.leftContent}
          >
            <Link to={"/"}>
              <img
                className={classes.logo}
                src={Logo}
                height={32}
                alt={"Marvel Heroes and Comics"}
              />
            </Link>

            <Tabs style={{ textAlign: "center" }}>
              <Link style={{ textDecoration: "none" }} to={"/comics"}>
                <Button raised href={"/comics"}>
                  <p style={styles.menu}>QUADRINHOS</p>
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to={"/characters"}>
                <Button raised href={"/characters"}>
                  <p style={styles.menu}>HERÓIS</p>
                </Button>
              </Link>
            </Tabs>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = {
  menu: {
    color: "#fff",
    fontFamily: "BentonSansCompBlackRegular",
    fontSize: 20
  }
};

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styleSheet)(Header));
