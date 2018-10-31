import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
/* replace-start */
import './index.less';
/* replace-end */

class Content9 extends React.PureComponent {
  getBlockChildren = (block, i) => {
    const { isMobile } = this.props;
    const item = block.children;
    const textWrapper = (
      <QueueAnim
        key="text"
        leaveReverse
        delay={isMobile ? [0, 100] : 0}
        {...item.textWrapper}
      >
        <div key="time" {...item.time}>
          {
            /* replace-start-value = item.time.children */
            React.createElement('span', { dangerouslySetInnerHTML: { __html: item.time.children } })
            /* replace-end-value */
          }
        </div>
        <h2 key="title" {...item.title}>
          <i {...item.icon}><img src={item.icon.children} alt="img" /></i>
          {
            /* replace-start-value = item.title.children */
            React.createElement('span', { dangerouslySetInnerHTML: { __html: item.title.children } })
            /* replace-end-value */
          }
        </h2>
        <p key="p" {...item.content}>
          {
            /* replace-start-value = item.content.children */
            React.createElement('span', { dangerouslySetInnerHTML: { __html: item.content.children } })
            /* replace-end-value */
          }
        </p>
      </QueueAnim>
    );
    return (
      <OverPack
        key={i.toString()}
        {...block}
        /* replace-start */
        data-edit="OverPack"
      /* replace-end */
      >
        {isMobile && textWrapper}
        <QueueAnim
          className="image-wrapper"
          key="image"
          type={isMobile ? 'right' : 'bottom'}
          leaveReverse
          delay={isMobile ? [100, 0] : 0}
          {...item.imgWrapper}
        >
          <div key="image" {...item.img}>
            <img src={item.img.children} alt="img" />
          </div>
          <div key="name" className="name-wrapper">
            <p key="name" {...item.name}>
              {
                /* replace-start-value = item.name.children */
                React.createElement('span', { dangerouslySetInnerHTML: { __html: item.name.children } })
                /* replace-end-value */
              }
            </p>
            <p key="post" {...item.post}>
              {
                /* replace-start-value = item.post.children */
                React.createElement('span', { dangerouslySetInnerHTML: { __html: item.post.children } })
                /* replace-end-value */
              }
            </p>
          </div>
        </QueueAnim>

        {!isMobile && textWrapper}
      </OverPack>
    );
  }

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const children = dataSource.block.children.map(this.getBlockChildren);
    return (
      <div
        {...props}
        {...dataSource.wrapper}
      >
        <div {...dataSource.page}>
          <div
            {...dataSource.titleWrapper}
            /* replace-start */
            data-edit="titleWrapper"
          /* replace-end */
          >
            {
              dataSource.titleWrapper.children.map((item, i) => (
                React.createElement(item.name.indexOf('title') === 0 ? 'h1' : 'div', { key: i.toString(), ...item }, (
                  item.children.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/)
                    ? React.createElement('img', { src: item.children, alt: 'img' })
                    : /* replace-start-value = item.children */React.createElement('span', { dangerouslySetInnerHTML: { __html: item.children } })
                  /* replace-end-value */
                ))
              ))
            }
          </div>
          <div {...dataSource.block}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}


export default Content9;
