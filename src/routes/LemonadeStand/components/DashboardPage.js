import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, HelpBlock } from '../../../components/Input';
import { Button } from '../../../components/Buttons';
import { bindClassMethods } from 'util/commonUtil';
import { Container, Row } from 'components/Layout';
import styled from 'styled-components';
import { isValidBitcoinAddress, calculateTransactionValue, convertSatoshisToBtc } from 'util/bitcoinUtil';
import numeral from 'numeral';
import { convertSatoshisToFormattedBtcString, formatToUsdString } from 'util/textFormattingUtil';
import StatPanel from '../components/StatPanel';
import AnimatedNumber from 'react-animated-number';

const propTypes = {
  addresses: PropTypes.object,
  createCustomerBitcoinAddress: PropTypes.func.isRequired,
  btcPrice: PropTypes.number.isRequired
};

const H3 = styled.h3`
    background: #f4f4f4;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    margin-top: 0;
    color: #888;
    width: 100%;
`;

const Table = styled.table`
  width: 100%;
  color: #999;
  & tr {
    border-bottom: 1px solid #ddd;
  }
  
  & td {
    text-align: left;
  }
`;

const TH = styled.th`
  color: #999;
  whiteSpace: nowrap;
`;

const Panel = styled.div`
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
  box-shadow: 0 1px 1px rgba(0,0,0,.05);
  border-color: #ddd;
`;

const PanelHeading = styled.div`
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;
`;

const Stats = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
`;

const PanelBody = styled.div`
  padding: 15px;
`;

const CheckboxLabel = styled.label`
  min-height: 20px;
  margin-bottom: 0;
  font-weight: 400;
  cursor: pointer;
  font-size: 14px;
  & input {
    margin-right: 10px;
  }
