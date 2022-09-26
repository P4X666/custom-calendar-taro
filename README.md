# custom-calendar-taro

[![NPM version](https://img.shields.io/npm/v/custom-calendar-taro.svg)](https://www.npmjs.com/package/custom-calendar-taro)
[![NPM downloads](https://img.shields.io/npm/dw/custom-calendar-taro)](https://www.npmjs.com/package/custom-calendar-taro)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

一款基于 taro3 的自定义日历组件，支持周，月的展示，若有些许帮助，在下不胜荣幸，如有瑕疵，还请不吝赐教！

### 注意事项：因```taro```的```swiper```在h5下```circular``` 为true时显示异常，所以若业务中涉及h5，可不用考虑此组件。

> ## 特性

- 支持周,月视图
- 可自定义渲染
- 支持类taroui的marks圆点标记
- 可指定一周的起点

> ## 安装

```code
yarn add custom-calendar-taro
```

```code
npm install custom-calendar-taro
```

> ## 使用

详细使用方式可见 pages 下的 index 及 custRender

```jsx
import Taro from "@tarojs/taro";
import Calendar from "custom-calendar-taro";
import 'custom-calendar-taro/dist/index.css';

const Index = () => {
  return (
    <Calendar
      marks={[
        { value: '2022-09-21', color: 'red' },
        { value: '2022-09-22', color: 'pink' },
        { value: '2022-09-23', color: 'gray' },
        { value: '2022-09-24', color: 'yellow' },
        { value: '2022-09-25', color: 'darkblue' },
        { value: '2022-09-26', color: 'pink' },
        { value: '2022-09-27', color: 'green' }
      ]}
      extraInfo={[
        { value: '2022-09-25', text: '生日', color: 'red' },
        { value: '2022-09-26', text: '休假', color: 'darkblue' },
        { value: '2022-09-27', text: '会议', color: 'gray' }
      ]}
      selectedDateColor="#346fc2"
      onDayClick={(item) => console.log(item)}
      onDayLongPress={(item) => console.log(item)}
    />
  );
};

export default Index;
```

> ### 样式定制

#### 默认样式如下

**周视图**

![](https://github.com/P4X666/custom-calendar-taro/raw/main/doc/defaultWeek.png)

**月视图**

![](https://github.com/P4X666/custom-calendar-taro/raw/main/doc/defaultMonth.png)

因为业务的复杂多变，通常会有自定义的样式控制  

**详细使用方式可见 pages 下的 custRender**

![](https://github.com/P4X666/custom-calendar-taro/raw/main/doc/custRender.png)

```tsx
import Taro, { FunctionComponent } from "@tarojs/taro";
import Calendar from "taro-calendar-customizable";

const Index: FunctionComponent = () => {
  const custWeekRender = (weekItem: string) => {
    return (
      <View style={['六', '日'].includes(weekItem) ? { color: 'red' } : {}}>
        {weekItem}
      </View>
    );
  };
  const custDayRender = (dayProps: DayProps) => {
    const isRest = [6, 0].includes(dayProps.weekDay);
    return (
      <>
        <View style={isRest ? { color: 'red' } : {}}>{dayProps.day}</View>
        {isRest && <View className={styles.tips}>休息</View>}
      </>
    );
  };
  return (
    <Calendar
      className={styles.cust}
      onDayClick={(item) => console.log(item)}
      onDayLongPress={(item) => console.log(item)}
      custDayRender={custDayRender}
      custWeekRender={custWeekRender}
    />
  );
};

export default Index;
```

> ## class组件及function组件各自获取ref的方式
### 1. class 组件

```jsx
import React, { Component, createRef } from 'react';
...
constructor(props) {
  super(props);
  this.custCalendarInstance= createRef();
}
goPre = () => {
  this.custCalendarInstance.current.goPre();
};
goNext = () => {
  this.custCalendarInstance.current.goNext();
};
...
<Calendar ref={this.custCalendarInstance} />
```

### 2. function 组件

```jsx
import React, { useRef } from 'react';
...
const custCalendarInstance = useRef();
  const goPre = () => {
    custCalendarInstance.current.goPre();
  };
  const goNext = () => {
    custCalendarInstance.current.goNext();
  };
...
<Calendar ref={custCalendarInstance} />
...
```
> ## 参数说明

| 参数           | 说明                                                     | 类型                         | 默认值           |
| -------------- | ------------------------------------------------------  | --------------------------- | ---------------- |
| view           | 视图模式                                                 | `"week"`&#124;`"month"`    | `"month"`          |
| selectedDate   | 当前选中的时间，格式：`YYYY-MM-DD`                        | `string`                      | `Date.now()`     |
| currentView    | 月视图时为当前视图显示的月份`YYYY-MM`，周视图下为当前显示的周内的某一天`YYYY-MM-DD`|`string`     | 当前系统时间年月   |
| minDate        | 最小的可选时间，格式：`YYYY-MM-DD`                           | `string`                   | `1970-01-01`     |
| maxDate        | 最大的可选时间，格式：`YYYY-MM-DD`                           | `string`                   | `2100-12-31`     |
| isSwiper       | 是否可以滑动                                                | `boolean`                  | `true`          |
| isVertical     | 是否垂直滑动                                                | `boolean`                  | `false`          |
| monthWrapHeigh  | 月视图下的高度                                             | `string`                   | `19rem`          |
| weekWrapHeight  | 周视图下的高度                                             | `string`                   | `3rem`          |
| marks          | 需要标记的时间                                            | `Array<{value:string,color:string}>` | `[]`    |
| extraInfo      | 额外信息                      | `Array<{value:string,text:string,color:string,fontSize:string}>` | `[]`    |
| hideArrow      | 是否隐藏箭头                                              | `boolean`                    | `false`          |
| hideController | 是否显示控制器                                               | `boolean`                  | `false`        |
| ref        | 组件实例，[class 组件及 function 组件各自获取ref的方式](#class组件及function组件各自获取ref的方式) | `(ref:Calendar)=>any` | - |  
| custDayRender        | 自定义渲染日期的方法 | (props: [DayProps](#DayProps)) => ReactElement`                                        | -                | -                |

> ## 事件说明

| 参数                | 说明                                   | 类型                           |
| ------------------- | -------------------------------------- | ------------------------------ |
| onDayClick          | 点击日期时候触发                       | `(info: DayType, dateFormate: string) => any` |
| onDayLongPress      | 长按日期时触发(长按事件与点击事件互斥) | `(info: DayType, dateFormate: string) => any` |
| onSelectDate        | 选中日期时候触发                       | `(value: SelectDate) => any`   |                                                                        |

## 类型说明

> ### DayProps

每个单元格包含的所有信息

| 参数         | 说明                                             | 类型                                  |
| ------------ | ----------------------------------------------- | ------------------------------------- |
| day         | 当前月的第几天 1 ~ 31                              | `number`                              |
| selected   | 是否被选中                                           | `boolean`                             |
| hasMarker  | 当前日期是否有mark                                 | `boolean`                              |
| extraInfo     | 当前日期的 extraInfo                            | `{text: string, color: string}`         |
| disabled       | 是否为禁用日期                                  | `boolean`                             |
| notCurMonth | 是否为非本月                                       | `boolean`                             |
| isToday     | 是否为当天的日期                                        | `boolean`                              |
| dateFormate     | 格式化后的日期                                        | `string`                              |
