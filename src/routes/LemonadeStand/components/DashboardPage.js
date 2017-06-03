import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Input, HelpBlock } from '../../../components/Input';
import { Button } from '../../../components/Buttons';
import { bindClassMethods } from 'util/commonUtil';
import { Container, Row } from 'components/Layout';
import styled from 'styled-components';
import { isValidBitcoinAddress } from 'util/bitcoinUtil';
import AnimatedNumber from 'react-animated-number';
import numeral from 'numeral';
import { convertSatoshisToFormattedBtcString } from 'util/textFormattingUtil'

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

const BitcoinAddressTable = styled.table`
  width: 100%;
  color: #999;
  & tr {
    border-bottom: 1px solid #ddd;
  }
  
  & td {
    text-align: left;
  }
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

  renderBitcoinAddressRow({ publicAddress, memo, id, transactions }) {
    const hasTransactions = transactions.length > 0;
    const lastTransaction = transactions[transactions.length - 1];

    return (
      <tr key={publicAddress}>
        <td style={{ paddingRight: '30px' }}>
          <a href={`https://blockchain.info/address/${publicAddress}`} target="_blank">{publicAddress}</a>
        </td>
        <td>{memo}</td>
        {hasTransactions &&
          <td>
            {convertSatoshisToFormattedBtcString(lastTransaction.amount)} BTC
          </td>}
        {hasTransactions &&
          <td>
            <a target="_blank" href={`https://blockchain.info/tx/${lastTransaction.txnId}`}>
              View
            </a>
          </td>}
      </tr>
    );
  }

  renderAddressTable(addresses, showTxnDetails) {
    return (
      <BitcoinAddressTable>
        <tbody>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <th style={{ color: '#999', whiteSpace: 'nowrap', width: '1%' }}>Bitcoin Address</th>
            <th style={{ color: '#999', whiteSpace: 'nowrap' }}>Memo</th>
            {showTxnDetails && <th style={{ color: '#999', whiteSpace: 'nowrap' }}>Amount</th>}
            {showTxnDetails && <th style={{ color: '#999', whiteSpace: 'nowrap' }}>Transaction Details</th>}
          </tr>
          {addresses.reverse().map(address => this.renderBitcoinAddressRow(address))}
        </tbody>
      </BitcoinAddressTable>
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
                <Panel>
                  <PanelHeading>BTC Price</PanelHeading>
                  <PanelBody>
                    <Stats>
                      {this.props.btcPrice === 0
                        ? 'Loading'
                        : <AnimatedNumber
                            duration={500}
                            style={{ color: 'rgba(108, 168,  46, 1.0)' }}
                            value={this.props.btcPrice}
                            stepPrecision={2}
                            formatValue={num => numeral(num).format('$0,0.00')}
                          />}

                    </Stats>
                  </PanelBody>
                </Panel>
              </div>
              <div className="col-md-6">
                <Panel>
                  <PanelHeading># of Addresses</PanelHeading>
                  <PanelBody><Stats>{addressCount}</Stats></PanelBody>
                </Panel>
              </div>
            </Row>
            <Row>
              <div className="col-md-6">
                <Panel>
                  <PanelHeading># of Pending</PanelHeading>
                  <PanelBody><Stats>{addressesWithoutTransactions.length}</Stats></PanelBody>
                </Panel>
              </div>
              <div className="col-md-6">
                <Panel>
                  <PanelHeading># of Complete</PanelHeading>
                  <PanelBody><Stats>{addressesWithTransactions.length}</Stats></PanelBody>
                </Panel>
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
