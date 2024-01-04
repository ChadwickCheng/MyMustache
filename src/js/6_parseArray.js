import lookup from './5_lookup'
import renderTemplateToDom from './4_renderTemplateToDom'

/*
接受的token形如[#,xxx,[]]

var data = {
            students: [
                { 'name': '小明', 'hobbies': ['编程', '游泳'] },
                { 'name': '小红', 'hobbies': ['看书', '弹琴', '画画'] },
                { 'name': '小强', 'hobbies': ['锻炼'] }
            ]
        };
*/

export default function parseArray(token,data){
  // 根据token[1]的key找到data中对应的数组。源数据是一个对象，里面的key的value是数组
  let val = lookup(data,token[1]);
  // 结果
  let resultStr = '';
  // 循环这个数组
  for(let i=0;i<val.length;i++){
    // token[2]依旧是tokens数组，需要递归。...val[i]把这个
    resultStr += renderTemplateToDom(token[2],{
      ...val[i],
      '.':val[i]
    });
  }
  return resultStr;
}