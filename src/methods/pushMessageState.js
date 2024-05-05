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

// 方法二
// export default function handleResponse(response, title = '更新', successCallback = null) {
//   const message = response?.data?.message || ['操作失败，请稍后再试。'];
//   const style = response?.data?.success ? 'success' : 'danger';
//   const finalTitle = response?.data?.success ? `${title}成功` : `${title}失敗`;

//   emitter.emit('push-message', {
//     style,
//     title: finalTitle,
//     content: Array.isArray(message) ? message.join('、') : message,
//   });

//   if (response?.data?.success && successCallback) {
//     successCallback(); // 执行成功响应时的回调函数
//   }
// }