`;

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    const { address = '', memo = '' } = props;
    this.state = {
      memo,
      bitcoinAddress: address,
      generateNewAddress: false,
      formErrors: {}
    };
    bindClassMethods.call(this, 'handleClick', 'handleChange');
  }

  handleClick(event) {
    const { createCustomerBitcoinAddress } = this.props;
    event.preventDefault();

    const formErrors = {};

    const { memo, generateNewAddress, bitcoinAddress } = this.state;
    if (memo === '') {
      formErrors.memo = true;
    }

    if (!generateNewAddress && !isValidBitcoinAddress(bitcoinAddress)) {
      formErrors.bitcoinAddress = true;
    }

    if (this.props.addresses[bitcoinAddress]) {
      formErrors.uniqueBitcoinAddress = true;
    }

    if (Object.keys(formErrors).length > 0) {
      this.setState({ formErrors });
      return;
    }

    createCustomerBitcoinAddress({ memo, generateNewAddress, bitcoinAddress });
    this.setState({
      formErrors: {},
      memo: '',
      bitcoinAddress: '',
      generateNewAddress: false
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
    });
  }

  renderBitcoinAddressTransactions(publicAddress, memo, transactions) {
    const { btcPrice } = this.props;

    return transactions.map(transaction => (
      <tr key={transaction.txnId}>
        <td style={{ paddingRight: '30px' }}>
          <a href={`https://blockchain.info/address/${publicAddress}`} target="_blank">{publicAddress}</a>
        </td>
        <td>{memo}</td>
        <td>
          {convertSatoshisToFormattedBtcString(transaction.amount)} BTC
          (~{formatToUsdString(calculateTransactionValue(convertSatoshisToBtc(transaction.amount), btcPrice))})
        </td>
        <td>
          <a target="_blank" href={`https://blockchain.info/tx/${transaction.txnId}`}>
            View
          </a>
        </td>
      </tr>
    ));
  }

  renderBitcoinAddressRow({ publicAddress, memo, transactions }) {
    const hasTransactions = transactions.length > 0;
    const lastTransaction = transactions[transactions.length - 1];

    return !hasTransactions
      ? <tr key={publicAddress}>
          <td style={{ paddingRight: '30px' }}>
            <a href={`https://blockchain.info/address/${publicAddress}`} target="_blank">{publicAddress}</a>
          </td>
          <td>{memo}</td>
        </tr>
      : this.renderBitcoinAddressTransactions(publicAddress, memo, transactions);
  }

  renderAddressTable(addresses, showTxnDetails) {
    return (
      <Table>
        <tbody>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <TH style={{ color: '#999', whiteSpace: 'nowrap', width: '1%' }}>Bitcoin Address</TH>
            <TH style={{ color: '#999', whiteSpace: 'nowrap' }}>Memo</TH>
            {showTxnDetails && <th style={{ color: '#999', whiteSpace: 'nowrap' }}>Amount</th>}
            {showTxnDetails && <th style={{ color: '#999', whiteSpace: 'nowrap' }}>Transaction Details</th>}
          </tr>
          {addresses.map(address => this.renderBitcoinAddressRow(address))}
        </tbody>
      </Table>
    );
  }

  render() {
    const { addressCount, addressesWithTransactions, addressesWithoutTransactions } = this.props;

    return (
      <Container>
        <Row>
          <div className="col-md-6">
            <Row>
              <div className="col-md-6">
                <StatPanel title="BTC Price">
                  {this.props.btcPrice === 0
                    ? 'Loading'
                    : <AnimatedNumber
                        duration={500}
                        style={{ color: 'rgba(108, 168,  46, 1.0)' }}
                        value={this.props.btcPrice}
                        stepPrecision={2}
                        formatValue={num => numeral(num).format('$0,0.00')}
                      />}
                </StatPanel>
              </div>
              <div className="col-md-6">
                <StatPanel title="# of Addresses" content={addressCount} />
              </div>
            </Row>
            <Row>
              <div className="col-md-6">
                <StatPanel title="# of Pending" content={addressesWithoutTransactions.length} />
              </div>
              <div className="col-md-6">
                <StatPanel title="# of Complete" content={addressesWithTransactions.length} />
              </div>
            </Row>
          </div>
          <div className="col-md-6">
            <form className="form">
              <h5 style={{ marginBottom: '20px' }}>Enter bitcoin address to be notified of payments.</h5>
              <div style={{ marginBottom: '30px' }}>
                <Input placeholder="Memo" name="memo" value={this.state.memo} onChange={this.handleChange} />
                {this.state.formErrors.memo && <HelpBlock hasError={true}>Memo is required.</HelpBlock>}
              </div>
              <div style={{ marginBottom: '30px' }}>
                <Input
                  placeholder={this.state.generateNewAddress ? '' : 'Bitcoin Address'}
                  name="bitcoinAddress"
                  value={!this.state.generateNewAddress ? this.state.bitcoinAddress : ''}
                  onChange={this.handleChange}
                  disabled={this.state.generateNewAddress}
                />
                {this.state.formErrors.bitcoinAddress &&
                  <HelpBlock hasError={true}>A valid bitcoin address is required.</HelpBlock>}
                {this.state.formErrors.uniqueBitcoinAddress &&
                  <HelpBlock hasError={true}>Please enter unique bitcoin address.</HelpBlock>}
              </div>
              <div style={{ marginBottom: '30px', textAlign: 'left' }}>
                <CheckboxLabel htmlFor="generateNewAddress">
                  <input
                    id="generateNewAddress"
                    type="checkbox"
                    name="generateNewAddress"
                    onChange={this.handleChange}
                    checked={this.state.generateNewAddress}
                  />
                  Generate Bitcoin Address
                </CheckboxLabel>
              </div>
              <Button className="btn btn-default" onClick={this.handleClick}>Add Bitcoin Address</Button>
            </form>
          </div>
        </Row>
        <Row style={{ padding: '50px 0' }}>
          <H3>Pending Payments</H3>
          {addressesWithoutTransactions &&
            addressesWithoutTransactions.length > 0 &&
            this.renderAddressTable(addressesWithoutTransactions)}
        </Row>
        <Row>
          <H3>Completed Payments</H3>
          {addressesWithTransactions &&
            addressesWithTransactions.length > 0 &&
            this.renderAddressTable(addressesWithTransactions, true)}
        </Row>
      </Container>
    );
  }
}

DashboardPage.propTypes = propTypes;

export default DashboardPage;
