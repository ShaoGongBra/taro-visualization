import { Canvas, View, ViewProps } from '@tarojs/components';
import Taro from '@tarojs/taro';
import * as React from 'react';
import { useEffect } from 'react';

import { Renderer } from './renderer';

export interface IProps extends ViewProps {
  canvasId?: string;
  onContextCreate(gl: any): void;
}
const View3D = (props: IProps) => {
  useEffect(() => {
    setTimeout(() => {
      const query = Taro.createSelectorQuery();
      query
        .select(`#${props.canvasId ?? 'view3d'}`)
        .node()
        .exec((res) => {
          const canvas = res[0].node;
          const gl = canvas.getContext('webgl');
          // @ts-ignore
          gl.endFrameEXP = () => {};
          !!props.onContextCreate && props.onContextCreate(gl);
        });
    }, 0);
  }, []);

  return (
    <View>
      <Canvas canvasId={props.canvasId ?? 'view3d'} id={props.canvasId ?? 'view3d'} type="webgl" />
    </View>
  );
};

export default {
  View3D,
  Renderer
};
