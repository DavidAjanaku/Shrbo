import React from 'react';
import { Modal } from 'antd';

const Popup = ({ isModalVisible, handleCancel, children, title, className, centered, width }) => {
  // console.log('Modal Content:', children);

  return (
    <div>
      <Modal
        title={title}
        open={isModalVisible}
        onCancel={handleCancel}
        className={className}
        centered={centered}
        width={width}
        footer={null}
      >
        <div className='h-96 overflow-scroll'>
        {children}
        </div>
      </Modal>
    </div>
  );
};

export default Popup;
