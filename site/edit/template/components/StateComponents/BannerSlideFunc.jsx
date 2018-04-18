import React from 'react';
import { Pagination, Popover, Button, Icon } from 'antd';
import { getRandomKey } from 'rc-editor-list/lib/utils';
import { mergeEditDataToDefault } from '../../../../utils';
import tempData from '../../../../templates/template/element/template.config';
import ListSort from './ListSort';
import { setTemplateData } from '../../../../edit-module/actions';

export default class BannerSlideFunc extends React.Component {
  componentDidUpdate() {
    this.pop.tooltip.tooltip.trigger.forcePopupAlign();
  }
  getCurrentDataSource = (props) => {
    const { templateData, dataId } = props;
    const id = dataId.split('_')[0];
    return mergeEditDataToDefault(templateData.data.config[dataId], tempData[id]);
  }
  onPaginationChange = (currentPage) => {
    const { iframe, templateData, dataId, reRect } = this.props;
    reRect();

    const template = {
      ...templateData,
      funcData: {
        [dataId]: {
          currentPage,
        },
      },
    };
    iframe.postMessage(template, '*');
  }

  setDataToTemplateData = (dataSource) => {
    const { templateData, dataId, reRect } = this.props;
    reRect();
    const newData = {
      ...templateData,
    };
    newData.data.config[dataId] = newData.data.config[dataId] || {};
    newData.data.config[dataId].dataSource = dataSource;
    this.props.dispatch(setTemplateData(newData));
  }

  onSlideDelete = (item, dataSource) => {
    const data = this.getDataSourceChild(dataSource);
    data.children = data.children
      .map(node => (node === item ? 'delete' : node));
    this.setDataToTemplateData(dataSource);
  }
  onSlideAdd = (dataSource) => {
    const data = this.getDataSourceChild(dataSource);
    const defaultData = { ...data.children[data.children.length - 1] };
    defaultData.name = `elem~${getRandomKey()}`;
    data.children.push(defaultData);
    this.setDataToTemplateData(dataSource);
  }

  onListChange = (e, dataSource) => {
    const data = this.getDataSourceChild(dataSource);
    const newChildrenArray = e.map((item) => {
      return data.children.filter((node) => {
        return node.name === item.key;
      })[0];
    });
    data.children = newChildrenArray;
    this.setDataToTemplateData(dataSource);
  }

  getDataSourceChild = (dataSource) => {
    const { data } = this.props;
    let c = dataSource;
    data.childRoute.forEach((key) => {
      c = c[key];
    });
    return c;
  }

  getPopChild = (dataSource) => {
    const { children } = this.getDataSourceChild(dataSource);
    const child = children.filter(item => item !== 'delete');
    const listChild = child.map((item) => {
      return (
        <div key={item.name} className="banner-slide-manage">
          <div className="manage-name">{item.name}</div>
          <div className="manage-delete">
            <Button
              onClick={() => {
                this.onSlideDelete(item, dataSource);
              }}
              size="small"
              shape="circle"
              icon="delete"
              disabled={child.length === 1}
            />
          </div>
        </div>
      );
    });
    return [
      <ListSort
        dragClassName="list-drag-selected"
        className="manage-list"
        key="list"
        dragElement={<div className="manage-icon"><Icon type="bars" /></div>}
        onChange={(e) => {
          this.onListChange(e, dataSource);
        }}
      >
        {listChild}
      </ListSort>,
      <div key="button" className="manage-button">
        <Button onClick={() => { this.onSlideAdd(dataSource); }} type="primary">添加分页</Button>
      </div>,
    ];
  }

  render() {
    const { data } = this.props;
    const popChild = this.getPopChild(this.getCurrentDataSource(this.props), data.childRoute);
    return (
      <div className="banner-slide-wrapper">
        <div className="banner-slide">
          <Pagination
            size="small"
            simple
            pageSize={1}
            current={data.current}
            total={data.total}
            onChange={this.onPaginationChange}
          />
          <Popover
            content={popChild}
            title="管理 banner 页数"
            getPopupContainer={triggerNode => triggerNode.parentNode}
            overlayClassName="manage-wrapper"
            ref={(c) => {
              this.pop = c;
            }}
          >
            <Button type="primary" icon="bars" size="small" shape="circle" />
          </Popover>
        </div>
      </div>
    );
  }
}
