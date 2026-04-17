function getErrnoProps(err: unknown): { code?: string; syscall?: string } {
  if (typeof err !== "object" || err === null) return {};
  const e = err as { code?: unknown; syscall?: unknown };
  return {
    code: typeof e.code === "string" ? e.code : undefined,
    syscall: typeof e.syscall === "string" ? e.syscall : undefined,
  };
}

/** Walks Error.cause so MongoServerSelectionError → MongoNetworkError → system Error is covered. */
function collectErrorText(err: unknown): string {
  const parts: string[] = [];
  let cur: unknown = err;
  for (let i = 0; i < 8 && cur; i++) {
    if (cur instanceof Error) {
      parts.push(cur.message);
      if (cur.name) parts.push(cur.name);
    }
    const { code, syscall } = getErrnoProps(cur);
    if (code) parts.push(code);
    if (syscall) parts.push(syscall);
    cur =
      cur instanceof Error
        ? cur.cause
        : typeof cur === "object" &&
            cur !== null &&
            "cause" in cur &&
            (cur as { cause: unknown }).cause !== undefined
          ? (cur as { cause: unknown }).cause
          : undefined;
  }
  return parts.join(" ");
}

/** Maps low-level driver errors to something actionable in the UI. */
export function formatMongoConnectionError(err: unknown): string {
  const message = err instanceof Error ? err.message : "";
  const blob = `${message} ${collectErrorText(err)}`;
  const { code, syscall } = getErrnoProps(err);

  if (syscall === "querySrv" || blob.includes("querySrv")) {
    return (
      "Could not resolve your MongoDB Atlas address (DNS SRV lookup failed). " +
      "Fix: In MongoDB Atlas → Connect → Drivers, copy the connection string that starts with mongodb:// (standard), not mongodb+srv, paste it into MONGODB_URI in .env.local, and restart npm run dev. " +
      "Or change your PC/VPN DNS to 8.8.8.8."
    );
  }

  if (code === "ENOTFOUND" || blob.includes("ENOTFOUND")) {
    return (
      "Database host could not be found (DNS). Check MONGODB_URI for typos and your internet connection."
    );
  }

  if (code === "ETIMEDOUT" || blob.includes("ETIMEDOUT") || blob.toLowerCase().includes("timed out")) {
    return (
      "Connection to MongoDB timed out. Check the Atlas IP Access List (allow your IP or 0.0.0.0/0 for testing) and firewalls."
    );
  }

  if (
    blob.includes("ECONNREFUSED") &&
    (blob.includes("connect") || blob.includes("MongoServerSelectionError"))
  ) {
    return (
      "MongoDB refused the connection on that IP/port (nothing is accepting TCP there from your PC). " +
      "Do this: (1) Atlas → Network Access → add your current public IP or 0.0.0.0/0 (dev only), wait ~1 minute. " +
      "(2) Atlas → Clusters → Resume if the cluster is Paused. " +
      "(3) Connect → Drivers → copy a fresh URI; the default port is usually 27017—if your string says 27015 or another port by mistake, fix it. " +
      "(4) Try without VPN; allow Node/outbound TCP in Windows Firewall and antivirus."
    );
  }

  return message || "Could not connect to the database.";
}
