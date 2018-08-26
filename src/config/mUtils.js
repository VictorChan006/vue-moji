/**
 * 存储localStorage
 */
export const setStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStorage = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStorage = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/**
 * 添加class,删除类
 */
export function addClass(el,className){
  if(hasClass(el,className)){
    return
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ')
}

export function hasClass(el,className){
  let reg = new RegExp('(^|\\s)'+'className'+'(\s|$)')
  return reg.test(el.className)
}

export function removeClass(el,className){
  if(hasClass(el,className)){
    let newClass = el.className.split(' ');
    let index = newClass.indexOf(className);
    newClass.splice(index,1);
    el.className = newClass.join(' ')
  }
  else return
}


