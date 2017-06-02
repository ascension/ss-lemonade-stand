import { connect } from 'react-redux';
import DashboardPage from '../components/DashboardPage';
import { createCustomerBitcoinAddress } from '../modules/bitcoinAddresses';
import { getBtcPrice } from '../../../store/coinPrices';

const mapDispatchToProps = {
  createCustomerBitcoinAddress
};

function mapStateToProps(state) {
  return {
    addresses: state.bitcoinAddresses.addresses,
    btcPrice: getBtcPrice(state)
  };
}

// TODO - Ensure that we subscribe to all addresses

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
