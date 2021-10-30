import React from 'react';
import { useHistory } from "react-router-dom";
import CustomPageHeader from "../components/CustomPageHeader";
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { postNewQuestions } from '../apis/api';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};



const Questions = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const onFinish = (values:any) => {
    console.log('Received values of form:', values);
  };

  const submitForm = async() => {
    await postNewQuestions(form.getFieldsValue());
  }

  const clearForm = () => {
    form.resetFields()
  }

  return (
    <>
      <CustomPageHeader
        title="New Question"
        subtitle="this is the page for new question"
        onClickAction={() => history.push('/questions')}
      />
      <Form form={form} name="dynamic_form_item" className='new-question-form' onFinish={onFinish}>
        <Form.Item
            name="question"
            label="Question"
            rules={[
              { required: true },
              { type: 'string', min: 20 },
            ]}
          >
            <Input placeholder="Please type the question here" />
        </Form.Item>
        
        <Form.List
          name="choices"
          rules={[
            {
              validator: async (_, choices) => {
                if (!choices || choices.length < 2) {
                  return Promise.reject(new Error('At least 2 choices'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Choices' : ''}
                  required={true}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input option or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Please type the option for the answer here" style={{ width: '60%' }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '60%' }}
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item className='button-row'>
          <Button type="primary" onClick={submitForm}>
            Submit
          </Button>
          <Button type="primary" onClick={clearForm}>
            Clear
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Questions;