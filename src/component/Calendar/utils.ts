import dayjs from "dayjs";
import { DateDetail, DaysType, DayType, WeekDayType } from "./type";

/** 获取当前月的年月 */
export const getCurMonthViewDetail = (year: number, month: number) => {
  let curMonth = month - 1;
  if (curMonth > 11) {
    year++;
    curMonth -= 12;
  }
  if (curMonth < 0) {
    year--;
    curMonth += 12;
  }
  return {
    year,
    month: curMonth + 1,
  }
}

/** 获取当前周的年月日 */
export const getCurWeekViewDetail = (year: number, month: number, day: number): DateDetail => {
  const curMonth = month - 1;
  const curDate = new Date();
  curDate.setFullYear(year, curMonth, day);
  return {
    year: curDate.getFullYear(),
    month: curDate.getMonth() + 1,
    day: curDate.getDate()
  }
}

/** 获取指定月有多少天 */
export const getCountDays = (year: number, month: number): DaysType => {
  const cur = getCurMonthViewDetail(year, month);
  const curMonth = cur.month - 1;
  const curDate = new Date();
  // 将日期设置为32，表示自动计算为下个月的第几天（这取决于当前月份有多少天）
  curDate.setFullYear(year, curMonth, 32);
  const result = {
    year: cur.year,
    month: curMonth + 1,
    days: 32 - curDate.getDate()
  };
  return result;
};
// 获取指定天是周几
export const getWeekDay = (year: number, month: number, day: number): WeekDayType => {
  const curDate = new Date();
  curDate.setFullYear(year, month - 1, day);
  return curDate.getDay() as WeekDayType;
};

const fillDays = (days: DayType[], year: number, month: number, day: number, method = 'push') => {
  days[method]({
    year,
    month,
    day,
    weekDay: getWeekDay(year, month, day)
  });
}

/** 获取指定月的天的数据 */
export const getMonthDays = (year: number, month: number, startWeekDay: number = 1): DayType[] => {
  const days: DayType[] = [];
  const curMonthDays = getCountDays(year, month).days;
  const firstWeekDay = getWeekDay(year, month, 1);
  // 将第一周填满
  if (firstWeekDay !== startWeekDay) {
    // 计算出 用户传入的 startWeekDay 与 本月的1号的 WeekDay 之间的差距
    // 缺少几天补几天
    const diff = Math.abs(startWeekDay - (firstWeekDay || 7));
    let preMonth = month - 1;
    let preMonthDaysValue = getCountDays(year, preMonth);
    const preYear = preMonthDaysValue.year;
    preMonth = preMonthDaysValue.month;
    let preDays = preMonthDaysValue.days;

    for (let i = 0; i < diff; i++) {
      const preDay = preDays - diff + i + 1;
      fillDays(days, preYear, preMonth, preDay);
    }
  }
  for (let i = 0; i < curMonthDays; i++) {
    const day = i + 1;
    fillDays(days, year, month, day);
  }

  // 保证每个数组的个数都为42，便于统一ui展示
  const restLength = 42 - days.length;
  for (let i = 0; i < restLength; i++) {
    let nextMonth = month + 1;
    let nextMonthDaysValue = getCountDays(year, nextMonth);
    const nextYear = nextMonthDaysValue.year;
    nextMonth = nextMonthDaysValue.month;
    const nextDay = i + 1;
    fillDays(days, nextYear, nextMonth, nextDay);
  }
  return days;
};
/** 
 * 获取指定周的天的数据
 * 默认取当前月的第一天所在周
 *  */
export const getWeekDays = (year: number, month: number, day: number, startWeekDay: number = 1): DayType[] => {
  const days: DayType[] = [];
  let firstWeekDay = getWeekDay(year, month, day);
  let _day = day;
  let _firstWeekDay = firstWeekDay || 7;
  // 第一次循环 将当天及其之前直到 startWeekDay 的所有天数填充
  while (_firstWeekDay > 0) {
    // 当 _day 为 0 时，说明该天为上个月的最后一天
    if (_day === 0) {
      const preDateInfo = getCountDays(year, month - 1);
      const preYear = preDateInfo.year;
      const preMonth = preDateInfo.month;
      _day = preDateInfo.days;
      fillDays(days, preYear, preMonth, _day, 'unshift');
    } else {
      fillDays(days, year, month, _day, 'unshift');
    }
    _day--;
    _firstWeekDay--;
  }
  if (days.length < 7) {
    _day = day;
    _firstWeekDay = firstWeekDay;
    const curDateInfo = getCountDays(year, month);
    // 第二次循环 将当天以后剩余的周天数填充
    while (true) {
      _day++;
      _firstWeekDay++;
      if (_firstWeekDay > startWeekDay + 6) {
        break;
      }
      // 当 _day 比当前月总天数还多时，说明该天已经进入下个月
      if (_day > curDateInfo.days) {
        const nextDateInfo = getCountDays(year, month + 1);
        const nextYear = nextDateInfo.year;
        const nextMonth = nextDateInfo.month;
        _day = 1;
        fillDays(days, nextYear, nextMonth, _day);
      } else {
        const lastDay = days[days.length - 1];
        if (lastDay.month > month) {
          month = lastDay.month;
        }
        fillDays(days, year, month, _day);
      }
    }
  }
  return days;
}
const weekDays: Array<string> = ["日", "一", "二", "三", "四", "五", "六"];
/**
 * @description 
 * @param startDay 一周的起始日期 取值范围 0 | 1 | 2 | 3 | 4 | 5 | 6，默认值为 0
 * @returns Array<string>
 */
export const getWeekDayList = (startDay: WeekDayType = 0) => {
  let result: Array<string> = [];
  for (let i = startDay; i < 7; i++) {
    result.push(weekDays[i]);
  }
  for (let i = 0; i < startDay; i++) {
    result.push(weekDays[i]);
  }
  return result;
};

/** 获取当天的年月日 */
export const getCurrentDayDetail = (): DayType => {
  const date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekDay: date.getDay() as WeekDayType
  }
}

export const textFormat = (dateDetail: DateDetail, format: string) => {
  return dayjs(`${dateDetail.year}-${dateDetail.month}-${dateDetail.day}`).format(format);
}
/** 比较两个日期是否一致 */
export const matchDate = (date1: DateDetail, date2: DateDetail) => {
  if (
    date1.year === date2.year &&
    date1.month === date2.month &&
    date1.day === date2.day
  ) {
    return true;
  }
  return false;
}

/** 将字符串日期转为 DateDetail */
export const string2Date = (str: string): DateDetail => {
  const date = dayjs(str);
  return {
    year: date.year(),
    month: date.month() + 1,
    day: date.date()
  }
}
