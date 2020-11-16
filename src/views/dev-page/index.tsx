/**
 * Created by luodongyang on 2020-11-12
 */

import React, { ReactComponentElement } from 'react';
import { ipcRenderer } from 'electron';
import DynamicObject from '@/interfaces/dynamic-object';

import styles from './index.less';

interface NezhaState {
  comList: DynamicObject;
}

export interface IDevPageProps {
  activityComponentList: DynamicObject[];
  globalConfig: DynamicObject;
  activityId: string;
}

export interface IDevPageState {
  componentDict: DynamicObject;
}

export default class DevPage extends React.Component<
  IDevPageProps,
  IDevPageState
> {
  constructor(props: IDevPageProps) {
    super(props);
    this.state = {
      componentDict: {},
    } as IDevPageState;
  }

  componentDidMount() {
    ipcRenderer.on('main-process-messages', (event, args) => {
      const { projectConfig } = args;
      const nezhaObjectKey = `nezha_${projectConfig.project}`;
      const componentDict =
        // @ts-ignore
        (window[nezhaObjectKey] as NezhaState).comList;
      this.setState({
        componentDict,
      });
    });
  }

  renderComponentList() {
    const { componentDict } = this.state;
    const { activityComponentList, globalConfig, activityId } = this.props;
    return activityComponentList.map(({ name, props, hash }, index) => {
      const Com = componentDict[name];
      console.log('Com: ', Com);
      if (Com) {
        return (
          <Com
            key={index}
            {...props}
            CName={name}
            globalConfig={globalConfig}
            pageId={activityId}
            providerProps={null}
            editorFlag={'edit'}
          />
        );
      }
      console.log('component not found: ', Com);
      return null;
    });
  }

  render(): ReactComponentElement<any> | null {
    return <div className={styles.main}>{this.renderComponentList()}</div>;
  }
}
