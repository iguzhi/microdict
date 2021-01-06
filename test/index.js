const Dict = require('../dist/microdict.min');

const dict = new Dict(
  // { alias: 'ASK_PRICE1', text: '卖五价', value: 'askPrice5' },
  // { alias: 'ASK_PRICE2', text: '卖四价', value: 'askPrice4' },
  // { alias: 'ASK_PRICE3', text: '卖三价', value: 'askPrice3' },
  // { alias: 'ASK_PRICE4', text: '卖二价', value: 'askPrice2' },
  { alias: 'ASK_PRICE5', text: '卖一价', value: 'askPrice1' },
  { alias: 'BID_PRICE1', text: '买一价', value: 'bidPrice1' },
  // { alias: 'BID_PRICE2', text: '买二价', value: 'bidPrice2' },
  // { alias: 'BID_PRICE3', text: '买三价', value: 'bidPrice3' },
  // { alias: 'BID_PRICE4', text: '买四价', value: 'bidPrice4' },
  // { alias: 'BID_PRICE5', text: '买五价', value: 'bidPrice5' },
  { alias: 'LAST_PRICE', text: '最新价', value: 'lastPrice' },
  { alias: 'MARKET_PRICE', text: '市价', value: 'marketPrice' },
  { alias: 'UPPER_LIMIT_PRICE', text: '涨停价', value: 'upperLimitPrice' },
  { alias: 'LOWER_LIMIT_PRICE', text: '跌停价', value: 'lowerLimitPrice' },
)

console.log(dict.toArray())