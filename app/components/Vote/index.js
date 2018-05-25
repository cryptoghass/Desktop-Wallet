import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filter, sortBy } from 'lodash';

import { loadWitnesses } from '../../actions/witnesses';
import { MoreIcon, WalletIcon, DownloadIcon } from '../Icons';

import Header from '../ContentPrimaryHeader';
import Vote from './Vote';

import styles from './VoteList.css';

class VoteList extends Component {
  componentDidMount() {
    this.props.loadWitnesses();
  }

  renderWitnesses() {
    let { witnesses, searchString } = this.props;
    if (witnesses.length === 0) {
      return (
        <div>
          <h1>NOTHING HERE</h1>
        </div>
      );
    }

    witnesses = filter(witnesses, w => w.url.toUpperCase().indexOf(searchString) !== -1);
    witnesses = sortBy(witnesses, w => w.url);

    return (
      <div className={styles.votesContainer}>
        {
          witnesses.map((rep, index) =>
            <Vote
              key={index}
              voteLabel={index + 1}
              voteTitle={rep.url}
              lastBlock={rep.latestblocknum}
              blocksProduced={rep.totalproduced}
              blocksMissed={rep.totalmissed}
              totalVote={rep.votecount}
            />)
        }
      </div>
    );
  }

  render() {

    let { witnesses } = this.props;

    return (
      <div className={styles.container}>
        <Header className={styles.header} text="REPRESENTATIVE LISTING :" />
        {this.renderWitnesses()}
      </div>
    );
  }
}

export default connect(
  state => ({ witnesses: state.witnesses.witnesses, searchString: state.app.searchString }),
  dispatch => ({
    loadWitnesses: () => {
      dispatch(loadWitnesses(dispatch));
    }
  })
)(VoteList);
