#!/usr/bin/env -S deno run --no-check --watch=data/ --allow-read --allow-net

/** @jsx h */
/** @jsxFrag Fragment */
import { serve } from "https://deno.land/std@0.135.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.135.0/http/file_server.ts";
import { h, ssr } from "https://crux.land/nanossr@0.0.4";

import work from "./data/work.json" assert { type: "json" };

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
      <Links selected="/work" />
      <p class="mt-12 text-lg">
        The WinterCG is currently working on various efforts to improve web
        platform APIs across runtimes:
      </p>
      <ul class="mt-8 space-y-6">
        {work.map((item) => (
          <li>
            <h3 class="text-xl font-medium">{item.name}</h3>
            <p class="text-lg">{item.description}</p>
            <p class="flex gap-4">
              <a
                href={`https://github.com/wintercg/${item.repo}`}
                class="text-pink-500 hover:text-pink-700 hover:underline"
              >
                Repository
              </a>
              {item.specification && (
                <a
                  href={item.specification}
                  class="text-pink-500 hover:text-pink-700 hover:underline"
                >
                  Specification
                </a>
              )}
            </p>
          </li>
        ))}
      </ul>
      <Footer />
    </Layout>
  );
}

function Faq() {
  return (
    <Layout>
      <Header />
      <Links selected="/faq" />
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
      <a href="/" class="block space-y-1">
        <h1 class="text-4xl font-semibold">WinterCG</h1>
        <p class="italic text-xl">Web-interoperable Runtimes Community Group</p>
      </a>
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

function Links(props) {
  return (
    <ul class="mt-8 grid gap-2 sm:gap-3 md:gap-4 grid-cols-4">
      {LINKS.map((link) => (
        <li>
          <a
            href={props.selected === link.href ? undefined : link.href}
            class={`block border-4 ${
              props.selected === link.href
                ? "bg-pink-200 text-black border-pink-300"
                : "bg-pink-500 text-white border-pink-300 hover:border-pink-600"
            } sm:p-2 md:p-3 font-medium text-lg text-center`}
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
      quiet: true,
    });
  } else {
    return new Response("Not Found", { status: 404 });
  }
});
