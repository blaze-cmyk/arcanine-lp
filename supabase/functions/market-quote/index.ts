import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

// Proxies Yahoo Finance to bypass browser CORS.
// GET /market-quote?symbols=AAPL,TSLA,EURUSD=X
// → { quotes: { [symbol]: { price, prevClose, changePct, sparkline:number[] } } }

const SYMBOL_RE = /^[A-Za-z0-9.\-=^/]+$/;

async function fetchOne(symbol: string) {
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
  if (!res.ok) throw new Error(`yahoo ${res.status}`);
  const json = await res.json();
  const result = json?.chart?.result?.[0];
  if (!result) throw new Error("no data");
  const meta = result.meta;
  const price: number = meta.regularMarketPrice;
  const prevClose: number = meta.chartPreviousClose ?? meta.previousClose ?? price;
  const changePct = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;
  const closes: Array<number | null> = result.indicators?.quote?.[0]?.close ?? [];
  const sparkline = closes.filter((v): v is number => typeof v === "number");
  return { price, prevClose, changePct, sparkline };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const symbolsRaw = url.searchParams.get("symbols") ?? url.searchParams.get("symbol") ?? "";
    const symbols = symbolsRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (symbols.length === 0 || symbols.length > 20) {
      return new Response(
        JSON.stringify({ error: "Provide 1–20 symbols via ?symbols=AAPL,TSLA" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    for (const s of symbols) {
      if (!SYMBOL_RE.test(s) || s.length > 20) {
        return new Response(
          JSON.stringify({ error: `Invalid symbol: ${s}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const results = await Promise.all(
      symbols.map(async (s) => {
        try {
          return [s, await fetchOne(s)] as const;
        } catch (e) {
          return [s, { error: e instanceof Error ? e.message : "failed" }] as const;
        }
      })
    );

    const quotes = Object.fromEntries(results);
    return new Response(JSON.stringify({ quotes }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=30",
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
