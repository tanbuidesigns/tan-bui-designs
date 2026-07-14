import { makeRouteHandler } from "@keystatic/next/route-handler";

import keystaticConfig, { showAdminUI } from "../../../../../keystatic.config";

const notFoundHandler = () => new Response(null, { status: 404 });
const handlers = showAdminUI
  ? makeRouteHandler({ config: keystaticConfig })
  : { GET: notFoundHandler, POST: notFoundHandler };

export const GET = handlers.GET;
export const POST = handlers.POST;
