(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n(22)},14:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);n(14);var r=n(0),a=n.n(r),o=n(12),i=n.n(o),c=function(){return a.a.createElement("header",null,a.a.createElement("img",{src:"/svg_editor_logo.svg",alt:"logo"}))},l=n(1),u=n(2),s=n(4),m=n(3),d=n(5),v=n(9),h=n(7),f=n(6),p={array:function(e){return Array.apply(null,{length:e})},rounded:function(e,t){return Number(e.toFixed(t))},classNames:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter(function(e){return Boolean(e)}).join(" ")},nextArray:function(e,t,n){return Object(h.a)(e.slice(0,t)).concat([n],Object(h.a)(e.slice(t+1)))}},g=function(e){return/[mlt]/i.test(e)?1:/[qs]/i.test(e)?2:/c/i.test(e)?3:0},b=function(e){return/[vh]/i.test(e)?1:/a/i.test(e)?7:0},C=function(e){var t=e[0];return function(e,t,n){var r=e[0],a=e.substr(1).replace(/[-]+/g," -").replace(/[, ]+/g,",").split(",").filter(Boolean).map(Number);return{letter:r,points:p.array(t).map(function(e){return function(t,n){return{x:e[2*n],y:e[2*n+1]}}}(a)),values:a.slice(0,n)}}(e,g(t),b(t))},y=function(e){return e<0?String(e):" "+e},E=function(e){return"".concat(e.letter).concat((t=e.points,t.map(function(e){var t=e.x,n=e.y;return"".concat(y(t)).concat(y(n))}).join("").trim())).concat(e.values.map(function(e){return"".concat(y(e))}).join("").trim());var t},w=function(e){return e.map(E).join("")},k=function(e){return(e.match(/([a-zA-Z][ \-.0-9]*)/g)||[]).map(C).filter(Boolean)},j=function(e,t){return function(n){switch(n.letter){case"M":case"m":case"L":case"l":case"Q":case"q":return Object(f.a)({},n,{points:n.points.map(function(e,t){return function(n){return{x:p.rounded(n.x*e,t),y:p.rounded(n.y*e,t)}}}(e,t))});default:return n}}},O=function(e){var t={x:0,y:0},n={x:void 0,y:void 0},r=!1,a=function(e){var r=e.x,a=e.y;void 0!==r&&void 0===n.x&&(n.x=r+t.x),void 0!==a&&void 0===n.y&&(n.y=a+t.y)},o=function(e){var n=e.x,r=e.y;void 0!==n&&(t.x=n),void 0!==r&&(t.y=r)},i=function(e){var n=e.x,r=e.y;void 0!==n&&(t.x+=n),void 0!==r&&(t.y+=r)},c=Object(h.a)(e);c.reverse();var l=!0,u=!1,s=void 0;try{for(var m,d=c[Symbol.iterator]();!(l=(m=d.next()).done);l=!0){var v=m.value,f=v.letter,p=v.points,g=v.values;if(r){if("M"===f)return p[0];"m"===f&&(o(p[0]),r=!1)}else if(/z/i.test(f)&&(r=!0),/[MLCSQT]/.test(f)&&a(p[p.length-1]),/[mlcsqt]/.test(f)&&i(p[p.length-1]),"h"===f&&i({x:g[0]}),"H"===f&&a({x:g[0]}),"v"===f&&i({y:g[0]}),"V"===f&&a({y:g[0]}),"a"===f&&i({x:g[5],y:g[6]}),"A"===f&&a({x:g[5],y:g[6]}),void 0!==n.x&&void 0!==n.y)break}}catch(b){u=!0,s=b}finally{try{l||null==d.return||d.return()}finally{if(u)throw s}}return{x:n.x||0,y:n.y||0}},x={currentPointer:O,currentPointerByPath:function(e){return O(k(e))},transition:function(e,t,n){return w(k(e).map(function(e){return function(e,t,n){switch(e.letter){case"M":case"L":case"Q":return Object(f.a)({},e,{points:e.points.map(function(e,t){return function(n){return{x:n.x+e,y:n.y+t}}}(t,n))});default:return e}}(e,t,n)}))},parsePath:k,commandsToString:w,scale:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return w(k(e).map(j(n/t,r)))},requiredPointsForCommand:g,requiredValuesForCommand:b,commandToString:E};window.SVG=x;var N={width:1e3,height:1e3,precision:0,fill:!1,stroke:void 0},S={name:"Unnamed",path:"M0 0",attr:N},P=x.parsePath("M0 0"),A={svg:S,commands:P,aPoint:0,aCommand:0,oPoint:void 0,edit:!1},L=v.Wired.store({svgList:[],currentSvg:0,editor:v.Wired.node({svg:v.Wired.node({name:"Unnamed",path:"M0 0",attr:v.Wired.node(N)}),commands:P,aPoint:0,aCommand:0,oPoint:void 0,edit:!1})});window.Store=L;var W=n(8),B=[],V=function(){try{var e=JSON.parse(W.Persistore.get("svgs"));return Array.isArray(e)?e:B}catch(t){return B}},q=function(){var e=Number(W.Persistore.get("current_svg")),t=V();return!isNaN(e)&&t[e]?e:void 0};L.set({svgList:V(),currentSvg:q()});var F={get:V,set:function(e){var t=V(),n=q();void 0!==n?t[n]=e:t.push(e),L.set({svgList:t}),W.Persistore.set("svgs",JSON.stringify(L.data.svgList))},getCurrent:q,setCurrent:function(e){void 0!==e?W.Persistore.set("current_svg",e.toString()):W.Persistore.remove("current_svg"),L.set({currentSvg:e})}},M=function(){try{return JSON.parse(W.Persistore.get("editor")||"")}catch(e){return A}},R=function(e){var t;L.set({editor:(t=e,t.commands?Object(f.a)({},t,{svg:Object(f.a)({},t.svg,{path:x.commandsToString(t.commands)})}):t)}),W.Persistore.set("editor",JSON.stringify(L.data.editor))},T=function(e){var t=L.data.editor.commands;if(e<t.length){var n=e>0?x.currentPointer(t.slice(0,e)):void 0;R({aCommand:e,oPoint:n,aPoint:0})}},J=function(e){var t=L.data.editor,n=t.commands,r=t.aCommand;R({commands:p.nextArray(n,r,e)})};L.set({editor:M()});var H={get:M,set:R,clear:function(){W.Persistore.remove("editor"),L.set({editor:{edit:!1}}),F.setCurrent(void 0)},select:function(e,t){var n=e.name,r=e.path,a=e.attr,o=a.width,i=a.height,c=a.fill,l=a.stroke,u=a.precision,s=x.parsePath(e.path);R({svg:{name:n,path:r,attr:{width:o,height:i,fill:c,stroke:l,precision:u}},aCommand:0,aPoint:0,commands:s,edit:!0}),T(s.length-1),F.setCurrent(t)},updatePoint:function(e){var t=L.data.editor,n=t.commands,r=t.aPoint,a=n[t.aCommand];J(Object(f.a)({},a,{points:p.nextArray(a.points,r,e)}))},updateValue:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=L.data.editor,r=n.commands[n.aCommand];J(Object(f.a)({},r,{values:p.nextArray(r.values,t,e)}))},activateCommand:T,addCommand:function(e){var t,n=L.data.editor.commands;R({aPoint:0,commands:Object(h.a)(n).concat([{letter:e,points:(t=e,p.array(x.requiredPointsForCommand(t)).map(function(){return{x:0,y:0}})),values:function(e){return p.array(x.requiredValuesForCommand(e)).map(function(){return 0})}(e)}])}),T(n.length)},removeCommand:function(e){var t=L.data.editor,n=t.commands,r=t.aCommand;e<n.length&&e>0&&(e===r&&T(e-1),R({commands:Object(h.a)(n.slice(0,e)).concat(Object(h.a)(n.slice(e+1)))}))}},U=function(e){var t=e.svg,n=e.index,r=t.attr,o=t.path,i=t.name,c=r.width,l=r.height,u=r.fill,s=r.stroke;return a.a.createElement("div",{className:"stored-svg"},a.a.createElement("svg",{viewBox:"0 0 ".concat(c," ").concat(l)},o&&a.a.createElement("path",{fill:u?"currentColor":"none",stroke:s?"currentColor":"none",strokeLinecap:s&&s.linecap,strokeLinejoin:s&&s.linejoin,strokeWidth:s&&s.width,d:o})),a.a.createElement("div",{className:"label"},i,a.a.createElement("span",{className:"buttons"},a.a.createElement("button",{onClick:function(){return H.select(t,n)}},"Edit"),a.a.createElement("button",{onClick:function(){return H.select(t)}},"Copy"))))},_=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props.svgList;return a.a.createElement("div",{className:"store"},a.a.createElement("h2",null,"Stored SVGs:"),e.map(function(e,t){return a.a.createElement(U,{svg:e,index:t,key:t})}))}}]),t}(r.Component),Q=L.wire(_,function(e){return{svgList:e.svgList}}),z=["#66b824","#b85032","#2287b8"],G=function(e,t){return e.toLowerCase()===e&&t?t:{x:0,y:0}},X=function(e){function t(){var e,n;Object(l.a)(this,t);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(n=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).screen=a.a.createRef(),n.getScreenBounding=function(){var e=n.screen.current.getBoundingClientRect();return{top:e.top,left:e.left,width:e.width,height:e.height}},n.click=function(e){var t=n.props.editor,r=t.svg,a=t.commands,o=t.aCommand,i=t.oPoint,c=r.attr,l=c.width,u=c.height,s=c.precision,m=a[o],d=m.points,v=m.values,h=m.letter,f=e.clientY+window.scrollY,g=e.clientX+window.scrollX,b=G(h,i),C=n.getScreenBounding(),y={x:p.rounded((g-C.left-window.pageXOffset)*l/C.width-b.x,s),y:p.rounded((f-C.top-window.pageYOffset)*u/C.height-b.y,s)};d.length?H.updatePoint(y):v.length&&(/h/i.test(h)&&H.updateValue(y.x),/v/i.test(h)&&H.updateValue(y.y))},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props.editor,t=e.svg,n=e.commands,r=e.aCommand,o=e.oPoint,i=t.path,c=t.attr,l=c.width,u=c.height,s=c.fill,m=c.stroke,d=n[r],v=d.points,h=d.letter,f=Math.ceil(l/100),p=G(h,o);return a.a.createElement("div",{className:"screen",onClick:this.click,ref:this.screen},a.a.createElement("svg",{className:"screen-bg",viewBox:"0 0 ".concat(l," ").concat(u)},i&&a.a.createElement("path",{stroke:m?"currentColor":"none",strokeLinecap:m&&m.linecap,strokeLinejoin:m&&m.linejoin,strokeWidth:m&&m.width,fill:s?"currentColor":"none",d:i}),v.map(function(e,t){return a.a.createElement("circle",{key:t,fill:z[t],cx:e.x+p.x,cy:e.y+p.y,r:f})}),o&&a.a.createElement("circle",{fill:"none",stroke:"black",strokeWidth:f/5,cx:o.x,cy:o.y,r:f})))}}]),t}(r.Component),Y=L.wire(X,function(e){return{editor:e.editor}}),D=function(e,t){return t?" ".concat(e,'="').concat(t,'"'):""},I=L.wire(function(e){var t=e.editor.svg,n=t.path,r=t.attr,o=r.width,i=r.height,c=r.fill,l=r.stroke;return a.a.createElement("div",{className:"result"},a.a.createElement("code",null,"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ".concat(o," ").concat(i,"'>"),a.a.createElement("br",null),a.a.createElement("span",{className:"tab"},"<path ".concat(function(e){return'fill="'.concat(e?"currentColor":"none",'"')}(c)).concat(function(e){return e?' stroke="currentColor"'.concat(D("stroke-width",e.width)).concat(D("stroke-linecap",e.linecap)).concat(D("stroke-linejoin",e.linejoin)):""}(l))),a.a.createElement("br",null),a.a.createElement("span",{className:"tab path"},'d="'.concat(n,'"')),a.a.createElement("br",null),a.a.createElement("span",{className:"tab"},"/>"),a.a.createElement("br",null),"</svg>"))},function(e){return{editor:e.editor}}),Z=function(e){function t(){var e,n;Object(l.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(a)))).createNew=function(){return H.select(S)},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return this.props.editor.edit?a.a.createElement("div",{className:"editor"},a.a.createElement(Y,null),a.a.createElement(I,null)):a.a.createElement("div",{className:"editor-placeholder",onClick:this.createNew},a.a.createElement("div",null,"Create new SVG"))}}]),t}(r.Component),$=L.wire(Z,function(e){return{editor:e.editor}}),K=function(){return a.a.createElement("main",null,a.a.createElement($,null),a.a.createElement(Q,null))},ee=function(e){return function(t){t.preventDefault();var n=t.target,r=n.value,a="number"===n.type?function(e){if(e){var t=Number(e);return isNaN(t)?void 0:t}}(r):r;e&&e(a)}},te=function(e){var t=e.label;return a.a.createElement("label",null,t)},ne=function(e){var t=e.error;return a.a.createElement("span",{className:"invalid-feedback"},t)},re=function(e){var t=e.label,n=e.value;return a.a.createElement("option",{value:n},t)},ae=function(e){var t=e.value,n=e.label,r=e.error,o=e.required,i=e.className,c=e.onChange,l=e.onBlur,u=e.options,s=e.disabled,m=function(e){return e.map(function(e,t){return void 0===e?"":"string"===typeof e?e:String(t)})}(u),d=function(e){return function(t){return e&&e(u[m.indexOf(t)].value)}},v=u.indexOf(u.find(function(e){return e.value===t}));return a.a.createElement("div",{className:i},n&&a.a.createElement(te,{label:n,required:o}),a.a.createElement("select",{disabled:s,onChange:ee(d(c)),onBlur:ee(d(l)),value:-1===v?"":String(v)},u.map(function(e,t){return a.a.createElement(re,{label:e.label,value:m[t],key:t})})),r&&a.a.createElement(ne,{error:r}))},oe=function(e,t){return[{label:t,value:void 0}].concat(Object(h.a)(e.map(function(e){return{label:e,value:e}})))},ie=oe(["butt","round","square"],"Linecap..."),ce=oe(["miter","round","bevel"],"Linejoin..."),le=function(e){function t(){var e,n;Object(l.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(a)))).onChangeSvgAttributes=function(e){H.set({svg:{attr:Object(f.a)({},e)}})},n.onChangeWidth=function(e){return e&&e>0&&n.onChangeSvgAttributes({width:e})},n.onChangeHeight=function(e){return e&&e>0&&n.onChangeSvgAttributes({height:e})},n.onChangeFill=function(e){return n.onChangeSvgAttributes({fill:e})},n.onChooseStroke=function(e){return n.onChangeSvgAttributes({stroke:e?{}:void 0})},n.onChangeStroke=function(e){return n.onChangeSvgAttributes({stroke:Object(f.a)({},n.props.attr.stroke,e)})},n.onChangeStrokeWidth=function(e){return n.onChangeStroke({width:e&&e>=0?e:void 0})},n.onChangeStrokeLinecap=function(e){return n.onChangeStroke({linecap:e})},n.onChangeStrokeLinejoin=function(e){return n.onChangeStroke({linejoin:e})},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props.attr,n=t.width,r=t.height,o=t.fill,i=t.stroke;return a.a.createElement("div",{className:"attributes"},a.a.createElement("label",null,"Width"),a.a.createElement("input",{type:"number",value:n,onChange:ee(this.onChangeWidth)}),a.a.createElement("label",null,"Height"),a.a.createElement("input",{type:"number",value:r,onChange:ee(this.onChangeHeight)}),a.a.createElement("label",null,"Fill"),a.a.createElement("input",{type:"checkbox",checked:o,onChange:function(){return e.onChangeFill(!o)}}),a.a.createElement("label",null,"Stroke"),a.a.createElement("input",{type:"checkbox",checked:!!i,onChange:function(){return e.onChooseStroke(!i)}}),i&&a.a.createElement(a.a.Fragment,null,a.a.createElement("label",null,"Stroke-Width"),a.a.createElement("input",{type:"number",value:i.width||"",onChange:ee(this.onChangeStrokeWidth)}),a.a.createElement(ae,{label:"Stroke-Linecap",value:i.linecap,options:ie,onChange:this.onChangeStrokeLinecap}),a.a.createElement(ae,{label:"Stroke-Linejoin",value:i.linejoin,options:ce,onChange:this.onChangeStrokeLinejoin})))}}]),t}(r.Component),ue=L.wire(le,function(e){return{attr:e.editor.svg.attr}}),se=n(10),me=function(e,t,n){return ee(function(r){return n(Object(f.a)({},e,Object(se.a)({},t,Number(r))))})},de=function(e){var t=e.value,n=e.onChange,r=e.active,o=e.onActivate,i=e.color;return a.a.createElement("div",{className:"point-picker",style:{border:"2px solid ".concat(i),backgroundColor:r?i:void 0},onClick:o},a.a.createElement("label",null,"Point"),a.a.createElement("input",{type:"number",value:t.x,onChange:me(t,"x",n)}),a.a.createElement("input",{type:"number",value:t.y,onChange:me(t,"y",n)}))},ve=function(e){var t=e.value,n=e.index;return a.a.createElement("div",{className:"point-picker"},a.a.createElement("label",null,"Value"),a.a.createElement("input",{type:"number",value:t,onChange:function(e){return ee(function(t){return H.updateValue(Number(t),e)})}(n)}))},he=[void 0,"M","m","Q","q","L","l","z","A","a","C","c","T","t","S","s","V","v","H","h"].map(function(e){return{label:void 0===e?"Add Command...":e,value:e}}),fe=function(e){function t(){var e,n;Object(l.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(a)))).onChooseCommand=function(e){return e&&H.addCommand(e)},n.onActivatePoint=function(e){return function(){return H.set({aPoint:e})}},n.onActivateCommand=function(e){return function(){return H.activateCommand(e)}},n.onRemoveCommand=function(e){return function(t){t.stopPropagation(),H.removeCommand(e)}},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props.editor,n=t.commands,r=t.aPoint,o=t.aCommand,i=n[o],c=i.points,l=i.values;return a.a.createElement("div",{className:"commands"},a.a.createElement(ae,{value:void 0,options:he,onChange:this.onChooseCommand}),n.map(function(t,n){return a.a.createElement("div",{className:p.classNames("command",n===o&&"active"),key:n,onClick:e.onActivateCommand(n)},t.letter,a.a.createElement("button",{onClick:e.onRemoveCommand(n),type:"button"},"Remove"))}),c.map(function(t,n){return a.a.createElement(de,{key:n,value:t,active:n===r,onChange:H.updatePoint,onActivate:e.onActivatePoint(n),color:z[n]})}),l.map(function(e,t){return a.a.createElement(ve,{key:t,value:e,index:t})}))}}]),t}(r.Component),pe=L.wire(fe,function(e){return{editor:e.editor}}),ge=function(e){function t(){var e,n;Object(l.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(a)))).onChangeName=function(e){return H.set({svg:{name:e}})},n.onSubmit=function(){var e=n.props.editor;F.set(e.svg),H.clear()},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"config"},a.a.createElement("div",{className:"controls"},a.a.createElement("div",{className:"svg-name"},a.a.createElement("label",{htmlFor:"name"},"Name"),a.a.createElement("input",{name:"name",type:"string",value:this.props.editor.svg.name,onChange:ee(this.onChangeName)})),a.a.createElement(ue,null),a.a.createElement(pe,null),a.a.createElement("div",{className:"buttons"},a.a.createElement("button",{className:"clear",onClick:H.clear},"Clear"),a.a.createElement("button",{className:"submit",onClick:this.onSubmit},"Submit"))))}}]),t}(r.Component),be=L.wire(ge,function(e){return{editor:e.editor}}),Ce=function(e){return e?"currentColor":"none"},ye=function(e){var t=e.className,n=e.path,r=e.width,o=e.height,i=e.fill,c=e.stroke;return a.a.createElement("svg",{className:t?t+" icon":"icon",viewBox:"0 0 ".concat(r," ").concat(o)},a.a.createElement("path",{fill:Ce(i),stroke:Ce(c),d:n}))},Ee=function(e){return a.a.createElement(ye,Object.assign({path:"M1 5l4-4l4 4m-4-4v8",width:10,height:10,stroke:!0},e))},we=function(e){function t(){var e,n;Object(l.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(a)))).state={open:!0},n.toggle=function(){return n.setState(function(e){return{open:!e.open}})},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.state.open;return this.props.editor.edit?a.a.createElement("div",{className:p.classNames("navigator",e&&"open")},a.a.createElement("div",{onClick:this.toggle},a.a.createElement(Ee,{className:"visibility-toggle"})),a.a.createElement(be,null)):null}}]),t}(r.Component),ke=L.wire(we,function(e){return{editor:e.editor}}),je=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Oe(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}var xe=document.getElementById("root");xe&&i.a.render(a.a.createElement(L.root,null,a.a.createElement(function(){return a.a.createElement("div",{className:"App"},a.a.createElement(c,null),a.a.createElement(K,null),a.a.createElement(ke,null))},null)),xe),function(e){if("serviceWorker"in navigator){if(new URL("/svg-editor",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/svg-editor","/service-worker.js");je?(function(e,t){fetch(e).then(function(n){404===n.status||-1===n.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):Oe(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):Oe(t,e)})}}()}},[[13,2,1]]]);
//# sourceMappingURL=main.0fb8cfdb.chunk.js.map