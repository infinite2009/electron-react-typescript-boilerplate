/**
 * Created by luodongyang on 2020-11-12
 */

import { Button } from 'antd';
import React, { ReactComponentElement } from 'react';
import { CodeOutlined } from '@ant-design/icons';

export interface IToolBarProps {
}

export interface IToolBarState {
}

export default class ToolBar extends React.Component<IToolBarProps, IToolBarState> {
  constructor(props: IToolBarProps) {
    super(props);
    this.state = {} as IToolBarState;
  }

  render(): ReactComponentElement<any> | null {
    return (
      <div>
        <Button type="primary" >
          <CodeOutlined />
        </Button>
      </div>
    );
  }
}
