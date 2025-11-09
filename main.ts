import { App, staticFiles } from "fresh";
import { define,type State } from "./utils.ts";
import { jwtVerify } from "npm:jose@5.9.6";

export const app = new App<State>();
app.use(staticFiles());

const SECRET_KEY = new TextEncoder().encode("SECRET_KEY");


app.post("/api/login", async (ctx) => {
  try {
      const data = await ctx.req.json();
      if (!data) {
        return new Response(
          JSON.stringify({ error: "Body vacío" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const { email, password } = data;
      if (!email || !password) {
        return new Response(
          JSON.stringify({ error: "Campos vacíos" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const apiResponse = await fetch(
        "https://backend-renfe.sergioom9.deno.net/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      if (!apiResponse.ok) {
        return new Response(
          JSON.stringify({ error: "Credenciales Incorrectas" }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }
      const result = await apiResponse.json();
      return new Response(
        JSON.stringify(result),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: `Error interno` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
 
});

app.post("/api/register", async (ctx) => {
   try {
      const data = await ctx.req.json();
      if (!data) {
        return new Response(
          JSON.stringify({ error: "Body vacío" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const { email, password,userid,name } = data;
      if (!email || !password || !userid || !name) {
        return new Response(
          JSON.stringify({ error: "Campos vacíos" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const apiResponse = await fetch(
        "https://backend-renfe.sergioom9.deno.net/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      if (!apiResponse.ok) {
        return new Response(
          JSON.stringify({ error: apiResponse.statusText }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }
      const result = await apiResponse.json();
      return new Response(
        JSON.stringify(result),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.log(error)
      return new Response(
        JSON.stringify({ error: `Error interno` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
});

app.get("/api/news", async () => {
   try {
      const apiResponse = await fetch("https://backend-renfe.sergioom9.deno.net/news")
      if (!apiResponse.ok) {
        return new Response(
          JSON.stringify({ error: apiResponse.statusText }),
          { status: 401, headers: { "Content-Type": "application/json"} }
        );
      }
      const result = await apiResponse.json();
      return new Response(
        JSON.stringify(result),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.log(error)
      return new Response(
        JSON.stringify({ error: `Error interno` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
});

app.get("/api/tickets", async () => {
   try {
      const apiResponse = await fetch("https://backend-renfe.sergioom9.deno.net/ticket")
      if (!apiResponse.ok) {
        return new Response(
          JSON.stringify({ error: apiResponse.statusText }),
          { status: 401, headers: { "Content-Type": "application/json"} }
        );
      }
      const result = await apiResponse.json();
      return new Response(
        JSON.stringify(result),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.log(error)
      return new Response(
        JSON.stringify({ error: `Error interno` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
});

app.post("/api/tickets", async (ctx) => {
   try {
    const data = await ctx.req.json();
      if (!data) {
        return new Response(
          JSON.stringify({ error: "Body vacío" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const {ticketid} = data;
      if (!ticketid) {
        return new Response(
          JSON.stringify({ error: "Campos vacíos" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const payload  = { ticketid: ticketid };
      const apiResponse = await fetch(`https://backend-renfe.sergioom9.deno.net/ticket/${ticketid}`)
      if (!apiResponse.ok) {
        return new Response(
          JSON.stringify({ error: apiResponse.statusText }),
          { status: 401, headers: { "Content-Type": "application/json"} }
        );
      }
      const result = await apiResponse.json();
      return new Response(
        JSON.stringify(result),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.log(error)
      return new Response(
        JSON.stringify({ error: `Error interno` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
});

app.post("/api/news", async (ctx) => {
   try {
    const data = await ctx.req.json();
      if (!data) {
        return new Response(
          JSON.stringify({ error: "Body vacío" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const {newid} = data;
      if (!newid) {
        return new Response(
          JSON.stringify({ error: "Campos vacíos" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const apiResponse = await fetch(`https://backend-renfe.sergioom9.deno.net/news/${newid}`)
      if (!apiResponse.ok) {
        return new Response(
          JSON.stringify({ error: apiResponse.statusText }),
          { status: 401, headers: { "Content-Type": "application/json"} }
        );
      }
      const result = await apiResponse.json();
      return new Response(
        JSON.stringify(result),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.log(error)
      return new Response(
        JSON.stringify({ error: `Error interno` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
});

const checkAuth = define.middleware(async (ctx) => {
  const cookie = ctx.req.headers.get("cookie") || "";
  const match = cookie.match(/bearer=([^;]+)/);
  const token = match?.[1];
  if (!token) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/main/login" },
    });
  }
  try {
    await jwtVerify(token, SECRET_KEY);
    return await ctx.next(); 
  } catch (_e) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/main/login" },
    });
  }
})
const alreadylogged = define.middleware(async (ctx) => {
    const cookie = ctx.req.headers.get("cookie") || "";
  const match = cookie.match(/bearer=([^;]+)/);
  const token = match?.[1];
  if (!token) return await ctx.next();
  try {
    await jwtVerify(token, SECRET_KEY);
    return new Response(null, {
      status: 302,
      headers: { Location: "/profile/me" },
    });
  } catch (_e) {
    return await ctx.next();
  }
});

app.use("/buy",checkAuth)
app.use("/profile",checkAuth)

app.use("/login",alreadylogged)
app.use("/register",alreadylogged)


app.fsRoutes();
