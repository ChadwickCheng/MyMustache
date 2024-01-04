/*
使用a.b.c的形式找到对象内的值
*/
export default function lookup(dataObj,keyName){
  if(keyName.indexOf('.') != -1 && keyName != '.'){
    let keys = keyName.split('.');
    const temp = dataObj;
    for(let i=0;i<keys.length;i++){
      temp = temp[i]
    }
    return temp;
  }
  return dataObj[keyName];
}