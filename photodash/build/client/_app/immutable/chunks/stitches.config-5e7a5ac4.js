import{_ as ne,$ as me,a0 as be,a1 as he,a2 as xe,B as ye}from"./index-fb8a4cb6.js";function gt(e,t){const n=[];if(t)for(let r=0;r<t.length;r++){const i=t[r],o=Array.isArray(i)?i[0]:i;Array.isArray(i)&&i.length>1?n.push(o(e,i[1])):n.push(o(e))}return{update(r){if((r&&r.length||0)!=n.length)throw new Error("You must not change the length of an actions array.");if(r)for(let i=0;i<r.length;i++){const o=n[i];if(o&&o.update){const d=r[i];Array.isArray(d)&&d.length>1?o.update(d[1]):o.update()}}},destroy(){for(let r=0;r<n.length;r++){const i=n[r];i&&i.destroy&&i.destroy()}}}}const Q="!",ke=new RegExp(`^[^${Q}]+(?:${Q}(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$`);function ut(e,t=[]){let n;const r=[];e.$on=(o,d)=>{const l=o;let a=()=>{};for(const p of t){if(typeof p=="string"&&p===l){const f=e.$$.callbacks[l]||(e.$$.callbacks[l]=[]);return f.push(d),()=>{const m=f.indexOf(d);m!==-1&&f.splice(m,1)}}if(typeof p=="object"&&p.name===l){const f=d;d=(...m)=>{typeof p=="object"&&p.shouldExclude()||f(...m)}}}return n?a=n(l,d):r.push([l,d]),()=>{a()}};function i(o){me(e,o)}return o=>{const d=[],l={};n=(a,p)=>{let f=a,m=p,s=!1;if(f.match(ke)){const y=f.split(Q);f=y[0];const u=Object.fromEntries(y.slice(1).map(S=>[S,!0]));u.passive&&(s=s||{},s.passive=!0),u.nonpassive&&(s=s||{},s.passive=!1),u.capture&&(s=s||{},s.capture=!0),u.once&&(s=s||{},s.once=!0),u.preventDefault&&(m=be(m)),u.stopPropagation&&(m=he(m))}const b=ne(o,f,m,s),k=()=>{b();const y=d.indexOf(k);y>-1&&d.splice(y,1)};return d.push(k),f in l||(l[f]=ne(o,f,i)),k};for(let a=0;a<r.length;a++)n(r[a][0],r[a][1]);return{destroy:()=>{for(let a=0;a<d.length;a++)d[a]();for(const a of Object.entries(l))a[1]()}}}}const Se={},mt=e=>`<style	id="stitches">${e()}</style>`;function V(){return xe(Se)}const Z=ye("light");function _(){let e;return Z==null||Z.subscribe(n=>{e=n}),{...dt,colorNames:Ce,colorScheme:e,dark:G==null?void 0:G.selector,fn:{themeColor:P.themeColor,size:P.size,radius:P.radius,rgba:P.rgba,variant:P.variant}}}function h(e,t=0){var i,o;const n=((i=V())==null?void 0:i.theme)||_();let r="50";return $e(e)?(t!==Number(0)&&(r=`${t.toString()}00`),(o=n.colors[`${e}${r}`])==null?void 0:o.value):e}function $e(e){let t=!1;switch(e){case"dark":t=!0;break;case"gray":t=!0;break;case"red":t=!0;break;case"pink":t=!0;break;case"grape":t=!0;break;case"violet":t=!0;break;case"indigo":t=!0;break;case"blue":t=!0;break;case"cyan":t=!0;break;case"teal":t=!0;break;case"green":t=!0;break;case"lime":t=!0;break;case"yellow":t=!0;break;case"orange":t=!0;break;default:t=!1;break}return t}function we(e){var t,n;return typeof e.size=="number"?e.size:typeof e.sizes[e.size]=="number"?e.sizes[e.size]:+((t=e.sizes[e.size])==null?void 0:t.value)||+((n=e.sizes.md)==null?void 0:n.value)}function Be(e){var n;const t=((n=V())==null?void 0:n.theme)||_();return typeof e=="number"?e:t.radii[e].value}function ze(e){const t=e.replace("#","");return typeof t=="string"&&t.length===6&&!Number.isNaN(Number(`0x${t}`))}function Re(e){const t=e.replace("#",""),n=parseInt(t,16),r=n>>16&255,i=n>>8&255,o=n&255;return{r,g:i,b:o,a:1}}function ve(e){const[t,n,r,i]=e.replace(/[^0-9,.]/g,"").split(",").map(Number);return{r:t,g:n,b:r,a:i||1}}function Ie(e){return ze(e)?Re(e):e.startsWith("rgb")?ve(e):{r:0,g:0,b:0,a:1}}function W(e,t=1){if(typeof e!="string"||t>1||t<0)return"rgba(0, 0, 0, 1)";const{r:n,g:r,b:i}=Ie(e);return`rgba(${n}, ${r}, ${i}, ${t})`}const q={from:"indigo",to:"cyan",deg:45};function We({variant:e,color:t,gradient:n}){var o;const r=((o=V())==null?void 0:o.theme)||_(),i=6;if(e==="light")return{border:"transparent",background:[W(h(t,8),.35),W(h(t,0),1)],color:[t==="dark"?h("dark",0):h(t,2),t==="dark"?h("dark",9):h(t,i)],hover:[W(h(t,7),.45),W(h(t,1),.65)]};if(e==="default")return{border:[h("dark",5),h("gray",4)],background:[h("dark",5),r.colors.white.value],color:[r.colors.white.value,r.colors.black.value],hover:[h("dark",4),h("gray",0)]};if(e==="white")return{border:"transparent",background:r.colors.white.value,color:h(t,i),hover:null};if(e==="outline")return{border:[h(t,4),h(t,i)],background:"transparent",color:[h(t,4),h(t,i)],hover:[W(h(t,4),.05),W(h(t,0),.35)]};if(e==="gradient"){const d={from:(n==null?void 0:n.from)||q.from,to:(n==null?void 0:n.to)||q.to,deg:(n==null?void 0:n.deg)||q.deg};return{background:`linear-gradient(${d.deg}deg, ${h(d.from,i)} 0%, ${h(d.to,i)} 100%)`,color:r.colors.white.value,border:"transparent",hover:null}}return e==="subtle"?{border:"transparent",background:"transparent",color:[t==="dark"?h("dark",0):h(t,2),t==="dark"?h("dark",9):h(t,i)],hover:[W(h(t,8),.35),W(h(t,0),1)]}:{border:"transparent",background:[h(t,8),h(t,i)],color:r.colors.white.value,hover:h(t,7)}}const P={size:we,radius:Be,themeColor:h,variant:We,rgba:W},de={primary:"#228be6",white:"#ffffff",black:"#000000",dark50:"#C1C2C5",dark100:"#A6A7AB",dark200:"#909296",dark300:"#5c5f66",dark400:"#373A40",dark500:"#2C2E33",dark600:"#25262b",dark700:"#1A1B1E",dark800:"#141517",dark900:"#101113",gray50:"#f8f9fa",gray100:"#f1f3f5",gray200:"#e9ecef",gray300:"#dee2e6",gray400:"#ced4da",gray500:"#adb5bd",gray600:"#868e96",gray700:"#495057",gray800:"#343a40",gray900:"#212529",red50:"#fff5f5",red100:"#ffe3e3",red200:"#ffc9c9",red300:"#ffa8a8",red400:"#ff8787",red500:"#ff6b6b",red600:"#fa5252",red700:"#f03e3e",red800:"#e03131",red900:"#c92a2a",pink50:"#fff0f6",pink100:"#ffdeeb",pink200:"#fcc2d7",pink300:"#faa2c1",pink400:"#f783ac",pink500:"#f06595",pink600:"#e64980",pink700:"#d6336c",pink800:"#c2255c",pink900:"#a61e4d",grape50:"#f8f0fc",grape100:"#f3d9fa",grape200:"#eebefa",grape300:"#e599f7",grape400:"#da77f2",grape500:"#cc5de8",grape600:"#be4bdb",grape700:"#ae3ec9",grape800:"#9c36b5",grape900:"#862e9c",violet50:"#f3f0ff",violet100:"#e5dbff",violet200:"#d0bfff",violet300:"#b197fc",violet400:"#9775fa",violet500:"#845ef7",violet600:"#7950f2",violet700:"#7048e8",violet800:"#6741d9",violet900:"#5f3dc4",indigo50:"#edf2ff",indigo100:"#dbe4ff",indigo200:"#bac8ff",indigo300:"#91a7ff",indigo400:"#748ffc",indigo500:"#5c7cfa",indigo600:"#4c6ef5",indigo700:"#4263eb",indigo800:"#3b5bdb",indigo900:"#364fc7",blue50:"#e7f5ff",blue100:"#d0ebff",blue200:"#a5d8ff",blue300:"#74c0fc",blue400:"#4dabf7",blue500:"#339af0",blue600:"#228be6",blue700:"#1c7ed6",blue800:"#1971c2",blue900:"#1864ab",cyan50:"#e3fafc",cyan100:"#c5f6fa",cyan200:"#99e9f2",cyan300:"#66d9e8",cyan400:"#3bc9db",cyan500:"#22b8cf",cyan600:"#15aabf",cyan700:"#1098ad",cyan800:"#0c8599",cyan900:"#0b7285",teal50:"#e6fcf5",teal100:"#c3fae8",teal200:"#96f2d7",teal300:"#63e6be",teal400:"#38d9a9",teal500:"#20c997",teal600:"#12b886",teal700:"#0ca678",teal800:"#099268",teal900:"#087f5b",green50:"#ebfbee",green100:"#d3f9d8",green200:"#b2f2bb",green300:"#8ce99a",green400:"#69db7c",green500:"#51cf66",green600:"#40c057",green700:"#37b24d",green800:"#2f9e44",green900:"#2b8a3e",lime50:"#f4fce3",lime100:"#e9fac8",lime200:"#d8f5a2",lime300:"#c0eb75",lime400:"#a9e34b",lime500:"#94d82d",lime600:"#82c91e",lime700:"#74b816",lime800:"#66a80f",lime900:"#5c940d",yellow50:"#fff9db",yellow100:"#fff3bf",yellow200:"#ffec99",yellow300:"#ffe066",yellow400:"#ffd43b",yellow500:"#fcc419",yellow600:"#fab005",yellow700:"#f59f00",yellow800:"#f08c00",yellow900:"#e67700",orange50:"#fff4e6",orange100:"#ffe8cc",orange200:"#ffd8a8",orange300:"#ffc078",orange400:"#ffa94d",orange500:"#ff922b",orange600:"#fd7e14",orange700:"#f76707",orange800:"#e8590c",orange900:"#d9480f"},Ce={blue:"blue",cyan:"cyan",dark:"dark",grape:"grape",gray:"gray",green:"green",indigo:"indigo",lime:"lime",orange:"orange",pink:"pink",red:"red",teal:"teal",violet:"violet",yellow:"yellow"},Ee={}.hasOwnProperty;function Te(...e){const t=[];for(let n=0;n<e.length;n++){const r=e[n];if(!r)continue;const i=typeof r;if(i==="string"||i==="number")t.push(r);else if(Array.isArray(r)){if(r.length){const o={...r};o&&t.push(o)}}else if(i==="object")if(r.toString===Object.prototype.toString)for(const o in r)Ee.call(r,o)&&r[o]&&t.push(o);else t.push(r.toString())}return t.join(" ")}function je(){return{cx:Te}}function Me(e){const t={};return Object.keys(e).forEach(n=>{const[r,i]=e[n];t[r]=i}),t}function Ae(e){return`__svelteui-ref-${e||""}`}function Oe(e,t,n){Object.keys(e).map(r=>{r!=="variants"&&("ref"in e[r]&&e[r].ref,"darkMode"in e[r]&&(e[r][`${t.dark} &`]=e[r].darkMode),e[`& .${r}`]=e[r],delete e[r])}),delete e["& .root"]}function bt(e){const t=typeof e=="function"?e:()=>e;function n(r={},i){var k;const o=((k=V())==null?void 0:k.theme)||_(),{cx:d}=je(),{override:l}=i||{};let a;const p=t(o,r,Ae),f=Object.assign({},p);Oe(f,o);const{root:m}=p,s=m!==void 0?{...m,...f}:p,g=ce(s),b=Me(Object.keys(p).map(y=>{const u=[];a==null||a.split("-")[(u==null?void 0:u.length)-1];let S=y.toString();return y==="root"&&(S=g({css:l}).toString()),[y,S]}));return{cx:d,theme:o,classes:b,getStyles:ce(s)}}return n}var x="colors",$="sizes",c="space",pe={gap:c,gridGap:c,columnGap:c,gridColumnGap:c,rowGap:c,gridRowGap:c,inset:c,insetBlock:c,insetBlockEnd:c,insetBlockStart:c,insetInline:c,insetInlineEnd:c,insetInlineStart:c,margin:c,marginTop:c,marginRight:c,marginBottom:c,marginLeft:c,marginBlock:c,marginBlockEnd:c,marginBlockStart:c,marginInline:c,marginInlineEnd:c,marginInlineStart:c,padding:c,paddingTop:c,paddingRight:c,paddingBottom:c,paddingLeft:c,paddingBlock:c,paddingBlockEnd:c,paddingBlockStart:c,paddingInline:c,paddingInlineEnd:c,paddingInlineStart:c,top:c,right:c,bottom:c,left:c,scrollMargin:c,scrollMarginTop:c,scrollMarginRight:c,scrollMarginBottom:c,scrollMarginLeft:c,scrollMarginX:c,scrollMarginY:c,scrollMarginBlock:c,scrollMarginBlockEnd:c,scrollMarginBlockStart:c,scrollMarginInline:c,scrollMarginInlineEnd:c,scrollMarginInlineStart:c,scrollPadding:c,scrollPaddingTop:c,scrollPaddingRight:c,scrollPaddingBottom:c,scrollPaddingLeft:c,scrollPaddingX:c,scrollPaddingY:c,scrollPaddingBlock:c,scrollPaddingBlockEnd:c,scrollPaddingBlockStart:c,scrollPaddingInline:c,scrollPaddingInlineEnd:c,scrollPaddingInlineStart:c,fontSize:"fontSizes",background:x,backgroundColor:x,backgroundImage:x,borderImage:x,border:x,borderBlock:x,borderBlockEnd:x,borderBlockStart:x,borderBottom:x,borderBottomColor:x,borderColor:x,borderInline:x,borderInlineEnd:x,borderInlineStart:x,borderLeft:x,borderLeftColor:x,borderRight:x,borderRightColor:x,borderTop:x,borderTopColor:x,caretColor:x,color:x,columnRuleColor:x,fill:x,outline:x,outlineColor:x,stroke:x,textDecorationColor:x,fontFamily:"fonts",fontWeight:"fontWeights",lineHeight:"lineHeights",letterSpacing:"letterSpacings",blockSize:$,minBlockSize:$,maxBlockSize:$,inlineSize:$,minInlineSize:$,maxInlineSize:$,width:$,minWidth:$,maxWidth:$,height:$,minHeight:$,maxHeight:$,flexBasis:$,gridTemplateColumns:$,gridTemplateRows:$,borderWidth:"borderWidths",borderTopWidth:"borderWidths",borderRightWidth:"borderWidths",borderBottomWidth:"borderWidths",borderLeftWidth:"borderWidths",borderStyle:"borderStyles",borderTopStyle:"borderStyles",borderRightStyle:"borderStyles",borderBottomStyle:"borderStyles",borderLeftStyle:"borderStyles",borderRadius:"radii",borderTopLeftRadius:"radii",borderTopRightRadius:"radii",borderBottomRightRadius:"radii",borderBottomLeftRadius:"radii",boxShadow:"shadows",textShadow:"shadows",transition:"transitions",zIndex:"zIndices"},Pe=(e,t)=>typeof t=="function"?{"()":Function.prototype.toString.call(t)}:t,D=()=>{const e=Object.create(null);return(t,n,...r)=>{const i=(o=>JSON.stringify(o,Pe))(t);return i in e?e[i]:e[i]=n(t,...r)}},U=Symbol.for("sxs.internal"),te=(e,t)=>Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)),ie=e=>{for(const t in e)return!0;return!1},{hasOwnProperty:Le}=Object.prototype,ee=e=>e.includes("-")?e:e.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()),He=/\s+(?![^()]*\))/,M=e=>t=>e(...typeof t=="string"?String(t).split(He):[t]),oe={appearance:e=>({WebkitAppearance:e,appearance:e}),backfaceVisibility:e=>({WebkitBackfaceVisibility:e,backfaceVisibility:e}),backdropFilter:e=>({WebkitBackdropFilter:e,backdropFilter:e}),backgroundClip:e=>({WebkitBackgroundClip:e,backgroundClip:e}),boxDecorationBreak:e=>({WebkitBoxDecorationBreak:e,boxDecorationBreak:e}),clipPath:e=>({WebkitClipPath:e,clipPath:e}),content:e=>({content:e.includes('"')||e.includes("'")||/^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(e)?e:`"${e}"`}),hyphens:e=>({WebkitHyphens:e,hyphens:e}),maskImage:e=>({WebkitMaskImage:e,maskImage:e}),maskSize:e=>({WebkitMaskSize:e,maskSize:e}),tabSize:e=>({MozTabSize:e,tabSize:e}),textSizeAdjust:e=>({WebkitTextSizeAdjust:e,textSizeAdjust:e}),userSelect:e=>({WebkitUserSelect:e,userSelect:e}),marginBlock:M((e,t)=>({marginBlockStart:e,marginBlockEnd:t||e})),marginInline:M((e,t)=>({marginInlineStart:e,marginInlineEnd:t||e})),maxSize:M((e,t)=>({maxBlockSize:e,maxInlineSize:t||e})),minSize:M((e,t)=>({minBlockSize:e,minInlineSize:t||e})),paddingBlock:M((e,t)=>({paddingBlockStart:e,paddingBlockEnd:t||e})),paddingInline:M((e,t)=>({paddingInlineStart:e,paddingInlineEnd:t||e}))},K=/([\d.]+)([^]*)/,De=(e,t)=>e.length?e.reduce((n,r)=>(n.push(...t.map(i=>i.includes("&")?i.replace(/&/g,/[ +>|~]/.test(r)&&/&.*&/.test(i)?`:is(${r})`:r):r+" "+i)),n),[]):t,Ne=(e,t)=>e in Fe&&typeof t=="string"?t.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/,(n,r,i,o)=>r+(i==="stretch"?`-moz-available${o};${ee(e)}:${r}-webkit-fill-available`:`-moz-fit-content${o};${ee(e)}:${r}fit-content`)+o):String(t),Fe={blockSize:1,height:1,inlineSize:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,width:1},C=e=>e?e+"-":"",fe=(e,t,n)=>e.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g,(r,i,o,d,l)=>d=="$"==!!o?r:(i||d=="--"?"calc(":"")+"var(--"+(d==="$"?C(t)+(l.includes("$")?"":C(n))+l.replace(/\$/g,"-"):l)+")"+(i||d=="--"?"*"+(i||"")+(o||"1")+")":"")),Ue=/\s*,\s*(?![^()]*\))/,Ge=Object.prototype.toString,A=(e,t,n,r,i)=>{let o,d,l;const a=(p,f,m)=>{let s,g;const b=k=>{for(s in k){const S=s.charCodeAt(0)===64,X=S&&Array.isArray(k[s])?k[s]:[k[s]];for(g of X){const R=/[A-Z]/.test(u=s)?u:u.replace(/-[^]/g,w=>w[1].toUpperCase()),O=typeof g=="object"&&g&&g.toString===Ge&&(!r.utils[R]||!f.length);if(R in r.utils&&!O){const w=r.utils[R];if(w!==d){d=w,b(w(g)),d=null;continue}}else if(R in oe){const w=oe[R];if(w!==l){l=w,b(w(g)),l=null;continue}}if(S&&(y=s.slice(1)in r.media?"@media "+r.media[s.slice(1)]:s,s=y.replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g,(w,B,v,E,z,I)=>{const j=K.test(B),N=.0625*(j?-1:1),[F,re]=j?[E,B]:[B,E];return"("+(v[0]==="="?"":v[0]===">"===j?"max-":"min-")+F+":"+(v[0]!=="="&&v.length===1?re.replace(K,(ue,J,Y)=>Number(J)+N*(v===">"?1:-1)+Y):re)+(z?") and ("+(z[0]===">"?"min-":"max-")+F+":"+(z.length===1?I.replace(K,(ue,J,Y)=>Number(J)+N*(z===">"?-1:1)+Y):I):"")+")"})),O){const w=S?m.concat(s):[...m],B=S?[...f]:De(f,s.split(Ue));o!==void 0&&i(ae(...o)),o=void 0,a(g,B,w)}else o===void 0&&(o=[[],f,m]),s=S||s.charCodeAt(0)!==36?s:`--${C(r.prefix)}${s.slice(1).replace(/\$/g,"-")}`,g=O?g:typeof g=="number"?g&&R in Ve?String(g)+"px":String(g):fe(Ne(R,g??""),r.prefix,r.themeMap[R]),o[0].push(`${S?`${s} `:`${ee(s)}:`}${g}`)}}var y,u};b(p),o!==void 0&&i(ae(...o)),o=void 0};a(e,t,n)},ae=(e,t,n)=>`${n.map(r=>`${r}{`).join("")}${t.length?`${t.join(",")}{`:""}${e.join(";")}${t.length?"}":""}${Array(n.length?n.length+1:0).join("}")}`,Ve={animationDelay:1,animationDuration:1,backgroundSize:1,blockSize:1,border:1,borderBlock:1,borderBlockEnd:1,borderBlockEndWidth:1,borderBlockStart:1,borderBlockStartWidth:1,borderBlockWidth:1,borderBottom:1,borderBottomLeftRadius:1,borderBottomRightRadius:1,borderBottomWidth:1,borderEndEndRadius:1,borderEndStartRadius:1,borderInlineEnd:1,borderInlineEndWidth:1,borderInlineStart:1,borderInlineStartWidth:1,borderInlineWidth:1,borderLeft:1,borderLeftWidth:1,borderRadius:1,borderRight:1,borderRightWidth:1,borderSpacing:1,borderStartEndRadius:1,borderStartStartRadius:1,borderTop:1,borderTopLeftRadius:1,borderTopRightRadius:1,borderTopWidth:1,borderWidth:1,bottom:1,columnGap:1,columnRule:1,columnRuleWidth:1,columnWidth:1,containIntrinsicSize:1,flexBasis:1,fontSize:1,gap:1,gridAutoColumns:1,gridAutoRows:1,gridTemplateColumns:1,gridTemplateRows:1,height:1,inlineSize:1,inset:1,insetBlock:1,insetBlockEnd:1,insetBlockStart:1,insetInline:1,insetInlineEnd:1,insetInlineStart:1,left:1,letterSpacing:1,margin:1,marginBlock:1,marginBlockEnd:1,marginBlockStart:1,marginBottom:1,marginInline:1,marginInlineEnd:1,marginInlineStart:1,marginLeft:1,marginRight:1,marginTop:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,offsetDistance:1,offsetRotate:1,outline:1,outlineOffset:1,outlineWidth:1,overflowClipMargin:1,padding:1,paddingBlock:1,paddingBlockEnd:1,paddingBlockStart:1,paddingBottom:1,paddingInline:1,paddingInlineEnd:1,paddingInlineStart:1,paddingLeft:1,paddingRight:1,paddingTop:1,perspective:1,right:1,rowGap:1,scrollMargin:1,scrollMarginBlock:1,scrollMarginBlockEnd:1,scrollMarginBlockStart:1,scrollMarginBottom:1,scrollMarginInline:1,scrollMarginInlineEnd:1,scrollMarginInlineStart:1,scrollMarginLeft:1,scrollMarginRight:1,scrollMarginTop:1,scrollPadding:1,scrollPaddingBlock:1,scrollPaddingBlockEnd:1,scrollPaddingBlockStart:1,scrollPaddingBottom:1,scrollPaddingInline:1,scrollPaddingInlineEnd:1,scrollPaddingInlineStart:1,scrollPaddingLeft:1,scrollPaddingRight:1,scrollPaddingTop:1,shapeMargin:1,textDecoration:1,textDecorationThickness:1,textIndent:1,textUnderlineOffset:1,top:1,transitionDelay:1,transitionDuration:1,verticalAlign:1,width:1,wordSpacing:1},se=e=>String.fromCharCode(e+(e>25?39:97)),T=e=>(t=>{let n,r="";for(n=Math.abs(t);n>52;n=n/52|0)r=se(n%52)+r;return se(n%52)+r})(((t,n)=>{let r=n.length;for(;r;)t=33*t^n.charCodeAt(--r);return t})(5381,JSON.stringify(e))>>>0),H=["themed","global","styled","onevar","resonevar","allvar","inline"],_e=e=>{if(e.href&&!e.href.startsWith(location.origin))return!1;try{return!!e.cssRules}catch{return!1}},Xe=e=>{let t;const n=()=>{const{cssRules:i}=t.sheet;return[].map.call(i,(o,d)=>{const{cssText:l}=o;let a="";if(l.startsWith("--sxs"))return"";if(i[d-1]&&(a=i[d-1].cssText).startsWith("--sxs")){if(!o.cssRules.length)return"";for(const p in t.rules)if(t.rules[p].group===o)return`--sxs{--sxs:${[...t.rules[p].cache].join(" ")}}${l}`;return o.cssRules.length?`${a}${l}`:""}return l}).join("")},r=()=>{if(t){const{rules:l,sheet:a}=t;if(!a.deleteRule){for(;Object(Object(a.cssRules)[0]).type===3;)a.cssRules.splice(0,1);a.cssRules=[]}for(const p in l)delete l[p]}const i=Object(e).styleSheets||[];for(const l of i)if(_e(l)){for(let a=0,p=l.cssRules;p[a];++a){const f=Object(p[a]);if(f.type!==1)continue;const m=Object(p[a+1]);if(m.type!==4)continue;++a;const{cssText:s}=f;if(!s.startsWith("--sxs"))continue;const g=s.slice(14,-3).trim().split(/\s+/),b=H[g[0]];b&&(t||(t={sheet:l,reset:r,rules:{},toString:n}),t.rules[b]={group:m,index:a,cache:new Set(g)})}if(t)break}if(!t){const l=(a,p)=>({type:p,cssRules:[],insertRule(f,m){this.cssRules.splice(m,0,l(f,{import:3,undefined:1}[(f.toLowerCase().match(/^@([a-z]+)/)||[])[1]]||4))},get cssText(){return a==="@media{}"?`@media{${[].map.call(this.cssRules,f=>f.cssText).join("")}}`:a}});t={sheet:e?(e.head||e).appendChild(document.createElement("style")).sheet:l("","text/css"),rules:{},reset:r,toString:n}}const{sheet:o,rules:d}=t;for(let l=H.length-1;l>=0;--l){const a=H[l];if(!d[a]){const p=H[l+1],f=d[p]?d[p].index:o.cssRules.length;o.insertRule("@media{}",f),o.insertRule(`--sxs{--sxs:${l}}`,f),d[a]={group:o.cssRules[f+1],index:f,cache:new Set([l])}}Je(d[a])}};return r(),t},Je=e=>{const t=e.group;let n=t.cssRules.length;e.apply=r=>{try{t.insertRule(r,n),++n}catch{}}},L=Symbol(),Ye=D(),Ze=(e,t)=>Ye(e,()=>(...n)=>{let r={type:null,composers:new Set};for(const i of n)if(i!=null)if(i[U]){r.type==null&&(r.type=i[U].type);for(const o of i[U].composers)r.composers.add(o)}else i.constructor!==Object||i.$$typeof?r.type==null&&(r.type=i):r.composers.add(qe(i,e));return r.type==null&&(r.type="span"),r.composers.size||r.composers.add(["PJLV",{},[],[],{},[]]),Ke(e,r,t)}),qe=({variants:e,compoundVariants:t,defaultVariants:n,...r},i)=>{const o=`${C(i.prefix)}c-${T(r)}`,d=[],l=[],a=Object.create(null),p=[];for(const s in n)a[s]=String(n[s]);if(typeof e=="object"&&e)for(const s in e){f=a,m=s,Le.call(f,m)||(a[s]="undefined");const g=e[s];for(const b in g){const k={[s]:String(b)};String(b)==="undefined"&&p.push(s);const y=g[b],u=[k,y,!ie(y)];d.push(u)}}var f,m;if(typeof t=="object"&&t)for(const s of t){let{css:g,...b}=s;g=typeof g=="object"&&g||{};for(const y in b)b[y]=String(b[y]);const k=[b,g,!ie(g)];l.push(k)}return[o,r,d,l,a,p]},Ke=(e,t,n)=>{const[r,i,o,d]=Qe(t.composers),l=typeof t.type=="function"||t.type.$$typeof?(m=>{function s(){for(let g=0;g<s[L].length;g++){const[b,k]=s[L][g];m.rules[b].apply(k)}return s[L]=[],null}return s[L]=[],s.rules={},H.forEach(g=>s.rules[g]={apply:b=>s[L].push([g,b])}),s})(n):null,a=(l||n).rules,p=`.${r}${i.length>1?`:where(.${i.slice(1).join(".")})`:""}`,f=m=>{m=typeof m=="object"&&m||et;const{css:s,...g}=m,b={};for(const u in o)if(delete g[u],u in m){let S=m[u];typeof S=="object"&&S?b[u]={"@initial":o[u],...S}:(S=String(S),b[u]=S!=="undefined"||d.has(u)?S:o[u])}else b[u]=o[u];const k=new Set([...i]);for(const[u,S,X,R]of t.composers){n.rules.styled.cache.has(u)||(n.rules.styled.cache.add(u),A(S,[`.${u}`],[],e,B=>{a.styled.apply(B)}));const O=le(X,b,e.media),w=le(R,b,e.media,!0);for(const B of O)if(B!==void 0)for(const[v,E,z]of B){const I=`${u}-${T(E)}-${v}`;k.add(I);const j=(z?n.rules.resonevar:n.rules.onevar).cache,N=z?a.resonevar:a.onevar;j.has(I)||(j.add(I),A(E,[`.${I}`],[],e,F=>{N.apply(F)}))}for(const B of w)if(B!==void 0)for(const[v,E]of B){const z=`${u}-${T(E)}-${v}`;k.add(z),n.rules.allvar.cache.has(z)||(n.rules.allvar.cache.add(z),A(E,[`.${z}`],[],e,I=>{a.allvar.apply(I)}))}}if(typeof s=="object"&&s){const u=`${r}-i${T(s)}-css`;k.add(u),n.rules.inline.cache.has(u)||(n.rules.inline.cache.add(u),A(s,[`.${u}`],[],e,S=>{a.inline.apply(S)}))}for(const u of String(m.className||"").trim().split(/\s+/))u&&k.add(u);const y=g.className=[...k].join(" ");return{type:t.type,className:y,selector:p,props:g,toString:()=>y,deferredInjector:l}};return te(f,{className:r,selector:p,[U]:t,toString:()=>(n.rules.styled.cache.has(r)||f(),r)})},Qe=e=>{let t="";const n=[],r={},i=[];for(const[o,,,,d,l]of e){t===""&&(t=o),n.push(o),i.push(...l);for(const a in d){const p=d[a];(r[a]===void 0||p!=="undefined"||l.includes(p))&&(r[a]=p)}}return[t,n,r,new Set(i)]},le=(e,t,n,r)=>{const i=[];e:for(let[o,d,l]of e){if(l)continue;let a,p=0,f=!1;for(a in o){const m=o[a];let s=t[a];if(s!==m){if(typeof s!="object"||!s)continue e;{let g,b,k=0;for(const y in s){if(m===String(s[y])){if(y!=="@initial"){const u=y.slice(1);(b=b||[]).push(u in n?n[u]:y.replace(/^@media ?/,"")),f=!0}p+=k,g=!0}++k}if(b&&b.length&&(d={["@media "+b.join(", ")]:d}),!g)continue e}}}(i[p]=i[p]||[]).push([r?"cv":`${a}-${o[a]}`,d,f])}return i},et={},tt=D(),rt=(e,t)=>tt(e,()=>(...n)=>{const r=()=>{for(let i of n){i=typeof i=="object"&&i||{};let o=T(i);if(!t.rules.global.cache.has(o)){if(t.rules.global.cache.add(o),"@import"in i){let d=[].indexOf.call(t.sheet.cssRules,t.rules.themed.group)-1;for(let l of[].concat(i["@import"]))l=l.includes('"')||l.includes("'")?l:`"${l}"`,t.sheet.insertRule(`@import ${l};`,d++);delete i["@import"]}A(i,[],[],e,d=>{t.rules.global.apply(d)})}}return""};return te(r,{toString:r})}),nt=D(),it=(e,t)=>nt(e,()=>n=>{const r=`${C(e.prefix)}k-${T(n)}`,i=()=>{if(!t.rules.global.cache.has(r)){t.rules.global.cache.add(r);const o=[];A(n,[],[],e,l=>o.push(l));const d=`@keyframes ${r}{${o.join("")}}`;t.rules.global.apply(d)}return r};return te(i,{get name(){return i()},toString:i})}),ot=class{constructor(e,t,n,r){this.token=e==null?"":String(e),this.value=t==null?"":String(t),this.scale=n==null?"":String(n),this.prefix=r==null?"":String(r)}get computedValue(){return"var("+this.variable+")"}get variable(){return"--"+C(this.prefix)+C(this.scale)+this.token}toString(){return this.computedValue}},at=D(),st=(e,t)=>at(e,()=>(n,r)=>{r=typeof n=="object"&&n||Object(r);const i=`.${n=(n=typeof n=="string"?n:"")||`${C(e.prefix)}t-${T(r)}`}`,o={},d=[];for(const a in r){o[a]={};for(const p in r[a]){const f=`--${C(e.prefix)}${a}-${p}`,m=fe(String(r[a][p]),e.prefix,a);o[a][p]=new ot(p,m,a,e.prefix),d.push(`${f}:${m}`)}}const l=()=>{if(d.length&&!t.rules.themed.cache.has(n)){t.rules.themed.cache.add(n);const a=`${r===e.theme?":root,":""}.${n}{${d.join(";")}}`;t.rules.themed.apply(a)}return n};return{...o,get className(){return l()},selector:i,toString:l}}),lt=D(),ct=e=>{let t=!1;const n=lt(e,r=>{t=!0;const i="prefix"in(r=typeof r=="object"&&r||{})?String(r.prefix):"",o=typeof r.media=="object"&&r.media||{},d=typeof r.root=="object"?r.root||null:globalThis.document||null,l=typeof r.theme=="object"&&r.theme||{},a={prefix:i,media:o,theme:l,themeMap:typeof r.themeMap=="object"&&r.themeMap||{...pe},utils:typeof r.utils=="object"&&r.utils||{}},p=Xe(d),f={css:Ze(a,p),globalCss:rt(a,p),keyframes:it(a,p),createTheme:st(a,p),reset(){p.reset(),f.theme.toString()},theme:{},sheet:p,config:a,prefix:i,getCssText:p.toString,toString:p.toString};return String(f.theme=f.createTheme(l)),f});return t||n.reset(),n};const{css:ce,globalCss:ge,keyframes:ht,getCssText:xt,theme:dt,createTheme:pt,config:yt,reset:kt}=ct({prefix:"svelteui",theme:{colors:de,space:{0:"0rem",xs:10,sm:12,md:16,lg:20,xl:24,xsPX:"10px",smPX:"12px",mdPX:"16px",lgPX:"20px",xlPX:"24px",1:"0.125rem",2:"0.25rem",3:"0.375rem",4:"0.5rem",5:"0.625rem",6:"0.75rem",7:"0.875rem",8:"1rem",9:"1.25rem",10:"1.5rem",11:"1.75rem",12:"2rem",13:"2.25rem",14:"2.5rem",15:"2.75rem",16:"3rem",17:"3.5rem",18:"4rem",20:"5rem",24:"6rem",28:"7rem",32:"8rem",36:"9rem",40:"10rem",44:"11rem",48:"12rem",52:"13rem",56:"14rem",60:"15rem",64:"16rem",72:"18rem",80:"20rem",96:"24rem"},fontSizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px"},fonts:{standard:"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",fallback:"Segoe UI, system-ui, sans-serif"},fontWeights:{thin:100,extralight:200,light:300,normal:400,medium:500,semibold:600,bold:700,extrabold:800},lineHeights:{xs:1,sm:1.25,md:1.5,lg:1.625,xl:1.75},letterSpacings:{tighter:"-0.05em",tight:"-0.025em",normal:"0",wide:"0.025em",wider:"0.05em",widest:"0.1em"},sizes:{},radii:{xs:"2px",sm:"4px",md:"8px",lg:"16px",xl:"32px",squared:"33%",rounded:"50%",pill:"9999px"},shadows:{xs:"0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",sm:"0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px",md:"0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",lg:"0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px",xl:"0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px"},zIndices:{1:"100",2:"200",3:"300",4:"400",5:"500",10:"1000",max:"9999"},borderWidths:{light:"1px",normal:"2px",bold:"3px",extrabold:"4px",black:"5px",xs:"1px",sm:"2px",md:"3px",lg:"4px",xl:"5px"},breakpoints:{xs:576,sm:768,md:992,lg:1200,xl:1400},borderStyles:{},transitions:{}},media:{xs:"(min-width: 576px)",sm:"(min-width: 768px)",md:"(min-width: 992px)",lg:"(min-width: 1200px)",xl:"(min-width: 1400px)"},utils:{focusRing:e=>({WebkitTapHighlightColor:"transparent","&:focus":{outlineOffset:2,outline:e==="always"||e==="auto"?"2px solid $primary":"none"},"&:focus:not(:focus-visible)":{outline:e==="auto"||e==="never"?"none":void 0}}),p:e=>({padding:e}),pt:e=>({paddingTop:e}),pr:e=>({paddingRight:e}),pb:e=>({paddingBottom:e}),pl:e=>({paddingLeft:e}),px:e=>({paddingLeft:e,paddingRight:e}),py:e=>({paddingTop:e,paddingBottom:e}),m:e=>({margin:e}),mt:e=>({marginTop:e}),mr:e=>({marginRight:e}),mb:e=>({marginBottom:e}),ml:e=>({marginLeft:e}),mx:e=>({marginLeft:e,marginRight:e}),my:e=>({marginTop:e,marginBottom:e}),ta:e=>({textAlign:e}),tt:e=>({textTransform:e}),to:e=>({textOverflow:e}),d:e=>({display:e}),dflex:e=>({display:"flex",alignItems:e,justifyContent:e}),fd:e=>({flexDirection:e}),fw:e=>({flexWrap:e}),ai:e=>({alignItems:e}),ac:e=>({alignContent:e}),jc:e=>({justifyContent:e}),as:e=>({alignSelf:e}),fg:e=>({flexGrow:e}),fs:e=>({fontSize:e}),fb:e=>({flexBasis:e}),bc:e=>({backgroundColor:e}),bf:e=>({backdropFilter:e}),bg:e=>({background:e}),bgBlur:e=>({bf:"saturate(180%) blur(10px)",bg:e}),bgColor:e=>({backgroundColor:e}),backgroundClip:e=>({WebkitBackgroundClip:e,backgroundClip:e}),bgClip:e=>({WebkitBackgroundClip:e,backgroundClip:e}),br:e=>({borderRadius:e}),bw:e=>({borderWidth:e}),btrr:e=>({borderTopRightRadius:e}),bbrr:e=>({borderBottomRightRadius:e}),bblr:e=>({borderBottomLeftRadius:e}),btlr:e=>({borderTopLeftRadius:e}),bs:e=>({boxShadow:e}),normalShadow:e=>({boxShadow:`0 4px 14px 0 $${e}`}),lh:e=>({lineHeight:e}),ov:e=>({overflow:e}),ox:e=>({overflowX:e}),oy:e=>({overflowY:e}),pe:e=>({pointerEvents:e}),events:e=>({pointerEvents:e}),us:e=>({WebkitUserSelect:e,userSelect:e}),userSelect:e=>({WebkitUserSelect:e,userSelect:e}),w:e=>({width:e}),h:e=>({height:e}),minW:e=>({minWidth:e}),minH:e=>({minWidth:e}),mw:e=>({maxWidth:e}),maxW:e=>({maxWidth:e}),mh:e=>({maxHeight:e}),maxH:e=>({maxHeight:e}),size:e=>({width:e,height:e}),minSize:e=>({minWidth:e,minHeight:e,width:e,height:e}),sizeMin:e=>({minWidth:e,minHeight:e,width:e,height:e}),maxSize:e=>({maxWidth:e,maxHeight:e}),sizeMax:e=>({maxWidth:e,maxHeight:e}),appearance:e=>({WebkitAppearance:e,appearance:e}),scale:e=>({transform:`scale(${e})`}),linearGradient:e=>({backgroundImage:`linear-gradient(${e})`}),tdl:e=>({textDecorationLine:e}),textGradient:e=>({backgroundImage:`linear-gradient(${e})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"})},themeMap:{...pe,width:"space",height:"space",minWidth:"space",maxWidth:"space",minHeight:"space",maxHeight:"space",flexBasis:"space",gridTemplateColumns:"space",gridTemplateRows:"space",blockSize:"space",minBlockSize:"space",maxBlockSize:"space",inlineSize:"space",minInlineSize:"space",maxInlineSize:"space",borderWidth:"borderWeights"}}),G=pt("dark-theme",{colors:de,shadows:{xs:"-4px 0 15px rgb(0 0 0 / 50%)",sm:"0 5px 20px -5px rgba(20, 20, 20, 0.1)",md:"0 8px 30px rgba(20, 20, 20, 0.15)",lg:"0 30px 60px rgba(20, 20, 20, 0.15)",xl:"0 40px 80px rgba(20, 20, 20, 0.25)"}}),St=ge({a:{focusRing:"auto"},body:{[`${G.selector} &`]:{backgroundColor:"$dark700",color:"$dark50"},backgroundColor:"$white",color:"$black"}}),$t=ge({html:{fontFamily:"sans-serif",lineHeight:"1.15",textSizeAdjust:"100%",margin:0},body:{margin:0},"article, aside, footer, header, nav, section, figcaption, figure, main":{display:"block"},h1:{fontSize:"2em",margin:0},hr:{boxSizing:"content-box",height:0,overflow:"visible"},pre:{fontFamily:"monospace, monospace",fontSize:"1em"},a:{background:"transparent",textDecorationSkip:"objects"},"a:active, a:hover":{outlineWidth:0},"abbr[title]":{borderBottom:"none",textDecoration:"underline"},"b, strong":{fontWeight:"bolder"},"code, kbp, samp":{fontFamily:"monospace, monospace",fontSize:"1em"},dfn:{fontStyle:"italic"},mark:{backgroundColor:"#ff0",color:"#000"},small:{fontSize:"80%"},"sub, sup":{fontSize:"75%",lineHeight:0,position:"relative",verticalAlign:"baseline"},sup:{top:"-0.5em"},sub:{bottom:"-0.25em"},"audio, video":{display:"inline-block"},"audio:not([controls])":{display:"none",height:0},img:{borderStyle:"none",verticalAlign:"middle"},"svg:not(:root)":{overflow:"hidden"},"button, input, optgroup, select, textarea":{fontFamily:"sans-serif",fontSize:"100%",lineHeight:"1.15",margin:0},"button, input":{overflow:"visible"},"button, select":{textTransform:"none"},"button, [type=reset], [type=submit]":{WebkitAppearance:"button"},"button::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner":{borderStyle:"none",padding:0},"button:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring":{outline:"1px dotted ButtonText"},legend:{boxSizing:"border-box",color:"inherit",display:"table",maxWidth:"100%",padding:0,whiteSpace:"normal"},progress:{display:"inline-block",verticalAlign:"baseline"},textarea:{overflow:"auto"},"[type=checkbox], [type=radio]":{boxSizing:"border-box",padding:0},"[type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button":{height:"auto"},"[type=search]":{appearance:"textfield",outlineOffset:"-2px"},"[type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration":{appearance:"none"},"::-webkit-file-upload-button":{appearance:"button",font:"inherit"},"details, menu":{display:"block"},summary:{display:"list-item"},canvas:{display:"inline-block"},template:{display:"none"},"[hidden]":{display:"none"}});export{$t as N,St as S,_ as a,V as b,Z as c,ut as d,G as e,bt as f,xt as g,ce as h,P as i,Se as k,mt as s,dt as t,gt as u};