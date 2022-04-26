#!/usr/bin/env -S deno run --no-check --watch=data/ --allow-read --allow-net

/** @jsx h */
/** @jsxFrag Fragment */
import { serve } from "https://deno.land/std@0.135.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.135.0/http/file_server.ts";
import { h, ssr } from "https://crux.land/nanossr@0.0.4";

function Home() {
  return (
    <Layout>
      <Header />
      <Links />
      <p class="mt-12 text-lg text-justify">
        {/* TODO: import text from ./data/intro.md */}
        This community group aims to provide a space for JS runtimes to
        collaborate on API interoperability. We focus on documenting and
        improving interoperability of web platform APIs across runtimes
        (especially non-Browser ones). This is done through discussions between
        runtimes, proposals for new and existing web APIs in existing
        specification venues (WHATWG, W3C), and documentation of existing
        runtime behaviours.{" "}
        <a
          href="/faq"
          class="text-pink-500 hover:text-pink-700 hover:underline"
        >
          Learn more.
        </a>
      </p>
      <Logos />
      <Footer />
    </Layout>
  );
}

function Work() {
  return (
    <Layout>
      <Header />
    </Layout>
  );
}

function Faq() {
  return (
    <Layout>
      <Header />
    </Layout>
  );
}

function Layout(props) {
  return (
    <div class="mx-auto px-4 py-8 max-w-screen-md">
      {props.children}
    </div>
  );
}

function Header() {
  return (
    <section class="flex items-center gap-6">
      <TODO>
        <img src="/static/logo.svg" alt="wintercg logo" class="w-24 h-24" />
      </TODO>
      <div class="space-y-1">
        <h1 class="text-4xl font-semibold">WinterCG</h1>
        <p class="italic text-xl">Web-interoperable Runtimes Community Group</p>
      </div>
    </section>
  );
}

const LINKS = [
  {
    name: "Work",
    href: "/work",
  },
  {
    name: "FAQ",
    href: "/faq",
  },
  {
    name: "GitHub",
    href: "https://github.com/wintercg",
  },
  {
    name: "Charter",
    href: "https://github.com/wintercg/admin/blob/main/charter.md",
  },
];

function Links() {
  return (
    <ul class="mt-8 grid gap-2 sm:gap-3 md:gap-4 grid-cols-4">
      {LINKS.map((link) => (
        <li>
          <a
            href={link.href}
            class="block bg-pink-500 border-4 border-pink-300 hover:border-pink-600 sm:p-2 md:p-3 font-medium text-lg text-center text-white"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

const LOGOS = [
  {
    src: "/static/logos/cloudflare.svg",
    href: "https://cloudflare.com/",
    name: "Cloudflare",
  },
  {
    src: "/static/logos/deno.svg",
    href: "https://deno.com/",
    name: "Deno",
  },
  {
    src: "/static/logos/nodejs.svg",
    href: "https://nodejs.org/",
    name: "Node.js",
  },
];

function Logos() {
  return (
    <div class="mt-16">
      <ul class="mt-4 flex justify-between sm:justify-evenly">
        {LOGOS.map(({ src, href, name }) => (
          <a href={href}>
            <img
              src={src}
              title={`${name} logo`}
              alt={`${name} logo`}
              class="h-16 sm:h-20"
            />
          </a>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer class="mt-16 text-center border-t-1 border-gray-100 p-4">
      <p class="text-sm text-gray-600">
        Copyright © <TODO>WinterCG / W3C</TODO>. This work is licensed under an
        {"  "}
        <TODO>
          <a href="https://github.com/wintercg/www/blob/main/LICENSE">
            MIT license
          </a>
        </TODO>.
      </p>
    </footer>
  );
}

function TODO(props) {
  return (
    <span class="border-red-500 border-2">
      {props.children}
    </span>
  );
}

console.log("Listening on http://localhost:8000");
await serve((req) => {
  const url = new URL(req.url);
  if (url.pathname === "/") {
    return ssr(() => <Home />);
  } else if (url.pathname === "/work") {
    return ssr(() => <Work />);
  } else if (url.pathname === "/faq") {
    return ssr(() => <Faq />);
  } else if (url.pathname.startsWith("/static/")) {
    return serveDir(req, {
      urlRoot: "static",
      fsRoot: "./static",
    });
  } else {
    return new Response("Not Found", { status: 404 });
  }
});
