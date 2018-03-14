import React from 'react';
// import ReactDOM from 'react-dom';
// import { scrollScreen } from 'rc-scroll-anim';
// import { enquireScreen } from 'enquire-js';
import { connect } from 'react-redux';
import { mobileTitle } from 'rc-editor-list/lib/utils';
import webData from './element/template.config';
import {
  getEditDomData,
  mergeEditDataToDefault,
} from './utils';
import { getData, format } from '../../edit/template/utils';
import { getURLData } from '../../theme/template/utils';
import { getUserData } from '../../edit-module/actions';


// const Point = require('./other/Point');

const $ = window.$ || {};
const stateSort = { default: 0, hover: 1, focus: 2, active: 3 };

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.isEdit = getURLData('isEdit');
    if (!this.isEdit) {
      const { dispatch } = props;
      dispatch(getUserData());
    } else {
      $(document.body).append(`
      <style type="text/css">body::-webkit-scrollbar{display:none;}</style>
      `);
    }
    this.styleTag = this.createStyle();
    this.state = {
      templateData: props.templateData,
    };
  }
  componentDidUpdate() {
    if (this.isEdit) {
      this.setData();
    }
  }

  componentWillMount() {
    if (this.isEdit) {
      window.addEventListener('message', this.messageHandle);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.isEdit) {
      this.setState({
        templateData: nextProps.templateData,
      }, this.setScrollToWindow);
    }
  }
  componentWillUpdate() {
    this.scrollTop = window.scrollY;
  }

  setData = () => {
    const editData = getEditDomData(this.dom.children);
    // Uncaught DOMException: Failed to execute 'postMessage' on 'Window': HTMLDivElement object could not be cloned.
    // window.parent.postMessage(editData, '*');
    window.parent.receiveDomData(editData, window);
  }

  messageHandle = (e) => {
    this.setState({
      templateData: e.data,
    }, this.setScrollToWindow);
  }

  setScrollToWindow = () => {
    // 拖动模板后，滚动回位；
    if (this.scrollTop) {
      window.scrollTo(0, this.scrollTop);
    }
  }

  createStyle = () => {
    const style = document.createElement('style');
    document.body.appendChild(style);
    return style;
  }

  setStyleData = (style) => {
    if (!this.isEdit) {
      const getCssToString = (css, className) => Object.keys(css).sort((a, b) => (
        stateSort[a] - stateSort[b]
      )).map((key) => {
        switch (key) {
          case 'default':
            return css[key].trim() && `${className} {${css[key]}}`;
          default:
            return css[key].trim() && `${className}:${key} {${css[key]}}`;
        }
      }).filter(c => c);
      let cssStyle = '';
      let cssMobileCss = '';
      Object.keys(style).forEach((key) => {
        const tempStyle = style[key];
        Object.keys(tempStyle).forEach((name) => {
          const item = tempStyle[name];
          const cssName = item.className;
          const css = getCssToString(item.css, cssName);
          const mobileCss = getCssToString(item.mobileCss, cssName);
          if (css.length) {
            cssStyle += css.join();
          }
          if (mobileCss.length) {
            cssMobileCss += mobileCss.join();
          }
        });
      });
      this.styleTag.innerHTML = format(`${cssStyle || ''}${cssMobileCss
        ? `${mobileTitle}${cssMobileCss}}` : ''}`, 'css');
    }
  }

  getDataToChildren = () => {
    const { templateData } = this.state;
    const { data, funcData } = templateData;
    const func = { ...funcData };
    const template = data.template;
    this.setStyleData(data.style);
    const otherData = data.other || '';
    const configData = data.config || {};
    const children = template.map((key) => {
      const keys = key.split('_');
      const componentName = keys[0];
      const componentData = webData[componentName];
      const d = configData[key] || {};
      const dataSource = mergeEditDataToDefault(d, componentData);
      return React.createElement(componentData.component, {
        'data-id': key,
        key,
        dataSource,
        func: func[key],
      });
    });
    return children;
  }

  getTemplatesToChildren = () => {
    const { templateData } = this.state;
    const { type } = templateData;
    switch (type) {
      case 'default':
        return (
          <div> 加载中。。。 </div>
        );
      case 'error':
        return (
          <div> 数据加载错误。。。</div>
        );
      default:
        return this.getDataToChildren();
    }
  };
  render() {
    const children = this.getTemplatesToChildren();
    return (
      <div
        id="templates-wrapper"
        className="templates-wrapper"
        ref={(c) => { this.dom = c; }}
      >
        {children}
      </div>);
  }
}

export default connect(getData)(Layout);
