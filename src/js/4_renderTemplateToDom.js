/*
之前已经得到了模板字符串的tokens数组，现在要结合源数据，渲染成真正的dom
*/
import lookup from './5_lookup'
import parseArray from './6_parseArray'

console.log('renderTemplateToDom运行了');

export default function renderTemplateToDom(tokens,data){
  // 最终结果
  let domStr = '';
  // 循环tokens
  for(let i=0;i<tokens.length;i++){
    // 获得每项token
    let token = tokens[i];
    if(token[0] == 'text'){
      // 如果是文本，直接拼接
      domStr += token[1];
    }else if(token[0] == 'name'){
      // 如果是name，要找到data中对应的值，拼接
      domStr += lookup(data,token[1]);
    }else if(token[0]=='#'){
      // 遇到#，说明第三项还有子元素，需要根据数据个数递归
      domStr += parseArray(token,data);
    }
  }
  return domStr;
} 