import parseTemplateToTokens from './js/2_parseTemplateToTokens'
import renderTemplateToDom from './js/4_renderTemplateToDom'

window.my_mustache = {
  render(templateStr,data){
    let tokens = parseTemplateToTokens(templateStr);
    let domStr = renderTemplateToDom(tokens,data);
    return domStr;
  }
}

console.log('main运行了');


const templateString = `
    <div>
      <ol>
        {{#students}}
          <li>
            学生{{name}}的爱好是
              <ol>
                {{#hobbies}}
                <li>{{.}}</li>
                {{/hobbies}}
              </ol>
          </li>
        {{/students}}
      </ol>
    </div>
    `

    var data = {
            students: [
                { 'name': '小明', 'hobbies': ['编程', '游泳'] },
                { 'name': '小红', 'hobbies': ['看书', '弹琴', '画画'] },
                { 'name': '小强', 'hobbies': ['锻炼'] }
            ]
        };

let tokens = parseTemplateToTokens(templateString);
console.log('tokens',tokens);
console.log('domStr',renderTemplateToDom(tokens,data));



//     let domStr = my_mustache.render(templateString, data)
//     console.log(domStr);
//     document.getElementById('container').innerHTML = domStr
    