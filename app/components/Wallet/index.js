import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Button, Dropdown } from "semantic-ui-react";

import { connect } from "react-redux";
import Header from "../ContentPrimaryHeader";
import Wallet from "./Wallet";

import { tu } from "../../utils/i18n";

import { MoreIcon, WalletIcon, DownloadIcon, SendIcon } from "../Icons";
import styles from "./WalletList.css";
import buttonStyles from "../Button.css";

class WalletList extends Component {
  render() {
    let accounts = this.props.wallet.persistent.accounts;
    let accountKeys = Object.keys(accounts);
    return (
      <div className={styles.container}>
        <Header className={styles.header} text="MY WALLETS :">
          <Dropdown icon={<MoreIcon />}>
            <Dropdown.Menu>
              <NavLink to="/wallets/broadcast">
                <Dropdown.Item
                  text="Broadcast Signed Transaction"
                  icon={<SendIcon />}
                />
              </NavLink>

              <NavLink to="/wallets/createtransfer">
                <Dropdown.Item text="Create Raw Transfer" icon={<SendIcon />} />
              </NavLink>
              <NavLink to="/wallets/createassettransfer">
                <Dropdown.Item
                  text="Create Raw Asset Transfer"
                  icon={<SendIcon />}
                />
              </NavLink>
              <NavLink to="/wallets/createfreeze">
                <Dropdown.Item
                  text="Create Raw Freeze Transaction"
                  icon={<SendIcon />}
                />
              </NavLink>
            </Dropdown.Menu>
          </Dropdown>
        </Header>
        <div className={styles.buttonContainer}>
          <NavLink to="/wallets/create">
            <Button
              className={`${buttonStyles.button} ${buttonStyles.gradient}`}
            >
              Create New Wallet
            </Button>
          </NavLink>
        </div>
        <div className={styles.walletContainer}>
          {accountKeys.map((key, i) => (
            // NavLink in Wallet Component
            <Wallet
              key={key}
              pub={accounts[key].publicKey}
              trx={accounts[key].trx}
              name={accounts[key].name}
              tokens={accounts[key].tokens}
              index={accounts[key].publicKey}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({ wallet: state.wallet }),
    dispatch => ({})
  )(WalletList)
);
