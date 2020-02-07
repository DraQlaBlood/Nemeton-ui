import React from "react";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./material_title_panel";

import { Link } from "react-router-dom";

import store from "../../../stores/index";

const styles = {
  sidebar: {
    width: 256,
    height: "150%"
  },
  sidebarLink: {
    display: "block",
    padding: "12px 0px",
    color: "#757575",
    textDecoration: "none"
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#757575"
  },
  content: {
    padding: "16px",
    height: "100%",
    backgroundColor: "white"
  }
};

const SidebarContent = props => {
  const style = props.style
    ? { ...styles.sidebar, ...props.style }
    : styles.sidebar;

  const accountName = localStorage.getItem("account_id").toUpperCase();

  return (
    <MaterialTitlePanel title={accountName} style={style}>
      <div style={styles.content}>
        <Link
          to="/users/my-profile"
          style={styles.sidebarLink}
          onClick={() =>
            store.globalparams.setSidebar(!store.globalparams.isSidebarOpen)
          }
        >
          <i className=" pr-2 fas fa-user-cog"></i> Account management
        </Link>
        <Link
          to="/settings"
          style={styles.sidebarLink}
          onClick={() =>
            store.globalparams.setSidebar(!store.globalparams.isSidebarOpen)
          }
        >
          <i className=" pr-2 fas fa-sitemap"></i> Organizations
        </Link>
        <Link
          to="/organizations"
          style={styles.sidebarLink}
          onClick={() =>
            store.globalparams.setSidebar(!store.globalparams.isSidebarOpen)
          }
        >
          <i className=" pr-2 fas fa-bookmark"></i> Saved
        </Link>
        <Link
          to="/settings"
          style={styles.sidebarLink}
          onClick={() =>
            store.globalparams.setSidebar(!store.globalparams.isSidebarOpen)
          }
        >
          <i className=" pr-2 fas fa-newspaper"></i> Posts
        </Link>
        <div style={styles.divider} />
        <Link
          to="/settings"
          style={styles.sidebarLink}
          onClick={() =>
            store.globalparams.setSidebar(!store.globalparams.isSidebarOpen)
          }
        >
          <i className=" pr-2 fas fa-user-plus"></i> Add Account
        </Link>
        <Link
          to="/settings"
          style={styles.sidebarLink}
          onClick={() =>
            store.globalparams.setSidebar(!store.globalparams.isSidebarOpen)
          }
        >
          <i className=" pr-2 fas fa-id-badge"></i> Add Organization
        </Link>

        <div style={styles.divider} />
        <Link
          to="/settings"
          style={styles.sidebarLink}
          onClick={() =>
            store.globalparams.setSidebar(!store.globalparams.isSidebarOpen)
          }
        >
          <i className="pr-2 fas fa-question-circle"></i> Help
        </Link>
        <Link
          to="/settings"
          style={styles.sidebarLink}
          onClick={() =>
            store.globalparams.setSidebar(!store.globalparams.isSidebarOpen)
          }
        >
          <i className="pr-2 fas fa-exclamation-circle"></i> About
        </Link>
        <Link
          to="/settings"
          style={styles.sidebarLink}
          onClick={() =>
            store.globalparams.setSidebar(!store.globalparams.isSidebarOpen)
          }
        >
          <i className=" pr-2 fas fa-toggle-on"></i> Switch account
        </Link>

        <Link
          to="#"
          style={styles.sidebarLink}
          onClick={() =>
            store.user.signOut()
          }
        >
          <i className="pr-2 fas fa-sign-out-alt"></i> Log Out All accounts
        </Link>
      </div>
    </MaterialTitlePanel>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object
};

export default SidebarContent;
