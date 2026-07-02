import{D as e,a as t,c as n,k as r,l as i,n as a,r as o}from"./chunk-4ZMWKKQ3-FnsuXI-q.js";import{t as s}from"./jsx-runtime-BUQC76ri.js";import{i as c}from"./types-BEY2cHF1.js";var l=s(),u=`(function (l) {
  if (l.search[1] === '/') {
    var decoded = l.search.slice(1).split('&').map(function (s) {
      return s.replace(/~and~/g, '&');
    }).join('?');
    window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
  }
})(window.location);`,d=`(function (w, d, s, l, i) {
  w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0], j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-W6HR4FW5');`;function f(e){let t=e.split(`/`).filter(Boolean)[0];return c(t)?t:`en`}function p({children:t}){let{pathname:r}=e();return(0,l.jsxs)(`html`,{lang:f(r),children:[(0,l.jsxs)(`head`,{children:[(0,l.jsx)(`meta`,{charSet:`utf-8`}),(0,l.jsx)(`meta`,{name:`viewport`,content:`width=device-width, initial-scale=1.0`}),(0,l.jsx)(`link`,{rel:`icon`,type:`image/svg+xml`,href:`/my-resume/favicon.svg`}),(0,l.jsx)(`script`,{dangerouslySetInnerHTML:{__html:u}}),(0,l.jsx)(`script`,{dangerouslySetInnerHTML:{__html:d}}),(0,l.jsx)(`noscript`,{dangerouslySetInnerHTML:{__html:`<style>.expertise-v3__item{opacity:1!important;transform:none!important}ul.rb li{opacity:1!important;transform:none!important}</style>`}}),(0,l.jsx)(o,{}),(0,l.jsx)(a,{})]}),(0,l.jsxs)(`body`,{children:[(0,l.jsx)(`div`,{id:`root`,children:t}),(0,l.jsx)(i,{}),(0,l.jsx)(n,{})]})]})}var m=r(function(){return(0,l.jsx)(t,{})});export{p as Layout,m as default};