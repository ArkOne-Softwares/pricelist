var le=Object.defineProperty,re=Object.defineProperties;var ce=Object.getOwnPropertyDescriptors;var y=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,M=Object.prototype.propertyIsEnumerable;var D=(e,a,t)=>a in e?le(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t,n=(e,a)=>{for(var t in a||(a={}))k.call(a,t)&&D(e,t,a[t]);if(y)for(var t of y(a))M.call(a,t)&&D(e,t,a[t]);return e},o=(e,a)=>re(e,ce(a));var d=(e,a)=>{var t={};for(var r in e)k.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&y)for(var r of y(e))a.indexOf(r)<0&&M.call(e,r)&&(t[r]=e[r]);return t};import{o as O,t as ne,a as ie,r as S,e as oe,b as de,c as F,d as E,f as c,v as p,S as P,y as m,g as w,s as me,n as ue,p as f,h as he,i as pe,j as V,k as xe,l as fe,m as ge,G as Ne,q as s,u as B,w as R,x as ve,z as N,A as _,B as b,C as H,D as ye,E as je,F as we,L as Ce,H as be}from"./index-Dsjr6BN-.js";const ze=["h1","h2","h3","h4","h5","h6"],$e=["1","2","3","4","5","6","7","8","9"],Ee=n(n(n(n(n(n(n(o(n({as:{type:"enum",values:ze,default:"h1"}},O),{size:{type:"enum",className:"rt-r-size",values:$e,default:"6",responsive:!0}}),ne),ie),S),oe),de),F),E),G=c.forwardRef((e,a)=>{const h=p(e,Ee,w),{children:t,className:r,asChild:l,as:i="h1",color:x}=h,u=d(h,["children","className","asChild","as","color"]);return c.createElement(P,o(n({"data-accent-color":x},u),{ref:a,className:m("rt-Heading",r)}),l?t:c.createElement(i,null,t))});G.displayName="Heading";const Re=["1","2","3"],Te=["soft","surface","outline"],I=n(n(o(n({},O),{size:{type:"enum",className:"rt-r-size",values:Re,default:"2",responsive:!0},variant:{type:"enum",className:"rt-variant",values:Te,default:"soft"}}),me),E),A=c.forwardRef((r,t)=>{var l=r,{className:e}=l,a=d(l,["className"]);return c.createElement(ue,o(n({},a),{ref:t,className:m("rt-Button",e)}))});A.displayName="Button";const W=c.createContext({}),Y=c.forwardRef((e,a)=>{const{size:t=I.size.default}=e,h=p(e,I,w),{asChild:r,children:l,className:i,color:x}=h,u=d(h,["asChild","children","className","color"]);return c.createElement(r?P:"div",o(n({"data-accent-color":x},u),{className:m("rt-CalloutRoot",i),ref:a}),c.createElement(W.Provider,{value:c.useMemo(()=>({size:t}),[t])},l))});Y.displayName="Callout.Root";const J=c.forwardRef((r,t)=>{var l=r,{className:e}=l,a=d(l,["className"]);return c.createElement("div",o(n({},a),{className:m("rt-CalloutIcon",e),ref:t}))});J.displayName="Callout.Icon";const U=c.forwardRef((r,t)=>{var l=r,{className:e}=l,a=d(l,["className"]);const{size:i}=c.useContext(W);return c.createElement(f,o(n({as:"p",size:he(i,pe)},a),{asChild:!1,ref:t,className:m("rt-CalloutText",e)}))});U.displayName="Callout.Text";const Le=["start","center","end","baseline","stretch"],De=["horizontal","vertical"],ke=["1","2","3"],Me={orientation:{type:"enum",className:"rt-r-orientation",values:De,default:"horizontal",responsive:!0},size:{type:"enum",className:"rt-r-size",values:ke,default:"2",responsive:!0},trim:o(n({},S.trim),{className:"rt-r-trim"})},He={align:{type:"enum",className:"rt-r-ai",values:Le,responsive:!0}},Ie=n(n(n({},V),F),E),q=c.forwardRef((e,a)=>{const l=p(e,Me,w),{className:t}=l,r=d(l,["className"]);return c.createElement(f,{asChild:!0},c.createElement("dl",o(n({},r),{ref:a,className:m("rt-DataListRoot",t)})))});q.displayName="DataList.Root";const K=c.forwardRef((e,a)=>{const l=p(e,He),{className:t}=l,r=d(l,["className"]);return c.createElement("div",o(n({},r),{ref:a,className:m("rt-DataListItem",t)}))});K.displayName="DataList.Item";const Q=c.forwardRef((e,a)=>{const i=p(e,Ie),{className:t,color:r}=i,l=d(i,["className","color"]);return c.createElement("dt",o(n({},l),{"data-accent-color":r,ref:a,className:m("rt-DataListLabel",t)}))});Q.displayName="DataList.Label";const X=c.forwardRef((l,r)=>{var i=l,{children:e,className:a}=i,t=d(i,["children","className"]);return c.createElement("dd",o(n({},t),{ref:r,className:m(a,"rt-DataListValue")}),e)});X.displayName="DataList.Value";const Oe=["1","2","3"],Se=["surface","ghost"],Fe=["auto","fixed"],C={size:{type:"enum",className:"rt-r-size",values:Oe,default:"2",responsive:!0},variant:{type:"enum",className:"rt-variant",values:Se,default:"ghost"},layout:{type:"enum",className:"rt-r-tl",values:Fe,responsive:!0}},Pe=["start","center","end","baseline"],Ve={align:{type:"enum",className:"rt-r-va",values:Pe,parseValue:Be,responsive:!0}};function Be(e){return{baseline:"baseline",start:"top",center:"middle",end:"bottom"}[e]}const _e=["start","center","end"],T=n(n({justify:{type:"enum",className:"rt-r-ta",values:_e,parseValue:Ge,responsive:!0}},V),xe);function Ge(e){return{start:"left",center:"center",end:"right"}[e]}const Z=c.forwardRef((e,a)=>{const v=C,{layout:t}=v,r=d(v,["layout"]),g=p(e,r,w),{className:l,children:i,layout:x}=g,u=d(g,["className","children","layout"]),h=fe({value:x,className:C.layout.className,propValues:C.layout.values});return c.createElement("div",n({ref:a,className:m("rt-TableRoot",l)},u),c.createElement(ge,null,c.createElement("table",{className:m("rt-TableRootTable",h)},i)))});Z.displayName="Table.Root";const ee=c.forwardRef((r,t)=>{var l=r,{className:e}=l,a=d(l,["className"]);return c.createElement("thead",o(n({},a),{ref:t,className:m("rt-TableHeader",e)}))});ee.displayName="Table.Header";const se=c.forwardRef((r,t)=>{var l=r,{className:e}=l,a=d(l,["className"]);return c.createElement("tbody",o(n({},a),{ref:t,className:m("rt-TableBody",e)}))});se.displayName="Table.Body";const L=c.forwardRef((e,a)=>{const l=p(e,Ve),{className:t}=l,r=d(l,["className"]);return c.createElement("tr",o(n({},r),{ref:a,className:m("rt-TableRow",t)}))});L.displayName="Table.Row";const z=c.forwardRef((e,a)=>{const l=p(e,T),{className:t}=l,r=d(l,["className"]);return c.createElement("td",n({className:m("rt-TableCell",t),ref:a},r))});z.displayName="Table.Cell";const j=c.forwardRef((e,a)=>{const l=p(e,T),{className:t}=l,r=d(l,["className"]);return c.createElement("th",n({className:m("rt-TableCell","rt-TableColumnHeaderCell",t),scope:"col",ref:a},r))});j.displayName="Table.ColumnHeaderCell";const ae=c.forwardRef((e,a)=>{const l=p(e,T),{className:t}=l,r=d(l,["className"]);return c.createElement("th",n({className:m("rt-TableCell","rt-TableRowHeaderCell",t),scope:"row",ref:a},r))});ae.displayName="Table.RowHeaderCell";function Ae(e){return Ne({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"},child:[]},{tag:"line",attr:{x1:"12",y1:"9",x2:"12",y2:"13"},child:[]},{tag:"line",attr:{x1:"12",y1:"17",x2:"12.01",y2:"17"},child:[]}]})(e)}const We=({rootProps:e,iconProps:a,textProps:t,textChildren:r,iconChildren:l})=>s.jsxs(Y,o(n({},e),{children:[s.jsx(J,o(n({},a),{children:l})),s.jsx(U,o(n({},t),{children:r}))]})),Ye=t=>{var r=t,{children:e}=r,a=d(r,["children"]);return s.jsx(We,{rootProps:{color:"red"},iconChildren:s.jsx(Ae,{size:"18"}),textChildren:e||a.message||"An error occurred"})},Je=({error:e,overrideHeading:a,children:t})=>{const r=c.useMemo(()=>{var i,x;if(!e)return[];let l=e!=null&&e._server_messages?JSON.parse(e==null?void 0:e._server_messages):[];if(l=l.map(u=>{try{return JSON.parse(u)}catch(h){return u}}),l.length===0){const u=(i=e==null?void 0:e.exception)==null?void 0:i.indexOf(":");if(u){const h=(x=e==null?void 0:e.exception)==null?void 0:x.slice(u+1);h&&(l=[{message:h,title:"Error"}])}l.length===0&&(l=[{message:e==null?void 0:e.message,title:"Error",indicator:"red"}])}return l},[e]);return r.length===0||!e?null:s.jsxs(Ye,{children:[r.map((l,i)=>s.jsx("div",{dangerouslySetInnerHTML:{__html:l.message}},i)),t]})},Ue=({children:e})=>{const{threadID:a}=B();return s.jsx("header",{className:"dark:bg-gray-2 bg-white fixed top-0",style:{zIndex:999},children:s.jsx(R,{py:"3",className:ve("border-gray-4 sm:dark:border-gray-6 border-b px-4 sm:px-0 sm:ml-4",a?"sm:w-[calc((100vw-var(--sidebar-width)-var(--space-8))/2)] w-screen":"sm:w-[calc(100vw-var(--sidebar-width)-var(--space-6))] w-screen"),children:s.jsx(N,{justify:"between",children:e})})})},qe=()=>s.jsx(R,{className:"py-2 px-6",children:s.jsxs(N,{direction:"column",gap:"2",children:[s.jsx(f,{size:"3",children:s.jsx("strong",{children:"No data here"})}),s.jsxs(N,{direction:"column",gap:"1",children:[s.jsx(f,{as:"span",size:"2",children:"Threads are a way to keep conversations organized and focused. You can create a thread by replying to a message."}),s.jsxs(f,{as:"span",size:"2",children:["You can also start a thread by clicking on the"," ",s.jsx("strong",{children:"Create Thread"})," button on any message."]})]})]})}),te=_(null),$=_(!1),Ke="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.0//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20version='1.0'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='800px'%20height='800px'%20viewBox='0%200%2064%2064'%20enable-background='new%200%200%2064%2064'%20xml:space='preserve'%3e%3cg%3e%3cpath%20fill='%23231F20'%20d='M62.828,37.172L48.347,22.69l0.012,0.011C48.764,21.201,49,19.629,49,18c0-9.94-8.059-18-18-18%20c-1.663,0-3.266,0.244-4.793,0.666C25.557,0.236,24.791,0,24,0H4C1.791,0,0,1.791,0,4v20c0,1.061,0.422,2.078,1.172,2.828l36,36%20C37.952,63.609,38.977,64,40,64s2.048-0.391,2.828-1.172l20-20C64.391,41.267,64.391,38.733,62.828,37.172z%20M31,2.001%20c8.837,0,16,7.163,16,16c0,1.003-0.117,2.088-0.295,3.048l-1.77-1.77l-0.024-0.025C44.949,18.855,45,18.383,45,18.001%20c0-7.731-6.268-14-14-14c-0.432,0-0.856,0.026-1.278,0.064c-0.82,0.074-1.616,0.228-2.391,0.438%20c-3.525,0.955-6.49,3.249-8.327,6.308c-0.345,0.573-0.66,1.165-0.921,1.788C17.387,14.262,17,16.086,17,18.001%20c0,0.617,0.131,1.817,0.131,1.817S16.396,20,16,20c-0.303,0-0.595-0.04-0.878-0.104c-0.033-0.008-0.038-0.008,0,0%20C15.049,19.273,15,18.644,15,18.001c0-2.118,0.421-4.134,1.168-5.983c0.268-0.662,0.577-1.299,0.927-1.913%20c1.899-3.337,4.963-5.915,8.64-7.198c0.72-0.252,1.458-0.461,2.221-0.607C28.941,2.108,29.958,2.001,31,2.001z%20M42.965,17.309%20L31.692,6.036C37.765,6.383,42.617,11.235,42.965,17.309z%20M20,16c0,0.991-0.371,1.885-0.971,2.579%20C19.021,18.387,19,18.197,19,18.001c0-1.301,0.213-2.55,0.596-3.724C19.848,14.801,20,15.381,20,16z%20M13,18%20c0,0.211,0.022,0.418,0.031,0.627C12.402,17.924,12,17.018,12,16c0-1.397,0.72-2.625,1.806-3.34C13.282,14.348,13,16.141,13,18z%20M61.414,41.414l-20.001,20C41.036,61.792,40.534,62,40,62s-1.036-0.208-1.414-0.586l-36-36C2.214,25.041,2,24.525,2,24V4%20c0-1.104,0.897-2,2-2h18.778c-3.446,1.775-6.235,4.627-7.94,8.115C12.081,10.656,10,13.084,10,16c0,3.313,2.687,6,6,6s6-2.687,6-6%20c0-1.488-0.545-2.848-1.443-3.896c1.748-3.088,4.822-5.316,8.451-5.924l32.406,32.406C61.792,38.964,62,39.466,62,40%20S61.792,41.036,61.414,41.414z'/%3e%3cpath%20fill='%23231F20'%20d='M50.122,37.88c-1.17-1.17-3.073-1.171-4.243-0.001l-7.984,7.984c-1.169,1.169-1.212,3.116-0.042,4.286%20c1.168,1.17,3.108,1.134,4.278-0.036l7.992-7.99h-0.002C51.291,40.953,51.291,39.049,50.122,37.88z%20M48.707,40.709l-7.96,7.96%20c-0.391,0.391-1.092,0.457-1.48,0.066c-0.391-0.391-0.34-1.074,0.051-1.465l7.976-7.976c0.391-0.391,1.023-0.391,1.414,0%20C49.098,39.684,49.098,40.318,48.707,40.709z'/%3e%3cpath%20fill='%23231F20'%20d='M42.122,34.124c1.17-1.17,1.17-3.074,0.001-4.243c-1.17-1.17-3.073-1.171-4.243-0.001l-7.984,7.984%20c-1.169,1.169-1.212,3.116-0.042,4.286c1.168,1.17,3.108,1.134,4.278-0.036l7.992-7.99H42.122z%20M40.708,32.71l-7.96,7.96%20c-0.391,0.391-1.092,0.457-1.48,0.066c-0.391-0.391-0.34-1.074,0.051-1.465l7.976-7.976c0.391-0.391,1.023-0.391,1.414,0%20C41.099,31.685,41.099,32.319,40.708,32.71z'/%3e%3cpath%20fill='%23231F20'%20d='M34.118,26.12c1.17-1.17,1.17-3.074,0.001-4.243c-1.17-1.17-3.073-1.171-4.243-0.001l-7.984,7.984%20c-1.169,1.169-1.212,3.116-0.042,4.286c1.168,1.17,3.108,1.134,4.278-0.036l7.992-7.99H34.118z%20M32.704,24.706l-7.96,7.96%20c-0.391,0.391-1.092,0.457-1.48,0.066c-0.391-0.391-0.34-1.074,0.051-1.465l7.976-7.976c0.391-0.391,1.023-0.391,1.414,0%20C33.095,23.681,33.095,24.315,32.704,24.706z'/%3e%3c/g%3e%3c/svg%3e",Qe=({item:e})=>{const{title:a,category:t,image:r,options:l,offers:i,name:x}=e,u=b(te),h=b($),v=g=>{u(g),h(!0)};return s.jsxs(L,{className:"cursor-pointer hover:bg-slate-1",onClick:()=>v(e),children:[s.jsx(ae,{children:s.jsxs(N,{children:[s.jsx("div",{className:"flex flex-col",children:r?s.jsx("img",{src:r,alt:a,className:"h-12 w-12 rounded-md bg-white p-2 mr-3"}):s.jsx("img",{src:Ke,alt:a,className:"h-12 w-12 rounded-md bg-white p-2 mr-3 opacity-50"})}),s.jsxs("div",{className:"flex flex-col flex-1",children:[s.jsx(f,{size:"4",color:"yellow",children:a}),s.jsx(f,{size:"1",children:t})]})]})}),s.jsxs(z,{children:[l&&!l.length&&s.jsx(s.Fragment,{children:s.jsx("p",{className:"text-gray-400 dark:text-gray-600",children:"No Options Availbale"})}),s.jsx(q,{children:l&&l.length>0&&l.map(g=>s.jsxs(K,{children:[s.jsx(Q,{minWidth:"100px",children:g.option}),s.jsx(X,{children:g.value})]}))})]}),s.jsxs(z,{children:[i&&i.length>0&&s.jsxs(A,{children:[i.length," Offers"]}),i&&!i.length&&s.jsx("p",{className:"text-gray-400 dark:text-gray-600",children:"0 Offers"})]})]})};function Xe(){const e=H(te),a=b($),t=H($);return c.useEffect(()=>{a(!t)},[]),s.jsx(s.Fragment,{children:s.jsx(ye,{open:t,onOpenChange:a,direction:"bottom",dismissible:!0,children:s.jsx(je,{children:s.jsx("div",{className:"min-h-[60vh]",children:s.jsxs(f,{children:["Item: ",e==null?void 0:e.title]})})})})})}function Ze(){const{name:e}=B(),{data:a,error:t}=we("pricelist.api.doc.get_data",{revalidateOnFocus:!1,filters:[["category","=",e||""]]});return s.jsxs(N,{direction:"column",gap:"0",children:[s.jsx(Ue,{children:s.jsxs(N,{align:"center",gap:"3",className:"h-8",children:[s.jsx(Ce,{to:"/",className:"block bg-transparent hover:bg-transparent active:bg-transparent sm:hidden",children:s.jsx(be,{size:"24",className:"block text-gray-12"})}),s.jsx(G,{size:"5",children:"List"})]})}),s.jsxs(R,{className:" w-full pt-16 pb-8",children:[s.jsx("div",{className:"px-2",children:s.jsx(Je,{error:t})}),a&&s.jsx(s.Fragment,{children:a.message.length===0?s.jsx(qe,{}):s.jsx("div",{className:"px-2",children:s.jsxs(Z,{children:[s.jsx(ee,{children:s.jsxs(L,{children:[s.jsx(j,{children:"Product"}),s.jsx(j,{children:"Options"}),s.jsx(j,{children:"Offers"})]})}),s.jsx(se,{children:a.message.map(r=>s.jsx(Qe,{item:r},r.title))})]})})})]}),s.jsx(Xe,{})]})}const as=Ze;export{as as Component};