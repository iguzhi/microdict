class Dict {

  constructor() {
    this.version = '__VERSION__';
    this.valueIndex = {};
    this.aliasIndex = {};
    this.textIndex = {};

    this.index = {};

    for (let i = 0; i < arguments.length; i++) {
      let element = arguments[i];
      if (element.value == null) {
          element.value = i;
      }
      this.index[element.value] = i;
      this.addElement(element);
    }
  }

  /**
   * 为当前枚举对象添加一个{@link meta.DictItem 字典项}
   *
   * @param {meta.DictItem} element 待添加的字典项
   * @throws {Error} 如果`value`或`alias`存在重复则抛出异常
   */
  addElement(element) {
      if (this.hasOwnProperty(element.value)) {
          throw new Error('Already defined an element with value' + element.value + ' in this dict type');
      }

      if (this.hasOwnProperty(element.alias)) {
          throw new Error('Already defined an element with alias "' + element.alias + '" in this dict type');
      }

      this[element.value] = element.alias;
      this[element.alias] = element.value;

      this.valueIndex[element.value] = element;
      this.aliasIndex[element.alias] = element;
      this.textIndex[element.text] = element;
  }

  /**
   * 根据值获取字典项
   *
   * @param {number|string} value 值
   * @return {meta.DictItem} 对应的字典项
   */
  fromValue(value) {
    return this.valueIndex[value];
  }

  /**
   * 根据别名获取字典项
   *
   * @param {string} alias 别名
   * @return {meta.DictItem} 对应的字典项
   */
  fromAlias(alias) {
    return this.aliasIndex[alias];
  }

  /**
   * 根据文字获取字典项
   *
   * @param {string} text 文字
   * @return {meta.DictItem} 对应的字典项
   */
  fromText(text) {
    return this.textIndex[text];
  }

  /**
   * 根据值获取对应字典项的文字
   *
   * @param {number|string} value 值
   * @return {string} 对应的文字
   */
  getTextFromValue(value) {
    const item = this.fromValue(value) || {};
    return item.text;
  }

  /**
   * 根据文字获取对应字典项的文字
   *
   * @param {string} alias 文字
   * @return {string} 对应的文字
   */
  getTextFromAlias(alias) {
    const item = this.fromAlias(alias) || {};
    return item.text;
  }

  /**
   * 根据别名获取对应字典项的数值
   *
   * @param {string} alias 别名
   * @return {number|string} 对应的值
   */
  getValueFromAlias(alias) {
    const item = this.fromAlias(alias) || {};
    return item.value;
  }

  /**
   * 根据文字获取对应字典项的数值
   *
   * @param {string} text 文字
   * @return {number|string} 对应的值
   */
  getValueFromText(text) {
    const item = this.fromText(text) || {};
    return item.value;
  }

  /**
   * 根据值获取对应字典项的别名
   *
   * @param {number|string} value 值
   * @return {string} 对应的别名
   */
  getAliasFromValue(value) {
    const item = this.fromValue(value) || {};
    return item.alias;
  }

  /**
   * 根据文字获取对应字典项的别名
   *
   * @param {string} text 文字
   * @return {string} 对应的别名
   */
  getAliasFromText(text) {
    const item = this.fromText(text) || {};
    return item.alias;
  }

  /**
   * 将当前字典转换为数组，常用于下拉选择控件之类的数据源
   *
   * @param {...Mixed} [hints] 用于生成数组的提示信息，数组中的每一项可以为字符串或者对象，
   * 为字符串时使用`alias`与字符串相同的{@link meta.DictItem}对象，为对象时则直接将对象插入到当前位置。
   * 不提供此参数则直接将字典按`value`属性进行排序生成数组返回
   * @return {meta.DictItem[]} 每次返回一个全新的数组副本
   */
  toArray() {
    let array = [];
    if (arguments.length > 0) {
      for (let i = 0; i < arguments.length; i++) {
        let hint = arguments[i];
        if (typeof hint === 'string') {
          array.push(this.fromAlias(hint));
        }
        else {
          array.push(hint);
        }
      }
    }
    else {
      // 必须做一次复制操作，不能让外部的修改影响字典结构
      /* eslint-disable no-redeclare */
      for (let i in this.valueIndex) {
        if (this.valueIndex[i]) {
          array.push(this.valueIndex[i]);
        }
      }
      array.sort((a, b) => this.index[a.value] > this.index[b.value] ? 1 : -1);
      /* eslint-enable no-redeclare */
    }
    return array;
  }

  toSelectionObject() {
    let array = this.toArray();
    let aaa = array.reduce(
      (options, item) => {
        options[item.value] = item.text;
        return options;
      },
      {}
    )
    return aaa;
  }

  // { label: 'Apple', value: 'Apple' },
  toCheckboxArray(withAll) {
    let array = [];
    if (withAll) {
      array = [{ text: '全部', value: -1 }];
    }

    array = [...array, ...this.toArray()];

    return array.map(
      (item) => {
        return { label: item.text, value: item.value, key: item.alias };
      },
    )
  }
}

export default Dict;