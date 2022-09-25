# custom-calendar-taro

[![NPM version](https://img.shields.io/npm/v/custom-calendar-taro.svg)](https://www.npmjs.com/package/custom-calendar-taro)
[![NPM downloads](https://img.shields.io/npm/dw/custom-calendar-taro)](https://www.npmjs.com/package/custom-calendar-taro)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

一款基于 taro3 的自定义日历组件，支持周，月的展示，组件改编自 zkytech 大佬的 taro-calendar-customizable，但是由于大佬的组件只支持 ts 开发，索性就自己改编了一下，
若有些许帮助，在下不胜荣幸，如有瑕疵，还请不吝赐教！

### 注意事项：```taro```的```swiper```在h5下```circular``` 为true时显示异常，请尽量避免。

> ## 特性

- 支持周,月视图
- 支持 js 与 ts
- 可定制样式
- 支持类taroui的marks圆点标记
- 可指定一周的起点
- 支持范围选择
- 支持滑动，切换动画

> ## 安装

```code
yarn add custom-calendar-taro
```

```code
npm install custom-calendar-taro
```

> ## 使用

```jsx
import Taro from "@tarojs/taro";
import Calendar from "custom-calendar-taro";

const Index = () => {
  return (
    <Calendar
      marks={[
        { value: "2021-06-11", color: "red", markSize: "9px" },
        { value: "2021-06-12", color: "pink", markSize: "9px" },
        { value: "2021-06-13", color: "gray", markSize: "9px" },
        { value: "2021-06-14", color: "yellow", markSize: "9px" },
        { value: "2021-06-15", color: "darkblue", markSize: "9px" },
        { value: "2021-06-16", color: "pink", markSize: "9px" },
        { value: "2021-06-23", color: "green", markSize: "9px" },
      ]}
      extraInfo={[
        { value: "2021-06-21", text: "生日", color: "red" },
        { value: "2021-06-22", text: "休假", color: "darkblue" },
        { value: "2021-06-23", text: "会议", color: "gray" },
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

```tsx
import Taro, { FunctionComponent } from "@tarojs/taro";
import Calendar from "taro-calendar-customizable";

const Index: FunctionComponent = () => {
  return (
    <Calendar
      marks={[
        { value: "2021-06-11", color: "red", markSize: "9px" },
        { value: "2021-06-12", color: "pink", markSize: "9px" },
        { value: "2021-06-13", color: "gray", markSize: "9px" },
        { value: "2021-06-14", color: "yellow", markSize: "9px" },
        { value: "2021-06-15", color: "darkblue", markSize: "9px" },
        { value: "2021-06-16", color: "pink", markSize: "9px" },
        { value: "2021-06-23", color: "green", markSize: "9px" },
      ]}
      isMultiSelect
      selectedDateColor="#346fc2"
      onDayClick={(item) => console.log(item)}
      onDayLongPress={(item) => console.log(item)}
      headStyle={{
        backgroundColor: "RGBA(12,36,157,0.5)",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        boxShadow: "0 0 5px RGBA(0,0,0,0.3)",
        width: "90vw",
        marginLeft: "5vw",
        zIndex: 2,
      }}
      bodyStyle={{
        backgroundColor: "lightblue",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        boxShadow: "0 0 5px RGBA(0,0,0,0.3)",
        borderTop: "none",
        width: "90vw",
        marginLeft: "5vw",
        paddingBottom: "0.4rem",
      }}
    />
  );
};

export default Index;
```

#### 详情如下两张图所示

**周视图**

![](https://github.com/P4X666/custom-calendar-taro/raw/main/doc/simpleWeek.png)

**月视图**

![](https://github.com/P4X666/custom-calendar-taro/raw/main/doc/simpleMonth.png)

同样可以使用 customStyleGenerator 来更精细化的定制

```tsx
import Taro, { FunctionComponent } from "@tarojs/taro";
import Calendar from "taro-calendar-customizable";

const Index: FunctionComponent = () => {
  const customStyleGenerator = {
    extraInfoStyle: {
      position: "absolute",
      fontSize: "0.5rem",
      right: "-0.8rem",
      top: "0",
    },
    dateStyle: {
      marginTop: "0.6rem",
      borderRadius: "30%",
    },
    markStyle: {
      top: "auto",
      bottom: "0",
      right: "50%",
      transform: "translateX(50%)",
    },
  };
  return (
    <CustomCalendar
      view={type}
      marks={[
        { value: "2021-06-11", color: "red", markSize: "9px" },
        { value: "2021-06-12", color: "pink", markSize: "9px" },
        { value: "2021-06-13", color: "gray", markSize: "9px" },
        { value: "2021-06-14", color: "yellow", markSize: "9px" },
        { value: "2021-06-15", color: "darkblue", markSize: "9px" },
        { value: "2021-06-16", color: "pink", markSize: "9px" },
        { value: "2021-06-23", color: "green", markSize: "9px" },
      ]}
      extraInfo={[
        { value: "2021-06-21", text: "生日", color: "red" },
        { value: "2021-06-22", text: "休假", color: "darkblue" },
        { value: "2021-06-23", text: "会议", color: "gray" },
      ]}
      customStyleGenerator={() => customStyleGenerator}
      selectedDateColor="#346fc2"
      onDayClick={(item) => console.log(item)}
      onDayLongPress={(item) => console.log(item)}
    />
  );
};

export default Index;
```
#### 详情如下两张图所示

**周视图**

![](https://github.com/P4X666/custom-calendar-taro/raw/main/doc/customWeek.png)

**月视图**

![](https://github.com/P4X666/custom-calendar-taro/raw/main/doc/customMonth.png)

至于其他的就看各位的审美了

> ### 自定义控制器
这里通过`bindRef`方法获取到了`CustomCalendar`的实例，通过调用内部方法`goNext()`以及`goPrev()`实现了翻页控制。
```jsx
import React, { useRef, useState } from 'react'
import { View, Button } from '@tarojs/components'
import CustomCalendar from 'custom-calendar-taro'
import './index.scss'

const Index = () => {

  const [type, setType] = useState<'week' | 'month'>('week')
  // 组件节点
  const CalendarComponent: any = useRef(null);
  // 修改视图类型
  const viewHandle = () => {
    setType(type === 'week' ? 'month' : 'week')
  }
  // 设置选中的日期
  const setSelectDay = date => {
    console.log(date);
  }
  // 设置当前的视图
  const setCurrentView = date => {
    console.log(date);
  }
  // 向前
  const goPre = () => {
    CalendarComponent.current.goPre()
  }
  // 向后
  const goNext = () => {
    CalendarComponent.current.goNext()
  }
  return (
    <View className='index'>
      <CustomCalendar
        view={type}
        marks={[
          { value: '2021-06-11', color: 'red', markSize: '9px' },
          { value: '2021-06-12', color: 'pink', markSize: '9px' },
          { value: '2021-06-13', color: 'gray', markSize: '9px' },
          { value: '2021-06-14', color: 'yellow', markSize: '9px' },
          { value: '2021-06-15', color: 'darkblue', markSize: '9px' },
          { value: '2021-06-16', color: 'pink', markSize: '9px' },
          { value: '2021-06-17', color: 'green', markSize: '9px' },
        ]}
        extraInfo={[
          { value: '2021-06-21', text: '生日', color: 'red' },
          { value: '2021-06-22', text: '休假', color: 'darkblue' },
          { value: '2021-06-23', text: '会议', color: 'gray' },
        ]}
        bindRef={(ref) => (CalendarComponent.current
          = ref)}

        onCurrentViewChange={setCurrentView}
        onDayClick={(item) => setSelectDay(item.value)}
      />
      <View>
        <Button onClick={viewHandle}>切换周和月</Button>
        <Button onClick={goPre}>上一页</Button>
        <Button onClick={goNext}>下一页</Button>
      </View>
    </View>
  )
}

export default Index;
```
> ## 参数说明

| 参数           | 说明                                                                       | 类型                                                             | 默认值           |
| -------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------- |
| view           | 视图模式                                                                   | `"week"`&#124;`"month"`                                          | `"month"`        |
| selectedDate   | 当前选中的时间，格式：`YYYY-MM-DD`                                         | `string`                                                         | `Date.now()`     |
| currentView    | 月视图时为当前视图显示的月份`YYYY-MM`，周视图下为当前显示的周内的某一天`YYYY-MM-DD`                                                | `string`                                                         | 当前系统时间年月 |
| minDate        | 最小的可选时间，格式：`YYYY-MM-DD`                                         | `string`                                                         | `1970-01-01`     |
| maxDate        | 最大的可选时间，格式：`YYYY-MM-DD`                                         | `string`                                                         | `null`           |
| isSwiper       | 是否可以滑动                                                               | `boolean`                                                        | `true`           |
| isVertical     | 是否垂直滑动                                                               | `boolean`                                                        | `false`          |
| isMultiSelect  | 是否范围选择                                                               | `boolean`                                                        | `false`          |
| marks          | 需要标记的时间                                                             | `Array<{value:string,color:string,markSize:string}>`             | `[]`             |
| extraInfo      | 额外信息                                                                   | `Array<{value:string,text:string,color:string,fontSize:string}>` | `[]`             |
| hideArrow      | 是否隐藏箭头                                                               | `boolean`                                                        | `false`          |
| hideController | 是否显示控制器                                                             | `false`                                                          | `boolean`        |
| showDivider    | 是否显示分割线                                                             | `boolean`                                                        | `false`          |
| bindRef        | 父组件通过 ref 可以调用内部方法，主要用于实现[自定义控制器](#自定义控制器) | `(ref:Calendar)=>any`                                            | -                |

> ## 事件说明

| 参数                | 说明                                   | 类型                           |
| ------------------- | -------------------------------------- | ------------------------------ |
| onClickPre          | 点击左箭头                             | `() => any`                    |
| onClickNext         | 点击右箭头                             | `() => any`                    |
| onDayClick          | 点击日期时候触发                       | `(item:{value:string}) => any` |
| onDayLongPress      | 长按日期时触发(长按事件与点击事件互斥) | `(item:{value:string}) => any` |
| onCurrentViewChange | 月份/周 改变时触发                     | `(value: string) => any`       |
| onSelectDate        | 选中日期时候触发                       | `(value: SelectDate) => any`   |

> ## 样式定制参数

| 参数                 | 说明                             | 类型                                                                                       |
| -------------------- | -------------------------------- | ------------------------------------------------------------------------------------------ |
| selectedDateColor    | 选中日期的颜色                   | `string`                                                                                   |
| customStyleGenerator | 单元格样式生成器                 | (dateInfo:[StyleGeneratorParams](#StyleGeneratorParams) ) => [CustomStyles](#CustomStyles) |
| pickerTextGenerator  | 日期选择器文本的生成器，参数为：当前视图中的任意一天           | `(currentView:Date)=>string`                                                               |
| headStyle            | head 整体样式                    | `CSSProperties`                                                                            |
| headCellStyle        | head 单元格样式                  | `CSSProperties`                                                                            |
| bodyStyle            | body 整体样式                    | `CSSProperties`                                                                            |
| leftArrowStyle       | 左箭头样式                       | `CSSProperties`                                                                            |
| rightArrowStyle      | 右箭头样式                       | `CSSProperties`                                                                            |
| datePickerStyle      | 日期选择器样式                   | `CSSProperties`                                                                            |
| pickerRowStyle       | 日期选择器&左右箭头 所在容器样式 | `CSSProperties`                                                                            |

## 类型说明

> ### StyleGeneratorParams

每个单元格包含的所有信息

| 参数         | 说明                                                                            | 类型                                  |
| ------------ | ------------------------------------------------------------------------------- | ------------------------------------- |
| date         | 当前月的第几天 1 ~ 31                                                           | `number`                              |
| currentMonth | 是否是属于当前显示的月份（比如 7 月 31 日不属于 8 月，但是会显示在 8 月这一页） | `boolean`                             |
| fullDateStr  | 时间 YYYY-MM-DD                                                                 | `string`                              |
| selected     | 是否被选中                                                                      | `boolean`                             |
| marked       | 是否标记                                                                        | `boolean`                             |
| hasExtraInfo | 是否含有额外信息                                                                | `boolean`                             |
| multiSelect  | 多选模式参数                                                                    | [MultiSelectParam](#MultiSelectParam) |
| startDay     | 指定周几为一行的起点，0 为周日，1 为周一                                        | `number`                              |

> ### CustomStyles

样式生成器返回结果

| 参数           | 说明           | 类型            |
| -------------- | -------------- | --------------- |
| dateStyle      | 日期样式       | `CSSProperties` |
| markStyle      | 标记样式       | `CSSProperties` |
| containerStyle | 容器单元格样式 | `CSSProperties` |
| extraInfoStyle | 额外信息样式   | `CSSProperties` |

> ### MultiSelectParam

多选模式参数

| 参数              | 说明             | 类型      |
| ----------------- | ---------------- | --------- |
| multiSelected     | 是否在选择范围内 | `boolean` |
| multiSelectedStar | 是否是选择起点   | `boolean` |
| multiSelectedEnd  | 是否是选择终点   | `boolean` |
