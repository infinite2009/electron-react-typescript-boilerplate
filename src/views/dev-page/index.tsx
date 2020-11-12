/**
 * Created by luodongyang on 2020-11-12
 */

import React, { ReactComponentElement } from 'react';

import styles from './index.less';
import ToolBar from '@/components/tool-bar';

export interface IDevPageProps {
}

export interface IDevPageState {
}

export default class DevPage extends React.Component<IDevPageProps, IDevPageState> {
  constructor(props: IDevPageProps) {
    super(props);
    this.state = {} as IDevPageState;
  }

  render(): ReactComponentElement<any> | null {
    return (
      <div className={styles.main}>
        <ToolBar />
        <section>
          <div>
            组件列表
          </div>
          <div>
            组件画布
          </div>
          <div>
            表单
          </div>
        </section>
      </div>
    );
  }
}
