// usePurposePiece.js
// Reads Purpose Piece user data from:
// 1. URL query params (when redirected from PP tool)
// 2. Supabase (when user is authenticated)
// Falls back gracefully to anonymous mode

import { useState, useEffect } from "react";

// Supabase client — reads from window globals set by Vercel env
function getSupabaseClient() {
  if (typeof window === "undefined") return null;
  if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) return null;
  try {
    const { createClient } = window.supabase || {};
    if (!createClient) return null;
    return createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  } catch {
    return null;
  }
}

// Parse URL params set by Purpose Piece redirect
// e.g. ?domain=nature&scale=local&archetype=Builder&pp_session=UUID
function parseURLParams() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const domain = params.get("domain");
  const scale = params.get("scale");
  const archetype = params.get("archetype");
  const ppSession = params.get("pp_session");

  if (!domain && !archetype) return null;

  return {
    domain: domain || null,
    scale: scale || null,
    archetype: archetype || null,
    ppSessionId: ppSession || null,
    source: "url",
  };
}

export function usePurposePiece() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // 1. Check URL params first (direct redirect from PP)
      const urlData = parseURLParams();
      if (urlData) {
        setUserData(urlData);
        setLoading(false);
        return;
      }

      // 2. Try Supabase if available
      const supabase = getSupabaseClient();
      if (supabase) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const { data, error } = await supabase.rpc("get_user_purpose_piece", {
              p_user_id: user.id,
            });
            if (!error && data) {
              setUserData({ ...data, source: "supabase" });
              setLoading(false);
              return;
            }
          }
        } catch {
          // Supabase not available or RPC not deployed — fall through
        }
      }

      // 3. No data — anonymous mode
      setUserData(null);
      setLoading(false);
    }

    load();
  }, []);

  return { userData, loading };
}
