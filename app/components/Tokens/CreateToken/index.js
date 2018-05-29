import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loadTokens } from '../../../actions/tokens';
import styles from './CreateToken.css';
import Secondary from '../../Content/Secondary';
import Header from '../../Header';

const TronHttpClient = require('tron-http-client');

const client = new TronHttpClient();

class CreateToken extends Component {
  inputAlphanumeric(e)
  {
    if (!/^[a-zA-Z0-9]+$/.test(e.key)) {
      e.preventDefault();
    }
  }

  selectWallet = (e, { value }) => {
    let wallet = this.state.wallets.filter((wallet) => wallet.value == value);
    this.setState({ selectedWallet: wallet[0] });
  };

  render() {
    let accountId = parseInt(this.props.match.params.accounts);
    let accounts = this.props.wallet.persistent.accounts;
    let selectedWallet = this.props.wallet.persistent.accounts[accountId];
    console.log(accounts);

    const submitToken = async CreateToken => {
      let startTime = Date.now() + (60 * 1000);
      let endTime = Date.now() + (60 * 1000 * 60 * 24);
      let props = {
        assetName: '',
        assetAbbr: '',
        totalSupply: 0,
        num: 0,
        trxNum: 0,
        endTime: endTime,
        startTime: startTime,
        description: '',
        url: ''
      };
      let response = await client.issueAsset(accounts.privateKey, props);
      console.log(response);
    };

    return (
      <Secondary className={styles.container}>
        <Header headerName="Create New Token" />
        <div className={styles.createContainer}>
          <div className={styles.header}>ISSUE A NEW TOKEN :</div>
          <div className={styles.textBoxContainer}>
            <span>Token Name</span>
            <Input className={styles.input} onKeyPress={this.inputAlphanumeric} />
          </div>
          <div className={styles.textBoxContainer}>
            <span>Token Abbreviation</span>
            <Input className={styles.input} onKeyPress={this.inputAlphanumeric} />
          </div>
          <div className={styles.textBoxContainer}>
            <span>Total Supply</span>
            <Input type="number" className={styles.input} />
          </div>
          <div className={styles.inputSubText}>Total amount of tokens which will be in circulation.</div>
          <div className={styles.divider}></div>
          <div className={styles.textBoxContainer}>
            <span>Description</span>
            <Input className={styles.input} />
          </div>
          <div className={styles.inputSubText}>A short description of the purpose of the token.</div>
          <div className={styles.textBoxContainer}>
            <span>URL</span>
            <Input className={styles.input} />
          </div>
          <div className={styles.inputSubText}>A website where users can find more information about the token.</div>
          <div className={styles.divider}></div>
          <div className={styles.header}>EXCHANGE RATE :</div>
          <div className={styles.headerSubText}>Specify the price of a single token by defining how many tokens a
            participant will receive for every TRX they spend.
          </div>
          <div className={styles.divider}></div>
          <div className={styles.headerSubText}>Participants will receive <span>1</span> <span>Token</span> for every  <span>1</span><span> TRX</span>.</div>
          <div className={styles.divider}></div>
          <div className={styles.textBoxContainer}>
            <span>TRX Amount</span>
            <Input type="number" className={styles.input} />
          </div>
          <div className={styles.textBoxContainer}>
            <span>Token Amount</span>
            <Input type="number" className={styles.input} />
          </div>
        </div>
      </Secondary>
    );
  }
}

export default withRouter(connect(
  state => ({ tokens: state.tokens.tokens, wallet: state.wallet }),
  dispatch => ({
    loadTokens: () => {
      dispatch(loadTokens(dispatch));
    }
  })
)(CreateToken));
