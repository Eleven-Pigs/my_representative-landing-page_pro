const component = require('./index');
const templateStr = require('!raw-loader!./index');
const less = require('!raw-loader!./index.less');

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper content1-wrapper',
    },
    OverPack: {
      className: 'home-page content1',
    },
    imgWrapper: {
      className: 'content1-img',
      md: 8,
      xs: 24,
    },
    img: {
      children: 'https://zos.alipayobjects.com/rmsportal/nLzbeGQLPyBJoli.png',
    },
    textWrapper: {
      className: 'content1-text',
      md: 16,
      xs: 24,
    },
    title: {
      children: '企业资源管理',
    },
    content: {
      children: '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。' +
        '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。' +
        '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。',
    },
  },
};
