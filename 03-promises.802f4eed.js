let e=e=>document.querySelector(e);function o(e,o){return new Promise(((t,n)=>{const l=Math.random()>.3;setTimeout((()=>{l&&t({position:e,delay:o}),n({position:e,delay:o})}),o)}))}e(".form").addEventListener("submit",(function(t){t.preventDefault();const n=Number(e('[name="amount"]').value);let l=Number(e('[name="delay"]').value),a=Number(e('[name="step"]').value);a=l;for(let t=1;t<=n;t+=1)o(t,a).then((({position:e,delay:o})=>{console.log(`✅ Fulfilled promise ${e} in ${o}ms`)})).catch((({position:e,delay:o})=>{console.log(`❌ Rejected promise ${e} in ${o}ms`)})),a+=Number(e('[name="step"]').value)}));
//# sourceMappingURL=03-promises.802f4eed.js.map
