#!/usr/bin/env -S deno run --no-check --watch=data/ --allow-read --allow-net

/** @jsx h */
/** @jsxFrag Fragment */
import { serveDir } from "jsr:@std/http/file-server";
import { Fragment, h, Helmet, ssr } from "./nanossr.ts";
import * as colors from "https://esm.sh/twind@0.16.16/colors.mjs";

import work from "./data/work.json" with { type: "json" };

function Home() {
  return (
    <Layout>
      <Header />
      <Links />
      <p class="mt-12 text-lg text-justify">
        WinterTC (TC55) is an Ecma International Technical Committee that aims
        to achieve some level of API interoperability across server-side
        JavaScript runtimes, especially for APIs that are common with the web.
        This is done by standardizing a{" "}
        <a
          href="https://min-common-api.proposal.wintertc.org"
          class="text-orange-500 hover:text-orange-700 hover:underline"
        >
          “minimum common API”
        </a>{" "}
        shared with the web that such runtimes should support, as well as by
        collaborating with web standards groups (WHATWG, W3C...) for new web
        APIs and changes to current web APIs. We also publish standards to add
        new interoperable server-side APIs.{" "}
        <a
          href="/faq"
          class="text-orange-500 hover:text-orange-700 hover:underline"
        >
          Learn more.
        </a>
      </p>
      <Logos />
      <Footer />
    </Layout>
  );
}

function WorkItems(props) {
  return (
    <div class="mt-8 space-y-6">
      {props.items.map((item) => (
        <article>
          <h2 class="text-xl font-medium">{item.name}</h2>
          <p class="text-lg">{item.description}</p>
          <p class="flex gap-4">
            <a
              href={`https://github.com/${props.repoPrefix ?? ""}${item.repo}`}
              class="text-orange-500 hover:text-orange-700 hover:underline"
            >
              Repository
            </a>
            {item.specification && (
              <a
                href={item.specification}
                class="text-orange-500 hover:text-orange-700 hover:underline"
              >
                Specification
              </a>
            )}
          </p>
        </article>
      ))}
    </div>
  );
}

