import { InboxOutlined } from "@mui/icons-material";
import { Form, Input, Upload } from "antd";
import React, { forwardRef } from "react";

const PostForm = forwardRef((props, formRef) => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <Form name="validate_other" {...formItemLayout} ref={formRef}>
      <Form.Item
        name="description"
        label="Message"
        rules={[{ required: true, message: "Please input message!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Dragger">
        <Form.Item
          name="uploadPost"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
          rules={[{ required: true, message: "Please upload a file!" }]}
        >
          <Upload.Dragger name="files" beforeUpload={() => false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
    </Form>
  );
});

export default PostForm;
