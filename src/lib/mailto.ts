// src/lib/mailto.ts
export function mailto({
  to,
  subject,
  body,
  cc,
  bcc,
}: {
  to?: string;
  subject?: string;
  body?: string;
  cc?: string;
  bcc?: string;
}) {
  // Prefer explicit "to", then env, then (optional) dev fallback
  const envTo = (import.meta.env.VITE_FEEDBACK_EMAIL as string | undefined)?.trim();
  const fallbackDev = ""; // e.g., "knowyourrights.project@gmail.com" if you want a hard fallback
  const addr = (to || envTo || fallbackDev).trim();

  if (!addr) {
    alert(
      "Feedback email isn’t configured.\n\n" +
      "Set VITE_FEEDBACK_EMAIL in your .env or pass a 'to' value to mailto()."
    );
    return;
  }

  const q: string[] = [];
  if (subject) q.push(`subject=${encodeURIComponent(subject)}`);

  // Use CRLF for best compatibility
  const normalizedBody = body ? body.replace(/\n/g, "\r\n") : undefined;
  if (normalizedBody) q.push(`body=${encodeURIComponent(normalizedBody)}`);

  if (cc) q.push(`cc=${encodeURIComponent(cc)}`);
  if (bcc) q.push(`bcc=${encodeURIComponent(bcc)}`);

  const query = q.length ? `?${q.join("&")}` : "";
  window.location.href = `mailto:${addr}${query}`;
}