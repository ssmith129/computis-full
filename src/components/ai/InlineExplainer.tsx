import React, { useEffect, useRef, useState } from 'react';

export function InlineExplainer({ label, children }:{label:string; children:React.ReactNode}){
  const [open,setOpen]=useState(false);
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const onDoc=(e:MouseEvent)=>{ if(ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return ()=>document.removeEventListener('mousedown', onDoc);
  },[]);
  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="explainer-popover"
        onClick={()=>setOpen(o=>!o)}
        className="ml-2 inline-flex items-center rounded-full border border-gray-300 px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {label}
      </button>
      {open && (
        <div id="explainer-popover" role="dialog"
             className="absolute left-0 z-50 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-700 shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
}
