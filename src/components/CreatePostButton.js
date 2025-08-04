import axios from "axios";
import React, { Component } from "react";
import { BASE_URL, TOKEN_KEY } from "../constant";
import { Button, message, Modal } from "antd";
import PostForm from "./PostForm";

export default class CreatePostButton extends Component {
  state = {
    visible: false,
    confirmLoading: false,
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    this.postForm
      .validateFields()
      .then((form) => {
        const { description, uploadPost } = form;
        const { type, originFileObj } = uploadPost[0];
        const postType = type.match(/^(image|video)/g)[0];
        if (postType) {
          const formData = new FormData();
          formData.append("message", description);
          formData.append("media_file", originFileObj);
          axios
            .post(`${BASE_URL}/upload`, formData, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                message.success("Post created successfully");
                this.postForm.resetFields();
                this.handleCancel();
                this.props.onShowPost(postType);
                this.setState({ confirmLoading: false });
              }
            })
            .catch((error) => {
              console.error("Create post error:", error);
              message.error("Create post failed");
              this.setState({ confirmLoading: false });
            });
        }
      })
      .catch((error) => {
        console.error("Validate error:", error);
      });
  };
  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false,
    });
  };
  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create New Post
        </Button>
        <Modal
          title="Create New Post"
          visible={visible}
          onOk={this.handleOk}
          okText="Create"
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <PostForm ref={(ref) => (this.postForm = ref)} />
        </Modal>
      </div>
    );
  }
}
