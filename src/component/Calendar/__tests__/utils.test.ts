import {
  getCurMonthViewDetail,
  getCurWeekViewDetail,
  getCountDays,
  getWeekDayList,
  textFormat,
  matchDate,
  getWeekDay,
  getMonthDays,
  getWeekDays,
  getCurrentDayDetail,
  string2Date
} from '../utils';
// 2022年的日历
// prettier-ignore
const canlendarMonth = [
  // 一月
  [27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6],
  // 二月
  [31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  // 三月
  [28, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  // 四月
  [28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8],
  // 五月
  [25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5],
  // 六月
  [30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  // 七月
  [27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7],
  // 八月
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  // 九月
  [29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  // 十月
  [26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6],
  // 十一月
  [31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  // 十二月
  [28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8],
  // 2024年二月
  [29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
]

describe('getCurMonthViewDetail 测试', () => {
  it('正常情况下', () => {
    const curMonth = getCurMonthViewDetail(2022, 9);
    expect(curMonth).toEqual({
      year: 2022,
      month: 9
    });
  });

  test('异常情况下获取上一年的月份', () => {
    const curMonth = getCurMonthViewDetail(2022, 0);
    expect(curMonth).toEqual({
      year: 2021,
      month: 12
    });
  });

  test('异常情况下获取下一年的月份', () => {
    const curMonth = getCurMonthViewDetail(2022, 13);
    expect(curMonth).toEqual({
      year: 2023,
      month: 1
    });
  });
});

describe('getCurWeekViewDetail 测试', () => {
  it('正常情况下', () => {
    const curDay = getCurWeekViewDetail(2022, 9, 19);
    expect(curDay).toEqual({
      year: 2022,
      month: 9,
      day: 19
    });
  });

  test('异常情况下 本年获取上一周的年月日', () => {
    const curDay = getCurWeekViewDetail(2022, 9, -3);
    expect(curDay).toEqual({
      year: 2022,
      month: 8,
      day: 28
    });
  });

  test('异常情况下 本年获取下一周的年月日', () => {
    const curDay = getCurWeekViewDetail(2022, 9, 33);
    expect(curDay).toEqual({
      year: 2022,
      month: 10,
      day: 3
    });
  });

  test('异常情况下 本年获取上一年上一周的年月日', () => {
    const curDay = getCurWeekViewDetail(2022, 1, -3);
    expect(curDay).toEqual({
      year: 2021,
      month: 12,
      day: 28
    });
  });

  test('异常情况下 本年获取下一年下一周的年月日', () => {
    const curDay = getCurWeekViewDetail(2022, 12, 33);
    expect(curDay).toEqual({
      year: 2023,
      month: 1,
      day: 2
    });
  });
});

describe.each([
  { year: 2022, month: 1, expected: { year: 2022, month: 1, days: 31 } },
  { year: 2022, month: 2, expected: { year: 2022, month: 2, days: 28 } },
  { year: 2022, month: 3, expected: { year: 2022, month: 3, days: 31 } },
  { year: 2022, month: 4, expected: { year: 2022, month: 4, days: 30 } },
  { year: 2022, month: 5, expected: { year: 2022, month: 5, days: 31 } },
  { year: 2022, month: 6, expected: { year: 2022, month: 6, days: 30 } },
  { year: 2022, month: 7, expected: { year: 2022, month: 7, days: 31 } },
  { year: 2022, month: 8, expected: { year: 2022, month: 8, days: 31 } },
  { year: 2022, month: 9, expected: { year: 2022, month: 9, days: 30 } },
  { year: 2022, month: 10, expected: { year: 2022, month: 10, days: 31 } },
  { year: 2022, month: 11, expected: { year: 2022, month: 11, days: 30 } },
  { year: 2022, month: 12, expected: { year: 2022, month: 12, days: 31 } },
  // 闰年
  { year: 2024, month: 2, expected: { year: 2024, month: 2, days: 29 } },
  // 上一年的年尾
  { year: 2022, month: 0, expected: { year: 2021, month: 12, days: 31 } },
  // 下一年的年初
  { year: 2022, month: 13, expected: { year: 2023, month: 1, days: 31 } }
])('getCountDays 测试$year,$month', ({ year, month, expected }) => {
  it(`${expected.year}年${expected.month}月有${expected.days}天`, () => {
    const days = getCountDays(year, month);
    expect(days).toEqual(expected);
  });
});

describe('getWeekDayList 测试', () => {
  it('以周日为起始周', () => {
    const weeks = getWeekDayList();
    expect(weeks).toEqual(['日', '一', '二', '三', '四', '五', '六']);
  });

  it('以周日为起始周', () => {
    const weeks = getWeekDayList(0);
    expect(weeks).toEqual(['日', '一', '二', '三', '四', '五', '六']);
  });

  test('以周一为起始周', () => {
    const weeks = getWeekDayList(1);
    expect(weeks).toEqual(['一', '二', '三', '四', '五', '六', '日']);
  });
});

describe('textFormat 测试', () => {
  it('月份一位日期一位', () => {
    const text = textFormat({ year: 2022, month: 9, day: 8 }, 'YYYY-MM-DD');
    expect(text).toBe('2022-09-08');
  });

  test('月份二位日期一位', () => {
    const text = textFormat({ year: 2022, month: 10, day: 8 }, 'YYYY-MM-DD');
    expect(text).toBe('2022-10-08');
  });

  test('月份二位日期二位', () => {
    const text = textFormat({ year: 2022, month: 10, day: 18 }, 'YYYY/MM/DD');
    expect(text).toBe('2022/10/18');
  });
});

describe('matchDate 测试', () => {
  it('匹配一致', () => {
    const ismatch = matchDate(
      { year: 2022, month: 9, day: 8 },
      { year: 2022, month: 9, day: 8 }
    );
    expect(ismatch).toBeTruthy();
  });

  test('匹配不一致', () => {
    const ismatch = matchDate(
      { year: 2022, month: 9, day: 8 },
      { year: 2022, month: 9, day: 18 }
    );
    expect(ismatch).toBeFalsy();
  });
});

describe('getWeekDay 测试', () => {
  it('getWeekDay', () => {
    const ismatch = getWeekDay(2022, 9, 8);
    expect(ismatch).toBe(4);
  });
});

describe.each(
  [
    { year: 2022, month: 1 },
    { year: 2022, month: 2 },
    { year: 2022, month: 3 },
    { year: 2022, month: 4 },
    { year: 2022, month: 5 },
    { year: 2022, month: 6 },
    { year: 2022, month: 7 },
    { year: 2022, month: 8 },
    { year: 2022, month: 9 },
    { year: 2022, month: 10 },
    { year: 2022, month: 11 },
    { year: 2022, month: 12 },
    // 闰年
    { year: 2024, month: 2 }
  ].map((item, index) => {
    // @ts-ignore
    item.expected = canlendarMonth[index];
    return item;
  })
)
  (
    'getMonthDays 测试$year,$month',
    // @ts-ignore
    ({ year, month, expected }) => {
  it(`${year}年${month}月`, () => {
    const days = getMonthDays(year, month).map(item => item.day);
    expect(days).toEqual(expected);
  });
});

describe.each(
  [
    { year: 2022, month: 1 },
    { year: 2022, month: 2 },
    { year: 2022, month: 3 },
    { year: 2022, month: 4 },
    { year: 2022, month: 5 },
    { year: 2022, month: 6 },
    { year: 2022, month: 7 },
    { year: 2022, month: 8 },
    { year: 2022, month: 9 },
    { year: 2022, month: 10 },
    { year: 2022, month: 11 },
    { year: 2022, month: 12 },
    // 闰年
    { year: 2024, month: 2 }
  ].map((item, index) => {
    // 只测试每个月的第一周
    // @ts-ignore
    item.expected = canlendarMonth[index].slice(0, 7);
    return item;
  })
)(
  'getWeekDays 测试$year,$month',
  // @ts-ignore
  ({ year, month, expected }) => {
    it(`${year}年${month}月第一周`, () => {
      const days = getWeekDays(year, month, 1).map(item => item.day);
      expect(days).toEqual(expected);
    });
  }
);

describe('getWeekDays 测试跨下个月', () => {
  it('getWeekDays', () => {
    const days = getWeekDays(2022, 1, 31).map(item => item.day);
    expect(days).toEqual(canlendarMonth[0].slice(35, 42));
  });
});

describe('getWeekDays 测试跨下个月且跨年', () => {
  it('getWeekDays', () => {
    const days = getWeekDays(2022, 12, 26).map(item => item.day);
    expect(days).toEqual(canlendarMonth[11].slice(28, 35));
  });
});

describe('getCurrentDayDetail', () => {
  it('getCurrentDayDetail', () => {
    const days = getCurrentDayDetail();
    const date = new Date();
    const curDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      weekDay: date.getDay()
    };
    expect(days).toEqual(curDate);
  });
});

describe('string2Date 测试', () => {
  it('正常获取年月日', () => {
    const text = string2Date('2022-9-25');
    expect(text).toEqual({
      year: 2022,
      month: 9,
      day: 25
    });
  });

  test('月份二位日期一位', () => {
    const text = string2Date('2022-09');
    expect(text).toEqual({
      year: 2022,
      month: 9,
      day: 1
    });
  });

});
