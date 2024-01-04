/*
大原则：{{#arr}}与之前的内容同级，{{#arr}}{{/arr}中的内容作为#arrtoken的第三项，并且结尾的{{/arr}}会消失
我们希望如果遇到诸如{{#arr}}{{/app}}这种类型，将其内部的内容作为# arr的第三项

注意：一遇到xxx，就要解决后部逻辑，见到xxx，就要解决前部逻辑，想到stack

图解见根目录
*/
// 传入的tokens是之前得到的简单tokens
export default function nestTokens(tokens){
  // 结果
  const nestedTokens = [];
  // 栈 栈只是一个判断条件，是否遇到了#，遇到了就压入，遇到了/就弹出，所以除了#，/，其余的不会压入栈
  const stack = [];
  // 收集器：引用类型，初始时指向nestedTokens。遇见#，指向该token的第三项(下标2).有了收集器其实是递归嵌套
  let collector = nestedTokens;
  // 循环遍历整个数组
  for(let i=0;i<tokens.length;i++){
    // 获得当前token元素，该元素是一个数组 0:类型 1:内容 2:可能拥有的子元素
    let token = tokens[i];
    // 对类型进行判断 这次手写只考虑：# / name text
    switch(token[0]){
      // 遇到#，说明有内部内容
      case '#':
        // 收集器压入token
        collector.push(token);
        // 栈压入token
        stack.push(token);
        // 收集器指向token的第三项。为什么指向第三项？因为第三项是一个数组，是内部内容，需要继续递归
        collector = token[2] = [];
        break;
      // 遇到/，说明一个内部内容就已经结束 
      case '/':
        // 栈推出这个/对应的#
        stack.pop();
        // 如果栈还有内容，说明还有内部内容，收集器转入栈顶token的第三项。没有内容，说明内部内容已经结束，收集器转入nestedTokens
        collector = stack.length > 0 ? stack[stack.length-1][2] : nestedTokens;
        break;
      // default，没有内部内容，直接收集器压入token 
      default:
        collector.push(token);
    }
  }
  return nestedTokens;
}