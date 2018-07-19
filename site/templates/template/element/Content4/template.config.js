const component = require('./index');
const less = require('!raw-loader!./index.less');
const templateStr = require('!raw-loader!./index');

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper content4-wrapper',
    },
    page: {
      className: 'home-page content4',
    },
    OverPack: {
      playScale: 0.3,
      className: '',
    },
    title: {
      children: '蚂蚁金融云提供专业的服务',
      className: 'content-bottom',
    },
    titleContent: {
      children: '科技想象力，金融创造力',
      className: 'content4-title-content',
    },
    video: {
      className: 'content4-video',

      children: {
        video: 'https://os.alipayobjects.com/rmsportal/EejaUGsyExkXyXr.mp4',
        image: 'https://zos.alipayobjects.com/rmsportal/HZgzhugQZkqUwBVeNyfz.jpg',
      },
    },
  },
};
