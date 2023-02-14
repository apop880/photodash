import{a7 as U,a8 as L}from"./index-fb8a4cb6.js";import{p as C}from"./stores-3fa92a4b.js";const N=1,_=2,k=3,T=4,P=5;function A(t){return{type:"auth",access_token:t}}function q(){return{type:"supported_features",id:1,features:{coalesce_messages:1}}}function x(){return{type:"get_states"}}function $(t,e,n,i){const s={type:"call_service",domain:t,service:e,target:i};return n&&(s.service_data=n),s}function D(t){const e={type:"subscribe_events"};return t&&(e.event_type=t),e}function w(t){return{type:"unsubscribe_events",subscription:t}}function j(){return{type:"ping"}}function H(t,e){return{type:"result",success:!1,error:{code:t,message:e}}}function J(t){const e={},n=t.split("&");for(let i=0;i<n.length;i++){const s=n[i].split("="),r=decodeURIComponent(s[0]),o=s.length>1?decodeURIComponent(s[1]):void 0;e[r]=o}return e}const O=(t,e,n,i)=>{const[s,r,o]=t.split(".",3);return Number(s)>e||Number(s)===e&&(i===void 0?Number(r)>=n:Number(r)>n)||i!==void 0&&Number(s)===e&&Number(r)===n&&Number(o)>=i},V="auth_invalid",z="auth_ok";function F(t){if(!t.auth)throw T;const e=t.auth;let n=e.expired?e.refreshAccessToken().then(()=>{n=void 0},()=>{n=void 0}):void 0;const i=e.wsUrl;function s(r,o,a){const c=new WebSocket(i);let d=!1;const h=()=>{if(c.removeEventListener("close",h),d){a(_);return}if(r===0){a(N);return}const l=r===-1?-1:r-1;setTimeout(()=>s(l,o,a),1e3)},b=async l=>{try{e.expired&&await(n||e.refreshAccessToken()),c.send(JSON.stringify(A(e.accessToken)))}catch(u){d=u===_,c.close()}},p=async l=>{const u=JSON.parse(l.data);switch(u.type){case V:d=!0,c.close();break;case z:c.removeEventListener("open",b),c.removeEventListener("message",p),c.removeEventListener("close",h),c.removeEventListener("error",h),c.haVersion=u.ha_version,O(c.haVersion,2022,9)&&c.send(JSON.stringify(q())),o(c);break}};c.addEventListener("open",b),c.addEventListener("message",p),c.addEventListener("close",h),c.addEventListener("error",h)}return new Promise((r,o)=>s(t.setupRetry,r,o))}class G{constructor(e,n){this._handleMessage=i=>{let s=JSON.parse(i.data);Array.isArray(s)||(s=[s]),s.forEach(r=>{const o=this.commands.get(r.id);switch(r.type){case"event":o?o.callback(r.event):(console.warn(`Received event for unknown subscription ${r.id}. Unsubscribing.`),this.sendMessagePromise(w(r.id)));break;case"result":o&&(r.success?(o.resolve(r.result),"subscribe"in o||this.commands.delete(r.id)):(o.reject(r.error),this.commands.delete(r.id)));break;case"pong":o?(o.resolve(),this.commands.delete(r.id)):console.warn(`Received unknown pong response ${r.id}`);break}})},this._handleClose=async()=>{const i=this.commands;if(this.commandId=1,this.oldSubscriptions=this.commands,this.commands=new Map,this.socket=void 0,i.forEach(o=>{"subscribe"in o||o.reject(H(k,"Connection lost"))}),this.closeRequested)return;this.fireEvent("disconnected");const s=Object.assign(Object.assign({},this.options),{setupRetry:0}),r=o=>{setTimeout(async()=>{if(!this.closeRequested)try{const a=await s.createSocket(s);this._setSocket(a)}catch(a){if(this._queuedMessages){const c=this._queuedMessages;this._queuedMessages=void 0;for(const d of c)d.reject&&d.reject(k)}a===_?this.fireEvent("reconnect-error",a):r(o+1)}},Math.min(o,5)*1e3)};this.suspendReconnectPromise&&(await this.suspendReconnectPromise,this.suspendReconnectPromise=void 0,this._queuedMessages=[]),r(0)},this.options=n,this.commandId=2,this.commands=new Map,this.eventListeners=new Map,this.closeRequested=!1,this._setSocket(e)}get connected(){return this.socket!==void 0&&this.socket.readyState==this.socket.OPEN}_setSocket(e){this.socket=e,this.haVersion=e.haVersion,e.addEventListener("message",this._handleMessage),e.addEventListener("close",this._handleClose);const n=this.oldSubscriptions;n&&(this.oldSubscriptions=void 0,n.forEach(s=>{"subscribe"in s&&s.subscribe&&s.subscribe().then(r=>{s.unsubscribe=r,s.resolve()})}));const i=this._queuedMessages;if(i){this._queuedMessages=void 0;for(const s of i)s.resolve()}this.fireEvent("ready")}addEventListener(e,n){let i=this.eventListeners.get(e);i||(i=[],this.eventListeners.set(e,i)),i.push(n)}removeEventListener(e,n){const i=this.eventListeners.get(e);if(!i)return;const s=i.indexOf(n);s!==-1&&i.splice(s,1)}fireEvent(e,n){(this.eventListeners.get(e)||[]).forEach(i=>i(this,n))}suspendReconnectUntil(e){this.suspendReconnectPromise=e}suspend(){if(!this.suspendReconnectPromise)throw new Error("Suspend promise not set");this.socket&&this.socket.close()}reconnect(e=!1){if(this.socket){if(!e){this.socket.close();return}this.socket.removeEventListener("message",this._handleMessage),this.socket.removeEventListener("close",this._handleClose),this.socket.close(),this._handleClose()}}close(){this.closeRequested=!0,this.socket&&this.socket.close()}async subscribeEvents(e,n){return this.subscribeMessage(e,D(n))}ping(){return this.sendMessagePromise(j())}sendMessage(e,n){if(!this.connected)throw k;if(this._queuedMessages){if(n)throw new Error("Cannot queue with commandId");this._queuedMessages.push({resolve:()=>this.sendMessage(e)});return}n||(n=this._genCmdId()),e.id=n,this.socket.send(JSON.stringify(e))}sendMessagePromise(e){return new Promise((n,i)=>{if(this._queuedMessages){this._queuedMessages.push({reject:i,resolve:async()=>{try{n(await this.sendMessagePromise(e))}catch(r){i(r)}}});return}const s=this._genCmdId();this.commands.set(s,{resolve:n,reject:i}),this.sendMessage(e,s)})}async subscribeMessage(e,n,i){this._queuedMessages&&await new Promise((r,o)=>{this._queuedMessages.push({resolve:r,reject:o})});let s;return await new Promise((r,o)=>{const a=this._genCmdId();s={resolve:r,reject:o,callback:e,subscribe:(i==null?void 0:i.resubscribe)!==!1?()=>this.subscribeMessage(e,n):void 0,unsubscribe:async()=>{this.connected&&await this.sendMessagePromise(w(a)),this.commands.delete(a)}},this.commands.set(a,s);try{this.sendMessage(n,a)}catch{}}),()=>s.unsubscribe()}_genCmdId(){return++this.commandId}}const B=()=>`${location.protocol}//${location.host}/`,Q=t=>t*1e3+Date.now();function Y(){const{protocol:t,host:e,pathname:n,search:i}=location;return`${t}//${e}${n}${i}`}function K(t,e,n,i){let s=`${t}/auth/authorize?response_type=code&redirect_uri=${encodeURIComponent(n)}`;return e!==null&&(s+=`&client_id=${encodeURIComponent(e)}`),i&&(s+=`&state=${encodeURIComponent(i)}`),s}function W(t,e,n,i){n+=(n.includes("?")?"&":"?")+"auth_callback=1",document.location.href=K(t,e,n,i)}async function M(t,e,n){const i=typeof location<"u"&&location;if(i&&i.protocol==="https:"){const a=document.createElement("a");if(a.href=t,a.protocol==="http:"&&a.hostname!=="localhost")throw P}const s=new FormData;e!==null&&s.append("client_id",e),Object.keys(n).forEach(a=>{s.append(a,n[a])});const r=await fetch(`${t}/auth/token`,{method:"POST",credentials:"same-origin",body:s});if(!r.ok)throw r.status===400||r.status===403?_:new Error("Unable to fetch tokens");const o=await r.json();return o.hassUrl=t,o.clientId=e,o.expires=Q(o.expires_in),o}function y(t,e,n){return M(t,e,{code:n,grant_type:"authorization_code"})}function X(t){return btoa(JSON.stringify(t))}function Z(t){return JSON.parse(atob(t))}class R{constructor(e,n){this.data=e,this._saveTokens=n}get wsUrl(){return`ws${this.data.hassUrl.substr(4)}/api/websocket`}get accessToken(){return this.data.access_token}get expired(){return Date.now()>this.data.expires}async refreshAccessToken(){if(!this.data.refresh_token)throw new Error("No refresh_token");const e=await M(this.data.hassUrl,this.data.clientId,{grant_type:"refresh_token",refresh_token:this.data.refresh_token});e.refresh_token=this.data.refresh_token,this.data=e,this._saveTokens&&this._saveTokens(e)}async revoke(){if(!this.data.refresh_token)throw new Error("No refresh_token to revoke");const e=new FormData;e.append("token",this.data.refresh_token),await fetch(`${this.data.hassUrl}/auth/revoke`,{method:"POST",credentials:"same-origin",body:e}),this._saveTokens&&this._saveTokens(null)}}function ee(t,e){return new R({hassUrl:t,clientId:null,expires:Date.now()+1e11,refresh_token:"",access_token:e,expires_in:1e11})}async function m(t={}){let e,n=t.hassUrl;n&&n[n.length-1]==="/"&&(n=n.substr(0,n.length-1));const i=t.clientId!==void 0?t.clientId:B();if(!e&&t.authCode&&n&&(e=await y(n,i,t.authCode),t.saveTokens&&t.saveTokens(e)),!e){const s=J(location.search.substr(1));if("auth_callback"in s){const r=Z(s.state);e=await y(r.hassUrl,r.clientId,s.code),t.saveTokens&&t.saveTokens(e)}}if(!e&&t.loadTokens&&(e=await t.loadTokens()),e)return new R(e,t.saveTokens);if(n===void 0)throw T;return W(n,i,t.redirectUrl||Y(),X({hassUrl:n,clientId:i})),new Promise(()=>{})}const te=t=>{let e=[];function n(s){let r=[];for(let o=0;o<e.length;o++)e[o]===s?s=null:r.push(e[o]);e=r}function i(s,r){t=r?s:Object.assign(Object.assign({},t),s);let o=e;for(let a=0;a<o.length;a++)o[a](t)}return{get state(){return t},action(s){function r(o){i(o,!1)}return function(){let o=[t];for(let c=0;c<arguments.length;c++)o.push(arguments[c]);let a=s.apply(this,o);if(a!=null)return a instanceof Promise?a.then(r):r(a)}},setState:i,subscribe(s){return e.push(s),()=>{n(s)}}}},se=5e3,S=(t,e,n,i)=>{if(t[e])return t[e];let s=0,r,o,a=te();const c=()=>{if(!n)throw new Error("Collection does not support refresh");return n(t).then(u=>a.setState(u,!0))},d=()=>c().catch(u=>{if(t.connected)throw u}),h=()=>{if(o!==void 0){clearTimeout(o),o=void 0;return}i&&(r=i(t,a)),n&&(t.addEventListener("ready",d),d()),t.addEventListener("disconnected",l)},b=()=>{o=void 0,r&&r.then(u=>{u()}),t.removeEventListener("ready",c),t.removeEventListener("disconnected",l)},p=()=>{o=setTimeout(b,se)},l=()=>{o&&(clearTimeout(o),b())};return t[e]={get state(){return a.state},refresh:c,subscribe(u){s++,s===1&&h();const I=a.subscribe(u);return a.state!==void 0&&setTimeout(()=>u(a.state),0),()=>{I(),s--,s||p()}}},t[e]},ne=t=>t.sendMessagePromise(x()),ie=(t,e,n,i,s)=>t.sendMessagePromise($(e,n,i,s));function re(t,e){const n=Object.assign({},t.state);if(e.a)for(const i in e.a){const s=e.a[i];let r=new Date(s.lc*1e3).toISOString();n[i]={entity_id:i,state:s.s,attributes:s.a,context:typeof s.c=="string"?{id:s.c,parent_id:null,user_id:null}:s.c,last_changed:r,last_updated:s.lu?new Date(s.lu*1e3).toISOString():r}}if(e.r)for(const i of e.r)delete n[i];if(e.c)for(const i in e.c){let s=n[i];if(!s){console.warn("Received state update for unknown entity",i);continue}s=Object.assign({},s);const{"+":r,"-":o}=e.c[i],a=(r==null?void 0:r.a)||(o==null?void 0:o.a),c=a?Object.assign({},s.attributes):s.attributes;if(r&&(r.s!==void 0&&(s.state=r.s),r.c&&(typeof r.c=="string"?s.context=Object.assign(Object.assign({},s.context),{id:r.c}):s.context=Object.assign(Object.assign({},s.context),r.c)),r.lc?s.last_updated=s.last_changed=new Date(r.lc*1e3).toISOString():r.lu&&(s.last_updated=new Date(r.lu*1e3).toISOString()),r.a&&Object.assign(c,r.a)),o!=null&&o.a)for(const d of o.a)delete c[d];a&&(s.attributes=c),n[i]=s}t.setState(n,!0)}const oe=(t,e)=>t.subscribeMessage(n=>re(e,n),{type:"subscribe_entities"});function ae(t,e){const n=t.state;if(n===void 0)return;const{entity_id:i,new_state:s}=e.data;if(s)t.setState({[s.entity_id]:s});else{const r=Object.assign({},n);delete r[i],t.setState(r,!0)}}async function ce(t){const e=await ne(t),n={};for(let i=0;i<e.length;i++){const s=e[i];n[s.entity_id]=s}return n}const ue=(t,e)=>t.subscribeEvents(n=>ae(e,n),"state_changed"),de=t=>O(t.haVersion,2022,4,0)?S(t,"_ent",void 0,oe):S(t,"_ent",ce,ue),he=(t,e)=>de(t).subscribe(e);async function E(t){const e=Object.assign({setupRetry:0,createSocket:F},t),n=await e.createSocket(e);return new G(n,e)}let f;async function v(){try{return JSON.parse(localStorage.hassTokens)}catch{return}}const g=t=>{localStorage.hassTokens=JSON.stringify(t)},le=async t=>{const e=L(C).data.baseSettings;let n;e.token===null?n=await m({hassUrl:e.hassBaseUrl,loadTokens:v,saveTokens:g}):n=ee(e.hassBaseUrl,e.token);try{f=await E({auth:n})}catch(i){i===_&&(g(null),n=await m({hassUrl:e.hassBaseUrl,loadTokens:v,saveTokens:g}),f=await E({auth:n}))}he(f,i=>{t(i)}),f.addEventListener("disconnected",function(s,r){console.log("Connection lost"),t(null)})},be=U(null,function(e){return le(e),function(){f.close()}}),_e=(t,e)=>{let[n,i]=t.split(".");ie(f,n,i,void 0,{entity_id:e})},pe=async t=>{let e=await m({hassUrl:t,loadTokens:v,saveTokens:g});return e.expired&&(g(null),e=await m({hassUrl:t,loadTokens:v,saveTokens:g})),e};export{_e as a,pe as g,be as s};