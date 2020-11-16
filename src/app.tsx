import * as React from "react";
import ToolBar from "@/components/tool-bar";
import DevPage from '@/views/dev-page';

import './styles/mixin.less';
import style from './app.less';
import { ipcRenderer } from "electron";

export default function App() {

  window.addEventListener('beforeunload', () => {
    ipcRenderer.send('beforeunload', {});
  });

  console.log('beforeunload');

    return (
      <div className={style.main}>
        <ToolBar />
        <section>
          <div>组件列表</div>
          <div>
            <DevPage
              activityComponentList={[
                {
                  name: 'text',
                  props: {
                    text: 'Hello world',
                  },
                  hash: 'abcd123',
                },
              ]}
              activityId={'123123123'}
              globalConfig={{
                a: '1',
                b: '2',
              }}
            />
          </div>
          <div>表单</div>
        </section>
      </div>
    );
}
