import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

// Proxies Yahoo Finance chart endpoint to bypass browser CORS restrictions.
// Returns: { price, prevClose, changePct, sparkline: number[] }

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const symbol = url.searchParams.get("symbol");
    if (!symbol || symbol.length > 20 || !/^[A-Za-z0-9.\-=^/]+$/.test(symbol)) {
      return new Response(JSON.stringify({ error: "Invalid symbol" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
      symbol
    )}?interval=30m&range=1d`;

    const res = await fetch(yahooUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: `Yahoo error ${res.status}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const json = await res.json();
    const result = json?.chart?.result?.[0];
    if (!result) {
      return new Response(JSON.stringify({ error: "No data" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const meta = result.meta;
    const price: number = meta.regularMarketPrice;
    const prevClose: number = meta.chartPreviousClose ?? meta.previousClose ?? price;
    const changePct = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;

    const closes: Array<number | null> = result.indicators?.quote?.[0]?.close ?? [];
    const sparkline = closes.filter((v): v is number => typeof v === "number");

    return new Response(
      JSON.stringify({ symbol, price, prevClose, changePct, sparkline }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=30",
        },
      }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
