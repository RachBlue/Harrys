import { useState } from "react";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { HARRYS_CATALOG } from "../models/products";
;

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const skinType = formData.get("skinType");
  const shaveFreq = formData.get("shaveFreq");

  // 1. Get the Key from the environment (NOT hardcoded)
  const apiKey = process.env.OPENAI_API_KEY;

  // 2. Local fallback logic (so the site doesn't crash if AI fails)
  const recommendations = HARRYS_CATALOG.filter(p => 
    skinType === "sensitive" ? p.tags.includes("gentle") : p.tags.includes("precision")
  );

  // 3. Optional: Add AI "Expert Advice" 
  // You would call OpenAI here using `apiKey` to generate a custom message
  // based on the skinType and shaveFreq.

  return json({ recommendations, expertNote: "AI analysis complete." });
}

export default function Index() {
  const data = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div className="min-h-screen px-4 py-12 md:px-0 bg-[#fffdf5]">
      <div className="max-w-xl mx-auto">
        {/* Logo & Header */}
        <header className="text-center mb-12">
  {/* The Iconic H' Mascot/Logo */}
  <div className="inline-block mb-6 transform hover:rotate-3 transition-transform cursor-pointer">
    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#112142" />
      <path d="M30 25V75M70 25V75M30 50H70" stroke="white" strokeWidth="12" strokeLinecap="square"/>
      <path d="M75 25L82 20V35L75 40V25Z" fill="#ff6a13" /> 
    </svg>
  </div>
  
  <h1 className="text-4xl font-black text-[#112142] uppercase tracking-tight leading-none mb-2">
    The Routine <span className="text-[#ff6a13]">Architect</span>
  </h1>
  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#112142] opacity-60">
    Quality Shave. Since 2013.
  </p>
</header>

        {/* The Form Card */}
       <Form method="post" className="bg-white border-2 border-[#112142] p-8 mb-12 shadow-[8px_8px_0px_0px_rgba(17,33,66,1)] transition-all">
  <div className="space-y-8">
    
    {/* Input 1: Skin Profile */}
    <div>
      <label htmlFor="skinType" className="block text-[11px] font-black uppercase tracking-[0.2em] text-[#112142] mb-3">
        1. Your Skin Profile
      </label>
      <div className="relative">
        <select 
          id="skinType"
          name="skinType" 
          required
          className="w-full appearance-none bg-[#f4f4f4] border-2 border-[#112142] p-4 font-bold text-[#112142] outline-none cursor-pointer hover:bg-[#fffdf5] focus:ring-2 focus:ring-[#ff6a13]"
        >
          <option value="" disabled selected>Choose skin type...</option>
          <option value="normal">Normal / Balanced</option>
          <option value="sensitive">Sensitive / Prone to Redness</option>
          <option value="oily">Oily / Combination</option>
        </select>
        {/* Custom Arrow for Harry's style */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#112142]">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>

    {/* Input 2: Shave Frequency */}
    <div>
      <label htmlFor="shaveFreq" className="block text-[11px] font-black uppercase tracking-[0.2em] text-[#112142] mb-3">
        2. Shave Frequency
      </label>
      <div className="relative">
        <select 
          id="shaveFreq"
          name="shaveFreq" 
          required
          className="w-full appearance-none bg-[#f4f4f4] border-2 border-[#112142] p-4 font-bold text-[#112142] outline-none cursor-pointer hover:bg-[#fffdf5] focus:ring-2 focus:ring-[#ff6a13]"
        >
          <option value="" disabled selected>How often do you shave?</option>
          <option value="daily">Every Morning</option>
          <option value="weekly">Twice a week</option>
          <option value="beard">Just Maintenance</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#112142]">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-[#112142] text-white font-black py-5 uppercase tracking-[0.2em] hover:bg-[#ff6a13] transition-all duration-200 active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_rgba(255,106,19,0.3)] cursor-pointer"
    >
      Build My Routine
    </button>
  </div>
</Form>
<div className="flex items-center justify-between bg-[#112142] p-4 mb-6 border-2 border-[#112142]">
  <span className="text-white font-black uppercase text-[10px] tracking-widest">
    Unlock Shave Plan Savings
  </span>
  <label className="relative inline-flex items-center cursor-pointer">
    <input 
      type="checkbox" 
      className="sr-only peer" 
      onChange={() => setIsSubscribed(!isSubscribed)}
    />
    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#ff6a13] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/40"></div>
  </label>
</div>
        {/* Recommendation Results */}
        {data?.recommendations && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 border-b-2 border-[#112142] pb-2 text-[#112142]">
              Recommended Hardware
            </h2>
            <div className="grid gap-4">
              {data.recommendations.map((product) => (
                <div key={product.id} className="group bg-white border-2 border-[#112142] p-5 flex justify-between items-center hover:border-[#ff6a13] transition-all">
                  <div>
                    <h3 className="font-black text-xl text-[#112142] tracking-tight">{product.name}</h3>
                    <p className="text-xs font-bold text-[#ff6a13] uppercase mt-1 tracking-widest">
  {isSubscribed ? (
    <span>Plan Price: ${(product.price * 0.9).toFixed(2)}</span>
  ) : (
    <span>${product.price}.00</span>
  )}
</p>
                  </div>
                  <button className="bg-[#112142] text-white p-3 hover:bg-[#ff6a13] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}