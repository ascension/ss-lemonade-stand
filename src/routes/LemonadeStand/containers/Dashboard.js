import { connect } from 'react-redux';
import DashboardPage from '../components/DashboardPage';
import {
  createCustomerBitcoinAddress,
  getBitcoinAddresses,
  getCountOfBitcoinAddresses,
  getAddressesWithoutTransaction,
  getAddressesWithTransaction
} from '../modules/bitcoinAddresses';
import { getBtcPrice } from 'store/middleware/coinPrices';

const mapDispatchToProps = {
  createCustomerBitcoinAddress
};

function mapStateToProps(state) {
  return {
    addresses: getBitcoinAddresses(state),
    btcPrice: getBtcPrice(state),
    addressCount: getCountOfBitcoinAddresses(state),
    addressesWithTransactions: getAddressesWithTransaction(state),
    addressesWithoutTransactions: getAddressesWithoutTransaction(state),
  };
}

// TODO - Ensure that we subscribe to all addresses

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
