/*
1.
scanner可以将html的模板字符串按照 {{ }}拆分为不同部分
现在需要将这不同部分组合起来，形成元素为token的tokens
2.
注意，如果不借助nestTokens，那么简单的tokens是无法解析嵌套的
*/
import Scanner from './1_Scanner'
import nestTokens from './3_nestTokens'

export default function parseTemplateToTokens(templateStr){
  // 这是最终需要返回的tokens，由一个个token组成，token也是数组
  const tokens = [];
  // 实例化扫描器
  const scanner = new Scanner(templateStr);
  // 存储扫描器扫描到的字符串
  let words;
  // 扫描器不停工作，直到eos
  // 一次循环分为四段 字符->{{，skip{{,字符->}}，skip}}
  while(!scanner.eos()){
    // 存储字符
    words = scanner.scanUtil('{{');
    /*
    这里保留位置 之后完善去除空格
    */
    // 1. {{前绝对是text
    tokens.push(['text', words]);
    // 2. skip{{，进入{{内部
    scanner.scan('{{');
    // 3. 存储{{}}内部的字符
    words = scanner.scanUtil('}}');
    // 判断情况 原生mustache，#，/，name,    text
    if(words != ''){
      if(words[0] == '#'){
        tokens.push(['#', words.substring(1)]);
      }else if(words[0] == '/'){
        tokens.push(['/', words.substring(1)]);
      }else {
        tokens.push(['name', words]);
      }
    }
    // 4. skip}} 进入下一轮循环
    scanner.scan('}}');
  }
  // 循环扫描结束整个模板字符串，返回tokens
  return nestTokens(tokens);
  // return tokens;
}