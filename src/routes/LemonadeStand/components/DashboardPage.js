import React, { Component, PropTypes } from 'react';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Buttons';
import { bindClassMethods } from 'util/commonUtil';
import { Container, Row } from 'components/Layout';

const propTypes = {
  addresses: PropTypes.object
};

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: ''
    };
    bindClassMethods.call(this, 'handleClick', 'handleChange');
  }

  handleClick(event) {
    event.preventDefault();
    console.log(this.state)
    // TODO - Call Action to create bitcoin address.
  }

  handleChange(event) {
    this.setState({
      customerName: event.target.value
    });
  }

  render() {
    return (
    <Container>
      <Row>
        <div className="col-md-6">
          Placeholder
        </div>
        <div className="col-md-6">
        <form className="form">
          <Input placeholder="Customer Name" value={this.state.customerName} onChange={this.handleChange}/>
          <Button className="btn btn-default" onClick={this.handleClick}>Create Bitcoin Address</Button>
        </form>
        </div>
      </Row>
    </Container>
    );
  }
}

DashboardPage.propTypes = propTypes;

export default DashboardPage;
