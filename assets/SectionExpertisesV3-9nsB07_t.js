import{t as e}from"./jsx-runtime-BUQC76ri.js";import{t}from"./useTranslation-BtJ67h1c.js";import{t as n}from"./assetUrl-Bb8jgIej.js";import{t as r}from"./sanitizeHtml-LsDxrvTJ.js";import{t as i}from"./useRevealOnScroll-yK9NYgQE.js";var a=`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4" />
  <path d="M11.5 3a16.989 16.989 0 0 0 -1.826 4" />
  <path d="M12.5 3a16.989 16.989 0 0 1 1.828 4" />
  <path d="M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4" />
  <path d="M11.5 21a16.989 16.989 0 0 1 -1.826 -4" />
  <path d="M12.5 21a16.989 16.989 0 0 0 1.828 -4" />
  <path d="M2 10l1 4l1.5 -4l1.5 4l1 -4" />
  <path d="M17 10l1 4l1.5 -4l1.5 4l1 -4" />
  <path d="M9.5 10l1 4l1.5 -4l1.5 4l1 -4" />
</svg>
`,o=`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 12v-4" />
  <path d="M15 12v-2" />
  <path d="M12 12v-1" />
  <path d="M3 4h18" />
  <path d="M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10" />
  <path d="M12 16v4" />
  <path d="M9 20h6" />
</svg>
`,s=`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
  <path d="M12 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
  <path d="M19 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
  <path d="M5 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
  <path d="M12 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
  <path d="M5 8l0 8" />
  <path d="M12 8l0 8" />
  <path d="M19 8v2a2 2 0 0 1 -2 2h-12" />
</svg>
`,c=e(),l={web:a,presentation:o,engine:s};function u({icon:e,url_img:t,title:r,className:i}){let a=e?l[e]:void 0;return a?(0,c.jsx)(`span`,{className:i,role:`img`,"aria-label":r,dangerouslySetInnerHTML:{__html:a}}):(0,c.jsx)(`img`,{className:i,src:n(t),alt:r})}function d({expertises:e}){let{t:n}=t(),{ref:a,visible:o}=i(.2);return(0,c.jsxs)(`section`,{className:`expertise-v3`,children:[(0,c.jsx)(`h1`,{className:`section-title`,children:n(`sections.myExpertise`)}),(0,c.jsx)(`div`,{ref:a,className:`expertise-v3__grid${o?` is-visible`:``}`,children:e.map((e,t)=>{let[n,...i]=e.title.split(` `),a=e.code_tag??`div`;return(0,c.jsxs)(`article`,{className:`expertise-v3__item`,style:{"--reveal-delay":`${t*150}ms`},children:[(0,c.jsxs)(`div`,{className:`expertise-v3__headline`,children:[(0,c.jsx)(`div`,{className:`expertise-v3__icon`,children:(0,c.jsx)(u,{icon:e.icon,url_img:e.url_img,title:e.title})}),(0,c.jsxs)(`h5`,{className:`expertise-v3__name`,children:[(0,c.jsx)(`span`,{className:`expertise-v3__underline ${e.underline_class_css}`,children:n}),(0,c.jsx)(`br`,{}),i.join(` `)]})]}),(0,c.jsxs)(`div`,{className:`expertise-v3__code`,children:[(0,c.jsxs)(`span`,{className:`expertise-v3__tag`,children:[`<`,a,`>`]}),(0,c.jsx)(`div`,{className:`expertise-v3__text`,dangerouslySetInnerHTML:{__html:r(e.html_text)}}),(0,c.jsxs)(`span`,{className:`expertise-v3__tag`,children:[`</`,a,`>`]})]})]},e.title)})})]})}export{d as t};