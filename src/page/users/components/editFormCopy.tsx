import React, { useState, useImperativeHandle, useEffect, useCallback } from "react";
import { Button, Modal } from "antd";
function EditFormCopy(props: any) {
  const {visible, title, hideModal} = props;
  useEffect(() => {
    console.log("子组件copy渲染了", visible);
  })

  const handleOk = () => {
    hideModal()
  };

  return (
    <>
      <Modal
        title={title}
        open={visible}
        onOk={handleOk}
        onCancel={hideModal}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
export default React.memo(EditFormCopy);
