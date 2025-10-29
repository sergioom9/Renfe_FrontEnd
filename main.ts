import { App, staticFiles } from "fresh";
import { define, type State } from "./utils.ts";
export const app = new App<State>();

app.use(staticFiles());

app.post("/api/login", async (ctx:any) => {
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
      console.log(apiResponse)
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

app.post("/api/register", async (ctx:any) => {
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
        "https://backend-renfe.sergioom9.deno.net/regsiter",
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
          JSON.stringify({ error: "Registro Fallido" }),
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

app.use(async (ctx) => {
  ctx.state.shared = "hello";
  return await ctx.next();
});


const exampleLoggerMiddleware = define.middleware((ctx) => {
  console.log(`${ctx.req.method} ${ctx.req.url}`);
  return ctx.next();
});
app.use(exampleLoggerMiddleware);

app.fsRoutes();
