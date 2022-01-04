(function(){"use strict";var e={927:function(e,t,s){Object.defineProperty(t,"__esModule",{value:true});t.transformFiles=t.reduceChunk=t.reduceAssets=t.generateManifest=void 0;const n=s(17);const generateManifest=(e,t,{generate:s,seed:n={}})=>{let o;if(s){const i=Array.from(e.entrypoints.entries());const a=i.reduce(((e,[t,s])=>Object.assign(e,{[t]:s.getFiles()})),{});o=s(n,t,a)}else{o=t.reduce(((e,t)=>Object.assign(e,{[t.name]:t.path})),n)}return o};t.generateManifest=generateManifest;const getFileType=(e,{transformExtensions:t})=>{const s=e.replace(/\?.*/,"");const n=s.split(".");const o=n.pop();return t.test(o)?`${n.pop()}.${o}`:o};const reduceAssets=(e,t,s)=>{let o;if(s[t.name]){o=s[t.name]}else if(t.info.sourceFilename){o=n.join(n.dirname(t.name),n.basename(t.info.sourceFilename))}if(o){return e.concat({isAsset:true,isChunk:false,isInitial:false,isModuleAsset:true,name:o,path:t.name})}const i=t.chunks&&t.chunks.length>0;if(i){return e}return e.concat({isAsset:true,isChunk:false,isInitial:false,isModuleAsset:false,name:t.name,path:t.name})};t.reduceAssets=reduceAssets;const reduceChunk=(e,t,s,o)=>{Array.from(t.auxiliaryFiles||[]).forEach((e=>{o[e]={isAsset:true,isChunk:false,isInitial:false,isModuleAsset:true,name:n.basename(e),path:e}}));return Array.from(t.files).reduce(((e,n)=>{let o=t.name?t.name:null;o=o?s.useEntryKeys&&!n.endsWith(".map")?o:`${o}.${getFileType(n,s)}`:n;return e.concat({chunk:t,isAsset:false,isChunk:true,isInitial:t.isOnlyInitial(),isModuleAsset:false,name:o,path:n})}),e)};t.reduceChunk=reduceChunk;const standardizeFilePaths=e=>{const t=Object.assign({},e);t.name=e.name.replace(/\\/g,"/");t.path=e.path.replace(/\\/g,"/");return t};const transformFiles=(e,t)=>["filter","map","sort"].filter((e=>!!t[e])).reduce(((e,s)=>e[s](t[s])),e).map(standardizeFilePaths);t.transformFiles=transformFiles},961:function(e,t,s){Object.defineProperty(t,"__esModule",{value:true});t.normalModuleLoaderHook=t.getCompilerHooks=t.emitHook=t.beforeRunHook=void 0;const n=s(147);const o=s(17);const i=s(535);const a=s(728);const r=s(927);const u=new WeakMap;const getCompilerHooks=e=>{let t=u.get(e);if(typeof t==="undefined"){t={afterEmit:new i.SyncWaterfallHook(["manifest"]),beforeEmit:new i.SyncWaterfallHook(["manifest"])};u.set(e,t)}return t};t.getCompilerHooks=getCompilerHooks;const beforeRunHook=({emitCountMap:e,manifestFileName:t},s,n)=>{const o=e.get(t)||0;e.set(t,o+1);if(n){n()}};t.beforeRunHook=beforeRunHook;const l=function emit({compiler:e,emitCountMap:t,manifestAssetId:s,manifestFileName:i,moduleAssets:u,options:l},c){const p=t.get(i)-1;const m=c.getStats().toJson({all:false,assets:true,cachedAssets:true,ids:true,publicPath:true});const f=l.publicPath!==null?l.publicPath:m.publicPath;const{basePath:d,removeKeyHash:h}=l;t.set(i,p);const k={};let b=Array.from(c.chunks).reduce(((e,t)=>r.reduceChunk(e,t,l,k)),[]);b=m.assets.reduce(((e,t)=>r.reduceAssets(e,t,u)),b);b=b.filter((({name:s,path:n})=>{var i;return!n.includes("hot-update")&&typeof t.get(o.join(((i=e.options.output)===null||i===void 0?void 0:i.path)||"<unknown>",s))==="undefined"}));b.forEach((e=>{delete k[e.path]}));Object.keys(k).forEach((e=>{b=b.concat(k[e])}));b=b.map((e=>{const t={name:d?d+e.name:e.name,path:f?f+e.path:e.path};t.name=h?t.name.replace(h,""):t.name;return Object.assign(e,t)}));b=r.transformFiles(b,l);let g=r.generateManifest(c,b,l);const _=p===0;g=getCompilerHooks(e).beforeEmit.call(g);if(_){const e=l.serialize(g);c.emitAsset(s,new a.RawSource(e));if(l.writeToFileEmit){n.mkdirSync(o.dirname(i),{recursive:true});n.writeFileSync(i,e)}}getCompilerHooks(e).afterEmit.call(g)};t.emitHook=l;const normalModuleLoaderHook=({moduleAssets:e},t,s)=>{const{emitFile:n}=t;t.emitFile=(t,i,a)=>{if(s.userRequest&&!e[t]){Object.assign(e,{[t]:o.join(o.dirname(t),o.basename(s.userRequest))})}return n.call(s,t,i,a)}};t.normalModuleLoaderHook=normalModuleLoaderHook},871:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:true});t.WebpackManifestPlugin=t.getCompilerHooks=void 0;const o=s(17);const i=n(s(27));const a=n(s(205));const r=s(961);Object.defineProperty(t,"getCompilerHooks",{enumerable:true,get:function(){return r.getCompilerHooks}});const u=new Map;const l={basePath:"",fileName:"manifest.json",filter:null,generate:void 0,map:null,publicPath:null,removeKeyHash:/([a-f0-9]{16,32}\.?)/gi,seed:void 0,serialize(e){return JSON.stringify(e,null,2)},sort:null,transformExtensions:/^(gz|map)$/i,useEntryKeys:false,useLegacyEmit:false,writeToFileEmit:false};class WebpackManifestPlugin{constructor(e){this.options=Object.assign({},l,e)}apply(e){var t,s,n;const l={};const c=o.resolve(((t=e.options.output)===null||t===void 0?void 0:t.path)||"./",this.options.fileName);const p=o.relative(((s=e.options.output)===null||s===void 0?void 0:s.path)||"./",c);const m=r.beforeRunHook.bind(this,{emitCountMap:u,manifestFileName:c});const f=r.emitHook.bind(this,{compiler:e,emitCountMap:u,manifestAssetId:p,manifestFileName:c,moduleAssets:l,options:this.options});const d=r.normalModuleLoaderHook.bind(this,{moduleAssets:l});const h={name:"WebpackManifestPlugin",stage:Infinity};e.hooks.compilation.tap(h,(e=>{const t=!a.default.getCompilationHooks?e.hooks.normalModuleLoader:a.default.getCompilationHooks(e).loader;t.tap(h,d)}));if(((n=i.default.version)===null||n===void 0?void 0:n.startsWith("4"))||this.options.useLegacyEmit===true){e.hooks.emit.tap(h,f)}else{e.hooks.thisCompilation.tap(h,(e=>{e.hooks.processAssets.tap(h,(()=>f(e)))}))}e.hooks.run.tap(h,m);e.hooks.watchRun.tap(h,m)}}t.WebpackManifestPlugin=WebpackManifestPlugin},205:function(e){e.exports=require("../webpack/NormalModule")},535:function(e){e.exports=require("@umijs/bundler-webpack/compiled/tapable")},27:function(e){e.exports=require("@umijs/bundler-webpack/compiled/webpack")},728:function(e){e.exports=require("@umijs/bundler-webpack/compiled/webpack-sources")},147:function(e){e.exports=require("fs")},17:function(e){e.exports=require("path")}};var t={};function __nccwpck_require__(s){var n=t[s];if(n!==undefined){return n.exports}var o=t[s]={exports:{}};var i=true;try{e[s].call(o.exports,o,o.exports,__nccwpck_require__);i=false}finally{if(i)delete t[s]}return o.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var s=__nccwpck_require__(871);module.exports=s})();