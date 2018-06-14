import React, {Component} from 'react'
import {Form, Input, Button} from 'antd';

const FormItem = Form.Item;

class RegistrationForm extends Component {

  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this
      .props
      .form
      .validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Submit data: ', values);
        }
      });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    });
  }

  passwordMustMoreThan6Chars = (rule, value, callback) => {
    if (value && value.length < 6) {
      callback('password ต้องมากกว่า 6 ตัวอักษร!');
    } else {
      callback();
    }
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('password ไม่ตรงกัน!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm_password'], {force: true});
    }
    callback();
  }

  validatePhoneNumber = (rule, value, callback) => {
    var reg = /^\d{1,10}$/;
    if (value && !reg.test(value)) {
      callback('เบอร์โทรต้องเป็นตัวเลข 1-10 หลัก');
    } else {
      callback();
    }
  }

  render() {

    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 8
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 16
        }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (

      <Form onSubmit={this.handleSubmit} style={{
        marginTop: 50
      }}>

        <FormItem {...formItemLayout} label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'รูปแบบอีเมล์ไม่ถูกต้อง!'
              }, {
                required: true,
                message: 'กรุณากรอกอีเมล์!'
              }
            ]
          })(<Input/>)}
        </FormItem>

        <FormItem {...formItemLayout} label="Password">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'กรุณากรอกรหัสผ่าน!'
              }, {
                validator: this.passwordMustMoreThan6Chars
              }, {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input type="password"/>)}
        </FormItem>

        <FormItem {...formItemLayout} label="Confirm Password">
          {getFieldDecorator('confirm_password', {
            rules: [
              {
                required: true,
                message: 'กรุณายืนยันรหัสผ่าน!'
              }, {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur}/>)}
        </FormItem>

        <FormItem {...formItemLayout} label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: 'กรุณากรอกเบอร์โทรศัพท์!'
              }, {
                validator: this.validatePhoneNumber
              }
            ]
          })(<Input style={{
            width: '100%'
          }}/>)}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>

      </Form>

    )
  }

}

const WrapRegistrationForm = Form.create()(RegistrationForm);

export default WrapRegistrationForm