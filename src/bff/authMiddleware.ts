import type { Connect, ViteDevServer } from "vite";
import type { IncomingMessage, ServerResponse } from "http";
import http from "http";
import https from "https";

const BACKEND_URL = process.env.VITE_API_TARGET ?? "http://localhost:8001";
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

const loginAttempts = new Map<string, { count: number; resetAt: number }>();

const getClientIp = (req: IncomingMessage): string =>
  (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ??
  req.socket.remoteAddress ??
  "unknown";

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
};

const generateCsrfToken = (): string => {
  const arr = new Uint8Array(32);
  for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256);
  return Buffer.from(arr).toString("hex");
};

export const authBffMiddleware = (
  _server: ViteDevServer,
): Connect.HandleFunction => {
  return (
    req: IncomingMessage,
    res: ServerResponse,
    next: Connect.NextFunction,
  ) => {
    if (req.url !== "/api/auth/login" || req.method !== "POST") {
      return next();
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      res.writeHead(429, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: true,
          msg: "Terlalu banyak percobaan. Coba lagi nanti!",
        }),
      );
      return;
    }

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const parsed = new URL(BACKEND_URL);
      const isHttps = parsed.protocol === "https:";
      const transport = isHttps ? https : http;
      const options = {
        hostname: parsed.hostname,
        port: parsed.port || (isHttps ? 443 : 8001),
        path: "/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      };

      const proxyReq = transport.request(options, (proxyRes) => {
        let data = "";
        proxyRes.on("data", (chunk) => {
          data += chunk;
        });
        proxyRes.on("end", () => {
          try {
            const json = JSON.parse(data);
            if (!json.error && json.data?.refresh_token) {
              const csrf = generateCsrfToken();
              res.setHeader("Set-Cookie", [
                `lib_rt=${json.data.refresh_token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=604800`,
                `lib_csrf=${csrf}; SameSite=Strict; Path=/; Max-Age=604800`,
              ]);
              const { refresh_token: _rt, ...safeData } = json.data;
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ ...json, data: safeData }));
            } else {
              res.writeHead(proxyRes.statusCode ?? 401, {
                "Content-Type": "application/json",
              });
              res.end(data);
            }
          } catch {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: true, msg: "Server error" }));
          }
        });
      });

      proxyReq.on("error", () => {
        res.writeHead(502, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: true,
            msg: "Tidak bisa terhubung ke server",
          }),
        );
      });

      proxyReq.write(body);
      proxyReq.end();
    });
  };
};
