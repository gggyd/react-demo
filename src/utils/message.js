
import { Modal, notification } from 'antd'

export default {
  success({ title, content }) {
    Modal.success({
      title: title,
      content: content,
    })
  },
  
  openNotificationWithIcon({type, message, duration, description }) {
    notification.destroy();
    notification[type]({
      message: message,
      duration: duration,
      description: description
    })
  }
}