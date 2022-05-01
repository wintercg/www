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
            <h2 class="text-xl font-medium">{item.name}</h2>
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
      <section class="mt-12 text-lg space-y-10">
        <div class="space-y-4">
          <a href="#who-is-the-wintercg" id="what-is-the-wintercg">
            <h2 class="text-2xl font-medium">What is the WinterCG?</h2>
          </a>
          <p>
            The Web-interoperable Runtimes Community Group (WinterCG) is a
            community of people who are interested in using Web Platform APIs
            outside of browsers, namely on the server (Deno / Node.js) or edge
            runtimes (Cloudflare Workers / Deno).
          </p>
          <p>
            The WinterCG is organized as a W3C Community Group. This gives the
            group access to the W3C's vast infrastructure and its IPR policy
            work. This is the same type of community that the WICG is organized
            in.
          </p>
        </div>
        <div class="space-y-4">
          <a href="#what-are-we-trying-to-do" id="what-are-we-trying-to-do">
            <h2 class="text-2xl font-medium">
              What are we trying to do?
            </h2>
          </a>
          <p>
            The ultimate goal of the group is to promote runtimes supporting a
            comprehensive unified API surface that JavaScript developers can
            rely on regardless of the runtime they are using: be it browsers,
            servers, embedded applications, or edge runtimes.
          </p>
          <p>
            The members of the group want to provide a space to better
            coordinate between browser vendors and other implementors on how Web
            Platform APIs can be best implemented and used outside of browsers.
          </p>
        </div>
        <div class="space-y-4">
          <a
            href="#how-do-we-want-to-achieve-our-goals"
            id="how-do-we-want-to-achieve-our-goals"
          >
            <h2 class="text-2xl font-medium">
              How do we want to achieve our goals?
            </h2>
          </a>
          <p>
            We want to provide guidance and documentation on how server side
            runtimes can best implement Web Platform APIs and to what extent
            they could deviate from browsers.
          </p>
          <p>
            We want to provide feedback to spec authors of Web Platform APIs
            from the view point of non-browser runtimes to help them make
            informed decisions about future specification changes.
          </p>
          <p>
            We want to coordinate and propose updates to existing Web Platform
            APIs (in existing venues) that we think would benefit the goal of a
            comprehensive unified API surface for all JS developers.
          </p>
        </div>
        <div class="space-y-4">
          <a href="#why-are-we-doing-this" id="why-are-we-doing-this">
            <h2 class="text-2xl font-medium">Why are we doing this?</h2>
          </a>
          <p>
            The members of this group all share the belief that a comprehensive
            unified API surface for JS runtimes is something that would benefit
            the JS community as a whole. In the past members have individually
            worked on making this a reality.
          </p>
          <p>
            This disparate approach with little coordination has historically
            led to much confusion between not just browser vendors, spec
            authors, and other implementors, but also between non browser
            implementors and other non browser implementors on topics of unified
            API. This was often caused by the fact that discussions were spread
            over various disparate issue and PR comments with often little
            context or cohesion between them.
          </p>
          <p>
            We think that by working together more tightly we can provide
            browser vendors and specification editors with more meaningful
            feedback from users of non-browser JS runtimes. This will help them
            make informed decisions about future specification changes that
            relate to the goal of a comprehensive unified API surface for JS
            runtimes.
          </p>
        </div>
        <div class="space-y-4">
          <a
            href="#what-we-are-not-trying-to-do"
            id="what-we-are-not-trying-to-do"
          >
            <h2 class="text-2xl font-medium">What are we NOT trying to do?</h2>
          </a>
          <p>
            We are not trying to be a specification body that specifies new
            APIs. We want to work with members of existing specification bodies
            to improve existing APIs.
          </p>
          <p>
            We will never fork or create new versions of existing
            specifications. For any change we propose, the goal is always for it
            to be incorporated into an upstream spec in an existing venue (such
            as WHATWG or W3C).
          </p>
          <p>
            We are not trying to shift the focus of Web Platform APIs to only
            serve non-browser runtimes. We want to see more API surface that is
            useful and works great both in browsers and in other runtimes.
          </p>
        </div>
        <div class="space-y-4">
          <a href="#who-controls-the-wintercg" id="who-controls-the-wintercg">
            <h2 class="text-2xl font-medium">
              Does the WinterCG operate by consensus?
            </h2>
          </a>
          <p>
            The group strives for rough consensus among contributors for changes
            to work products. Instead of formal consensus, the editors for a
            given work product make the judgement on whether a change is ready
            for inclusion and has enough support from the group. The group
            itself has a strict consensus policy outlined in the charter, which
            is oversought by the group chairs.
          </p>
        </div>
        <div class="space-y-4">
          <a href="#who-controls-the-wintercg" id="who-controls-the-wintercg">
            <h2 class="text-2xl font-medium">Who controls the WinterCG?</h2>
          </a>
          <p>
            The WinterCG is controlled by the community of people who are
            working in it. The chair(s) of the group help moderate discussion
            and help guide the group towards consensus on proposed changes.
          </p>
          <p>
            Currently the group consists of individual members, and members from
            the following organizations:
          </p>
          <ul class="list-disc pl-7">
            <li>Bloomberg</li>
            <li>Cloudflare</li>
            <li>Deno</li>
            <li>Node.js</li>
            <li>Shopify</li>
            <li>Vercel</li>
          </ul>
          <p>
            The group is open to anyone who also shares the interest in using
            Web Platform APIs outside of the browser. You can join{" "}
            <a
              href="https://www.w3.org/community/wintercg"
              class="text-pink-500 hover:text-pink-700 hover:underline"
            >
              here
            </a>. You do not need to be a W3C member to participate. Community
            group participation is free of charge.
          </p>
        </div>
      </section>
      <Footer />
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

const RUNTIME_LOGOS = [
  {
    src: "/static/logos/cloudflare-workers.svg",
    href: "https://workers.cloudflare.com/",
    name: "Cloudflare Workers",
  },
  {
    src: "/static/logos/deno.svg",
    href: "https://deno.land/",
    name: "Deno",
  },
  /**
   * Hopefully we'll get permission to use the Node.js logo soon.
   * {
   *   src: "/static/logos/nodejs.svg",
   *   href: "https://nodejs.org/",
   *   name: "Node.js",
   * },
   */
];

const PARTNER_LOGOS = [
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
  /** TODO: Add additional logos here */
];

function Logos() {
  return (
    <div class="mt-16">
      <ul class="my-16 flex justify-evenly">
        {RUNTIME_LOGOS.map(({ src, href, name }) => (
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
      <p class="mt-8">The work of the WinterCG is sponsored, in part, by:</p>
      <ul class="mt-8 flex justify-evenly">
        {PARTNER_LOGOS.map(({ src, href, name }) => (
          <a href={href}>
            <img
              src={src}
              title={`${name} logo`}
              alt={`${name} logo`}
              class="h-12 sm:h-16"
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
        Copyright © WinterCG. This work is licensed under the{" "}
        <a href="http://www.w3.org/Consortium/Legal/2015/copyright-software-and-document">
          W3C Software and Document License
        </a>.
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
