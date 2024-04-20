import emitter from '@/methods/emitter';

export default function handleResponse(response, title = '更新', successCallback = null) {
  if (response.data.success) {
    emitter.emit('push-message', {
      style: 'success',
      title: `${title}成功`,
    });
    if (successCallback) {
      successCallback(); // 执行成功响应时的回调函数
    }
  } else {
    // 有些訊息是字串，有些則是陣列，在此統一格式
    const message = typeof response.data.message === 'string'
      ? [response.data.message] : response.data.message;
    emitter.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`,
      content: message.join('、'),
    });
  }
}
