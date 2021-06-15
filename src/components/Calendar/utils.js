/** 填充0 */
export const fillWithZero = (target, length) => {
  return (Array(length).join("0") + target).slice(-length);
};

/**
 * 默认将日期格式化为 YYYY-MM-DD
 * @param date Date类型的时间
 * @param field 时间显示粒度
 */
export const formatDate = (date, field = "day") => {
  const yearStr = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthStr = fillWithZero(month, 2);
  const day = date.getDate();
  const dayStr = fillWithZero(day, 2);
  switch (field) {
    case "year":
      return `${yearStr}`;
    case "month":
      return `${yearStr}-${monthStr}`;
    case "day":
      return `${yearStr}-${monthStr}-${dayStr}`;
  }
};

/**
 * 计算current增加add天后是周几
 * @param current 当前是第几天
 * @param add 要加多少天
 */
export const calcWeekDay = (current, add) => {
  return (current + add) % 7;
};

/**
 * 获取当月的date列表
 * @param date 属于目标月份的Date对象
 * @param startDay 一行的起点  比如以周一为起点 此时startDay = 1，以周日为起点，此时startDay = 0
 */
export const getDateListByMonth = (date, startDay) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  /** 一周的最后一天 */
  const weekEndDay = calcWeekDay(startDay, 6);
  let result = [];
  /** 先获取该月份的起点 */
  date.setDate(1);

  let dateObj = new Date(date);
  dateObj.setDate(1);
  /** 前面一部分非当前月的日期 */
  for (let day = startDay; day != date.getDay(); day = calcWeekDay(day, 1)) {
    dateObj.setFullYear(year);
    dateObj.setMonth(month);
    dateObj.setDate(date.getDate() - (date.getDay() - day));
    const preDate = {
      date: dateObj.getDate(),
      currentMonth: false,
      fullDateStr: formatDate(dateObj, "day"),
    };
    result.push(preDate);
  }
  /** 当前月的日期 */
  while (date.getMonth() === month) {
    result.push({
      date: date.getDate(),
      currentMonth: true,
      fullDateStr: formatDate(date, "day"),
    });
    date.setDate(date.getDate() + 1);
  }

  /** 后面一部分非当前月的日期 */
  for (let day = date.getDay(); day != weekEndDay; day = calcWeekDay(day, 1)) {
    result.push({
      date: date.getDate(),
      currentMonth: false,
      fullDateStr: formatDate(date, "day"),
    });
    date.setDate(date.getDate() + 1);
  }

  result.push({
    date: date.getDate(),
    currentMonth: false,
    fullDateStr: formatDate(date, "day"),
  });
  // 保证每个月的数据都是 42 个
  if (result.length === 35) {
    date.setDate(date.getDate() + 1);
    for (
      let day = date.getDay();
      day != weekEndDay;
      day = calcWeekDay(day, 1)
    ) {
      result.push({
        date: date.getDate(),
        currentMonth: false,
        fullDateStr: formatDate(date, "day"),
      });
      date.setDate(date.getDate() + 1);
    }
    result.push({
      date: date.getDate(),
      currentMonth: false,
      fullDateStr: formatDate(date, "day"),
    });
  }
  return result;
};

/** 获取指定日期所在周的所有天
 * @param date 属于目标星期的Date对象
 * @param startDay 一行的起点  比如以周一为起点 此时startDay = 1，以周日为起点，此时startDay = 0
 */
export const getDateListByWeek = (date, startDay) => {
  date.setDate(date.getDate() - ((date.getDay() - startDay + 7) % 7));
  /** 一周的最后一天 */
  const weekEndDay = calcWeekDay(startDay, 6);
  let result = [];
  while (date.getDay() !== weekEndDay) {
    result.push({
      date: date.getDate(),
      currentMonth: true,
      fullDateStr: formatDate(date, "day"),
    });
    date.setDate(date.getDate() + 1);
  }
  result.push({
    date: date.getDate(),
    currentMonth: true,
    fullDateStr: formatDate(date, "day"),
  });
  return result;
};

export const getWeekDayList = (startDay) => {
  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
  let result = [];
  for (let i = startDay; i < 7; i++) {
    result.push(weekDays[i]);
  }
  for (let i = 0; i < startDay; i++) {
    result.push(weekDays[i]);
  }
  return result;
};