function Work() {
  return (
    <Layout>
      <Header />
      <Links selected="/work" />
      <p class="mt-12 text-lg">
        WinterTC is currently working on various standards to improve
        interoperability across server-side runtimes:
      </p>
      <WorkItems items={work.specs} repoPrefix="wintercg/" />
      <p class="mt-12 text-lg">
        We are also collaborating with other standards bodies to make web
        platform APIs more suitable to server-side runtimes:
      </p>
      <WorkItems items={work.collaborations} />
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
          <div id="what-is-the-wintercg"></div>
          <a href="#what-is-wintertc" id="what-is-wintertc">
            <h2 class="text-2xl font-medium">What is WinterTC?</h2>
          </a>
          <p>
            The Technical Committee on Web-interoperable Server Runtimes
            (WinterTC) is a community of people who are interested in
            interoperability across server-side (Deno / Node.js) or edge
            JavaScript runtimes (Cloudflare Workers / Deno Deploy), especially
            for Web Platform APIs.
          </p>
          <p>
            WinterTC is organized as Ecma International's{" "}
            <a
              href="https://ecma-international.org/technical-committees/tc55/"
              class="text-orange-500 hover:text-orange-700 hover:underline"
            >
              Technical Committee number 55 (TC55)
            </a>. This gives the group access to Ecma's vast infrastructure and
            its IPR policy work, as well as the ability to publish standards.
            This is the same type of committee as{" "}
            <a
              href="https://tc39.es/"
              class="text-orange-500 hover:text-orange-700 hover:underline"
            >
              TC39
            </a>, which standardizes the JavaScript language.
          </p>
        </div>
        <div class="space-y-4">
          <a href="#what-are-we-trying-to-do" id="what-are-we-trying-to-do">
            <h2 class="text-2xl font-medium">
              What are we trying to do?
            </h2>
          </a>
          <p>
            The ultimate goal of this committee is to promote runtimes
            supporting a comprehensive unified API surface that JavaScript
            developers can rely on, regardless of whether their code will be
            used in browsers, servers, or edge runtimes.
          </p>
          <p>
            It is another goal of WinterTC that runtimes with needs for
            capabilities beyond web platform APIs, in particular server-side and
            edge runtimes, still have unified surfaces.
          </p>
          <p>
            The members of the committee want to provide a space to better
            coordinate between server-side implementors, as well as with browser
            vendors, on how to best achieve this interoperability.
          </p>
          <p>
            It is not explicitly a goal of WinterTC to promote such a unified
            API surface for other JavaScript environments, such as embedded
            applications. However, the results of our work could be useful to
            such environments nonetheless.
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
            We want to specify and document how server side runtimes can best
            implement Web Platform APIs and to what extent they could deviate
            from browsers.
          </p>
          <p>
            We want to provide feedback to spec authors of Web Platform APIs
            from the view point of non-browser runtimes to help them make
            informed decisions about future changes and additions to these
            specifications.
          </p>
          <p>
            We want to develop and specify new APIs that, although they might be
            too powerful for the Web Platform or not fit within its security
            model, would still be a great fit for server-side runtimes and would
            be part of a comprehensive unified API surface for such runtimes.
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
            We do not want to fork or create new versions of existing
            specifications. If we think a new web platform API is needed, or if
            we think an existing spec needs changes, the goal is always for that
            change or addition to be developed in an existing venue (such as
            WHATWG or W3C). WinterTC will publish requirements on what those
            changes could be, and it will be up to that existing standards body
            to make these changes, possibly through members who are part of both
            WinterTC and that standards body.
          </p>
          <p>
            We do not want to create new server-side APIs that overlap with
            existing web platform APIs. If there is a proposed or standardized
            web API that overlaps with the needs of server-side runtimes, the
            goal is always to investigate what changes (if any) it would need to
            be useful for servers; and once those changes have been incorporated
            to the specification, to eventually add the API to the minimum
            common set.
          </p>
          <p>
            We are not trying to shift the focus of Web Platform APIs to only
            serve server-side runtimes. We want to see more API surface that is
            useful and works great both in browsers and on the server.
          </p>
        </div>
        <div class="space-y-4">
          <a
            href="#is-this-the-same-as-wintercg"
            id="is-this-the-same-as-wintercg"
          >
            <h2 class="text-2xl font-medium">
              Is this the same as “WinterCG”?
            </h2>
          </a>
          <p>
            We initially started our work of working on this cross-runtime
            interoperability in May 2022 by creating the Web-interoperable
            Runtimes Community Group (nicknamed WinterCG) under the W3C. We
            chose to organize it as a W3C Community Group because it was open
            for anyone to participate, without needing to be a W3C member.
          </p>
          <p>
            W3C Community Groups are set up to help people organize together,
            but they can't publish standards. And as WinterCG matured, and our
            goal expanded over time to include defining non-web APIs, it became
            clear that we needed to form some working group or technical
            committee, which can publish standards. Therefore, in December 2024
            we formed WinterTC (formally, TC55) as an Ecma International
            Technical Committee. When WinterTC is fully set up, all WinterCG
            work will move there, and then WinterCG will close.
          </p>
        </div>
        {
          // TODO: Uncomment and rewrite when we've figured out TC55's process.
          //
          // <div class="space-y-4">
          //   <div id="does-the-wintercg-operate-by-consensus"></div>
          //   <a
          //     href="#does-wintertc-operate-by-consensus"
          //     id="does-wintertc-operate-by-consensus"
          //   >
          //     <h2 class="text-2xl font-medium">
          //       Does WinterTC operate by consensus?
          //     </h2>
          //   </a>
          //   <p>
          //     The group strives for rough consensus among contributors for changes
          //     to work products. Instead of formal consensus, the editors for a
          //     given work product make the judgement on whether a change is ready
          //     for inclusion and has enough support from the group. The group
          //     itself has a strict consensus policy outlined in the charter, which
          //     is overseen by the group chairs.
          //   </p>
          // </div>
        }
        <div class="space-y-4">
          <div id="who-controls-the-wintercg"></div>
          <a href="#who-controls-wintertc" id="who-controls-wintertc">
            <h2 class="text-2xl font-medium">Who controls WinterTC?</h2>
          </a>
          <p>
            WinterTC is controlled by the community of people who are working in
            it. The chair(s) of the group help moderate discussion and help
            guide the group towards consensus on proposed changes.
          </p>
          <p>
            Currently the group consists of individual members, as well as
            members from the following organizations:
          </p>
          <ul class="list-disc pl-7">
            <li>Bloomberg</li>
            <li>Cloudflare</li>
            <li>Deno</li>
            <li>Igalia</li>
            <li>Node.js</li>
          </ul>
        </div>
        <div class="space-y-4">
          <a
            href="#how-can-i-participate"
            id="how-can-i-participate"
          >
            <h2 class="text-2xl font-medium">
              How can I participate?
            </h2>
          </a>
          <p>
            The work of WinterTC happens openly{" "}
            <a
              href="https://github.com/wintercg"
              class="text-orange-500 hover:text-orange-700 hover:underline"
            >
              on Github
            </a>
            , and most of the discussion and conversation around it happens in
            {" "}
            <a
              href="https://matrix.to/#/#wintertc:matrix.org"
              class="text-orange-500 hover:text-orange-700 hover:underline"
            >
              our Matrix room
            </a>
            . Anyone is welcome to participate in both of them.
          </p>
          <p>
            Only WinterTC delegates and invited experts can participate in
            WinterTC meetings, though. Delegates need to belong to an Ecma
            member organization, but anyone else who wants to be involved in
            WinterTC can become an invited expert. To do so, you can{" "}
            <a
              href="https://github.com/WinterCG/admin/issues/new/choose"
              class="text-orange-500 hover:text-orange-700 hover:underline"
            >
              open an issue
            </a>{" "}
            in the WinterTC admin repo.
          </p>
        </div>
      </section>
      <Footer />
    </Layout>
  );
}

