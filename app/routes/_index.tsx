import { useState } from "react";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { json, type ActionFunctionArgs } from "@remix-run/node";

const HARRYS_CATALOG = [
  { id: 1, name: "Precision Razor", price: 25, tags: ["precision"] },
  { id: 2, name: "Gentle Cream", price: 18, tags: ["gentle"] },
  { id: 3, name: "Sensitive Balm", price: 22, tags: ["gentle"] },
  { id: 4, name: "Pro Blade Set", price: 35, tags: ["precision"] },
];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const skinType = formData.get("skinType");
  
  // Filtering logic
  const recommendations = HARRYS_CATALOG.filter(p => 
    skinType === "sensitive" ? p.tags.includes("gentle") : p.tags.includes("precision")
  );
  
  return json({ recommendations });
}

export default function Index() {
  const data = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen px-4 py-12 md:px-0 bg-[#fffdf5]">
      <div className="max-w-xl mx-auto">
        {/* Logo & Header */}
        <header className="text-center mb-12">
          <div className="inline-block bg-[#112142] text-white px-5 py-2 mb-6 shadow-[4px_4px_0px_0px_#ff6a13]">
            <span className="text-3xl font-black italic tracking-tighter uppercase">H'</span>
          </div>
          <h1 className="text-4xl font-black text-[#112142] uppercase tracking-tight leading-none mb-2">
            The Routine <span className="text-[#ff6a13]">Architect</span>
          </h1>
          <p className="text-[#112142] font-medium opacity-70 italic">Engineered for a better morning.</p>
        </header>

        {/* The Form Card */}
        <Form method="post" className="bg-white border-2 border-[#112142] p-8 mb-12 shadow-[8px_8px_0px_0px_rgba(17,33,66,1)] transition-all">
          <div className="space-y-8">
            {/* Update your select labels to be even more accessible */}
<div>
  <label htmlFor="skin-select" className="block text-[11px] font-black uppercase tracking-[0.2em] text-[#112142] mb-3">
    1. Your Skin Profile
  </label>
  <select 
    id="skin-select"
    name="skinType" 
    aria-label="Select your skin type"
    className="w-full bg-white border-2 border-[#112142] p-4 font-bold text-[#112142] outline-none cursor-pointer hover:bg-[#fffdf5] focus:ring-2 focus:ring-[#ff6a13]"
  >
    {/* options stay the same */}
  </select>
</div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-[#112142] mb-3">
                2. Shave Frequency
              </label>
              <select name="shaveFreq" className="w-full bg-white border-2 border-[#112142] p-4 font-bold text-[#112142] outline-none cursor-pointer hover:bg-[#fffdf5]">
                <option value="daily">Every Morning</option>
                <option value="weekly">Twice a week</option>
                <option value="beard">Just Maintenance</option>
              </select>
            </div>

            {/* The Vital Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#112142] text-white font-black py-5 uppercase tracking-[0.2em] hover:bg-[#ff6a13] transition-all duration-200 active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_rgba(255,106,19,0.3)] disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Architecting..." : "Build My Routine"}
            </button>
          </div>
        </Form>

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
                    <p className="text-xs font-bold text-[#ff6a13] uppercase mt-1 tracking-widest">${product.price}.00</p>
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