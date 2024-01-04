/*
  实现扫描器类：
    目的：我们需要以'{{' '}}'二者为分解将整个模板字符串分解为由token组成的tokens数组
    scanUtil：扫描到'{{'或'}}'，停止扫描，返回'{{'或'}}'之前的字符串
    scan：扫描'{{'或'}}'，并跳过
*/
export default class Scanner{
  constructor(templateStr){
    // 实例化时，将模板字符串传入
    this.templateStr = templateStr;
    // 指针
    this.pos = 0;
    // 尾巴：当前指针所指之处，到整个模板字符串结尾的部分，用于扫描
    this.tail = templateStr;
  }

  scanUtil(stopTag){
    // 分割的起始位置
    const pos_backup = this.pos;
    // 只要非eos并且两种tag存在，就不断向后扫描
    while(!this.eos() && this.tail.indexOf(stopTag) != 0){
      this.pos++;
      // 尾巴不断缩小
      this.tail = this.templateStr.substring(this.pos);
    }
    // 此时扫描到了stopTag或eos，返回扫描到的字符串
    return this.templateStr.substring(pos_backup, this.pos).trimStart();
  }

  scan(tag){
    // 如果尾巴开头是tag，就跳过tag，并将尾巴缩小
    if(this.tail.indexOf(tag) == 0){
      this.pos += tag.length;
      this.tail = this.templateStr.substring(this.pos);
    }
  }

  eos(){
    return this.pos >= this.templateStr.length;
  }
}