import { connect } from 'react-redux';
import DashboardPage from '../components/DashboardPage';
import { createCustomerBitcoinAddress } from '../modules/bitcoinAddresses';

const mapDispatchToProps = {
  createCustomerBitcoinAddress
};

function mapStateToProps(state, ownProps) {
  return {
    addresses: state.bitcoinAddresses.addresses,
    btcPrice: parseFloat(state.bitcoinPrice.btcPrice)
  };
}

// TODO - Ensure that we subscribe to all addresses

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