const DESCRIPTION =
  "WinterTC is an Ecma International Technical Committee aiming to provide a space for JS runtimes to collaborate on API interoperability.";

function Layout(props) {
  return (
    <>
      <Helmet>
        <title>WinterTC</title>
        <link
          rel="shortcut icon"
          href="/static/logo.svg"
          type="image/svg+xml"
        />
        <meta name="description" content={DESCRIPTION} />
        <meta name="og:title" content="WinterTC" />
        <meta name="og:description" content={DESCRIPTION} />
        <meta name="og:image" content="https://wintertc.org/static/cover.png" />
        <meta name="og:url" content="https://wintertc.org" />
        <meta name="og:type" content="website" />
      </Helmet>
      <div class="mx-auto px-4 py-8 max-w-screen-md">
        {props.children}
      </div>
    </>
  );
}

function Header() {
  return (
    <section class="flex items-center gap-6">
      <a class="flex-shrink-0" href="/">
        <img src="/static/logo.svg" alt="wintertc logo" class="w-24 h-24" />
      </a>
      <a href="/" class="block space-y-1">
        <h1 class="text-4xl font-semibold">WinterTC</h1>
        <p class="italic text-xl">
          Technical Committee on Web-interoperable Server Runtimes
        </p>
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
    name: "Scope",
    href: "https://ecma-international.org/technical-committees/tc55",
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
                ? "bg-orange-200 text-black border-orange-300"
                : "bg-orange-500 text-white border-orange-300 hover:border-orange-600"
            } sm:p-2 md:p-3 font-medium text-lg text-center`}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

// NOTE to all: keep this list sorted alphabetically by name.
const PARTNER_LOGOS = [
  {
    src: "/static/logos/alibaba.png",
    href: "https://alibabagroup.com/",
    name: "Alibaba",
    restrict: "horizontal",
  },
  {
    src: null,
    href: "https://techatbloomberg.com/",
    name: "Bloomberg",
  },
  {
    src: "/static/logos/bytedance.png",
    href: "https://bytedance.com/",
    name: "ByteDance",
    restrict: "horizontal",
    licenseExpiration: new Date(2026, 6, 28), // We are only licensed to use the image until 2026-06-29.
  },
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
    src: "/static/logos/fastly.svg",
    href: "https://www.fastly.com/",
    name: "Fastly",
    restrict: "vertical",
  },
  {
    src: "/static/logos/igalia.png",
    href: "https://igalia.com/",
    name: "Igalia",
    restrict: "horizontal",
  },
  {
    src: "/static/logos/netlify.svg",
    href: "https://netlify.com/",
    name: "Netlify",
    restrict: "horizontal",
  },
  {
    src: "/static/logos/nodejs.svg",
    href: "https://nodejs.org",
    name: "Node.js",
    restrict: "horizontal",
  },
  {
    src: "/static/logos/shopify.svg",
    href: "https://shopify.dev/",
    name: "Shopify",
    restrict: "horizontal",
  },
  {
    src: "/static/logos/suborbital.svg",
    href: "https://suborbital.dev/",
    name: "Suborbital",
    restrict: "horizontal",
  },
  {
    src: "/static/logos/tencent.png",
    href: "https://www.tencent.com/",
    name: "Tencent",
    restrict: "horizontal",
  },
  {
    src: "/static/logos/vercel.svg",
    href: "https://vercel.com/",
    name: "Vercel",
    restrict: "horizontal",
  },
  {
    src: "/static/logos/azion.svg",
    href: "https://azion.com/",
    name: "Azion",
    restrict: "horizontal",
  },
  /** TODO: Add additional logos here */
].filter(({ licenseExpiration: le }) => !le || le > new Date());

function Logos() {
  return (
    <div>
      <p class="mt-16 text-center">
        The work of WinterTC (and its predecessor WinterCG) has included
        participation from:
      </p>
      <div class="mt-8 flex gap-4 flex-wrap justify-evenly sm:justify-evenly items-center">
        {PARTNER_LOGOS.map(({ src, href, name, restrict }) => (
          <a href={href}>
            {src === null ? name : (
              <img
                src={src}
                title={`${name} logo`}
                alt={`${name} logo`}
                class={restrict === "vertical"
                  ? "h-8 sm:h-11"
                  : (restrict === "horizontal"
                    ? "w-28 sm:w-36"
                    : "h-12 sm:h-16")}
              />
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer class="mt-16 text-center border-t-1 border-gray-100 p-4 space-y-4">
      <p>
        <a href="https://matrix.to/#/#wintertc:matrix.org">
          <img
            class="h-6 inline-block"
            src="/static/logos/matrix.svg"
            alt="Chat with us on Matrix"
          />
        </a>
      </p>
      <p class="text-sm text-gray-600">
        Copyright © Ecma International.
      </p>
    </footer>
  );
}

const ssrOptions = {
  tw: {
    theme: {
      colors,
      extend: {
        colors: {
          orange: {
            500: "#fc7c00",
          }
        }
      }
    },
  },
};

Deno.serve((req) => {
  const url = new URL(req.url);
  if (url.hostname === "wintercg.org" || url.hostname === "wintertc.com") {
    url.hostname = "wintertc.org";
    return Response.redirect(url, 301);
  }
  if (url.pathname === "/") {
    return ssr(() => <Home />, ssrOptions);
  } else if (url.pathname === "/work") {
    return ssr(() => <Work />, ssrOptions);
  } else if (url.pathname === "/faq") {
    return ssr(() => <Faq />, ssrOptions);
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
