import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'antd';
import WrapRegistrationForm from './RegistrationForm'

class App extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={12} offset={5}>
            <WrapRegistrationForm />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
