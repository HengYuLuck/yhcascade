// @ts-nocheck
/**
 * json 源数据
 * dom 绑定ID
 * @param json
 * @param dom
 */
export const cascadeJs = function (json, dom) {
  let selectParams = [];
  let currentClick;
// 使用方法 -------------------------------------------------------start
  const cascade = createCascadeByJSON(json, (location) => {
    // 点击某项的回调事件
    let item = json;
    for (const i of location) {
      // 打印json中对应选中项
      selectParams.push(item[i]);
      item = item[i].subgroup;
    }
    if (selectParams.length > 0) {
      currentClick = selectParams.pop(); // 当前选中得数据
    }
    return currentClick;
  });
  createCascade(dom);

  /**
   * 创建cascade dom
   * @param name
   */
  function createCascade(name) {
    let allCascade = document.getElementsByClassName("cascade");
    for (let i = 0; i < allCascade.length; i++) {
      if (allCascade[i] != null)
        allCascade[i].parentNode.removeChild(allCascade[i]);
    }
    const sourceName = document.getElementById(dom)
    sourceName.append(cascade);
  }

// 使用方法 -------------------------------------------------------end

// 封装的代码 -------------------------------------------------------start
  function createCascadeByJSON(json, callback = () => 0) {
    const cascade = domControl({
      className: 'cascade',
    });
    const layoutDomBox = {};
    const model = (function loopArr(arr, level = 0, parent = []) {
      const layoutModel = {level, parent};
      Object.setPrototypeOf(layoutModel, Array.prototype);
      /**
       * layout
       * @type {{dom: HTMLDivElement, data: *}|*}
       */
      const layoutDom = domControl({
        className: 'layout layout' + level,
      });

      /**
       * layoutBox
       * 包裹layout
       */
      if (layoutDomBox['box' + level]) {
        layoutDomBox['box' + level].dom.append(layoutDom.dom);
      } else {
        layoutDomBox['box' + level] = domControl({
          style: 'width:20%;cursor: pointer;',
          className: 'layoutBox layoutBox' + level,
        });
        layoutDomBox['box' + level].dom.append(layoutDom.dom);
        cascade.dom.append(layoutDomBox['box' + level].dom);
      }

      for (let index = 0; index < arr.length; index++) {
        const item = arr[index];
        const location = [...parent, index];
        const vDom = domControl({
          innerText: item.name,
          className: item.subgroup ? 'item subgroup' : 'item',
          onclick() {
            callback(location);
            selection(location);
          },
        });
        layoutDom.dom.append(vDom.dom);

        const data = {
          dom: vDom.dom,
        };
        if (item.subgroup) {
          data.subgroup = loopArr(item.subgroup, level + 1, location);
        }
        layoutModel.push(data);
      }
      return layoutModel;
    })(json);

    /**
     * 传入坐标,从model中获取之前节点,以及当前节点
     * @param {Array} location
     * @param {Function} beforeCallback
     * @param {Function} currentCallback
     */
    function modelGetBeforeByLocation(location, beforeCallback = () => null, currentCallback = () => null) {
      if (location.length > 0) {
        let target = model;
        let current;
        for (const i of locationMemory) {
          const item = target[i];
          beforeCallback(item);
          target = item.subgroup;
          current = item;
        }
        currentCallback(current);
      }
    }

    // 上一次选中项
    let locationMemory = [];

    /**
     * 选中一个坐标,更新级联选择器状态
     * @param {Array} location
     */
    function selection(location) {
      tryCatch(() => {
        modelGetBeforeByLocation(locationMemory, (item) => {
          domToggleClass(item.dom, 'checked');
          item.dom.parentElement.style.display = 'none';
          item.dom.parentElement.parentElement.style.display = 'none';
        }, (item) => {
          if (item.subgroup) {
            item.subgroup[0].dom.parentElement.style.display = 'none';
            item.subgroup[0].dom.parentElement.parentElement.style.display = 'none';
          }
        });
        locationMemory = location;
        let deep = 0;
        modelGetBeforeByLocation(locationMemory, (item) => {
          deep++;
          domToggleClass(item.dom, 'checked');
          item.dom.parentElement.style.display = 'block';
          item.dom.parentElement.parentElement.style.display = 'block';
        }, (item) => {
          deep++;
          if (item.subgroup) {
            item.subgroup[0].dom.parentElement.style.display = 'block';
            item.subgroup[0].dom.parentElement.parentElement.style.display = 'block';
          }
        });
        cascade.dom.style.minWidth = deep * 1e2 + 'px';
      });
    }

    const list1 = cascade.dom.getElementsByClassName('layoutBox');
    for (let i = 0; i < list1.length; i++) {
      list1[i].style.display = 'none';
    }
    const list2 = cascade.dom.getElementsByClassName('layout');
    for (let i = 0; i < list2.length; i++) {
      list2[i].style.display = 'none';
    }

    selection([0]);

    /**
     * @param {Function} fn
     */
    function tryCatch(fn) {
      try {
        fn();
      } catch (e) {
        console.log(e);
      }
    }

    function jsonProxy(json, fn) {
      const t = json.constructor === Array ? [] : {};
      for (const k in json) {
        if (json.hasOwnProperty(k)) {
          t[k] = typeof json[k] === 'object' ? jsonProxy(json[k], fn) : json[k];
        }
      }
      return new Proxy(t, {
        set(o, k, v, p) {
          o[k] = typeof v === 'object' ? jsonProxy(v, fn) : v;
          if (fn) fn(o, k, v);
          return true;
        },
      });
    }

    function createDivEle(arg, tagType = 'div') {
      const box = document.createElement(tagType);
      for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key)) {
          const data = arg[key];
          if (typeof data === 'function') {
            box[key] = data.bind(arg); // 如果是一个函数,改变this指向
          } else {
            box[key] = data;
          }
        }
      }
      return box;
    }

    function domControl(json, watch = {}) {
      const data = jsonProxy(json, _render);
      const dom = createDivEle(data);

      // eslint-disable-next-line require-jsdoc
      function _render(data, key, val) {
        if (key in dom) {
          dom[key] = val;
        }
      }

      return {
        data,
        dom,
      };
    }

    function domToggleClass(ele, val) {
      const str = ele.className;
      ele.className = ele.className.replace(new RegExp(`\\s${val}\\s?`, 'g'), '');
      if (ele.className === str) ele.className += ' ' + val;
    }

    return cascade.dom;
  }

  /**
   * 输出当前点击data
   * @returns {*}
   */
  function getCurrentValue() {
    return currentClick;
  }

  function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  }

  function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
      let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      obj.className = obj.className.replace(reg, ' ');
    }
  }

  return {
    dom,
    getCurrentValue
  }
}
// 封装的代码 -------------------------------------------------------end

