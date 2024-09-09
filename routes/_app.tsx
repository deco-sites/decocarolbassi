import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { Context } from "deco/deco.ts";
import Theme from "../sections/Theme/Theme.tsx";

const sw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <Head>
        {/* Google Tag Manager */}
        <script>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://trckss.carolbassi.com.br/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PNLHPKB')`}
        </script> 

        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />

        {/* Light mode Schema */}
        <meta name="color-scheme" content="light only" />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />
      </Head>

      {/* <!-- Google Tag Manager (noscript) --> */}
      <noscript>
        <iframe
          src="https://trckss.carolbassi.com.br/ns.html?id=GTM-PNLHPKB"
          height="0"
          width="0"
          style="display:none;visibility:hidden;"
        >
        </iframe>
      </noscript>

      {/* Rest of Preact tree */}
      <ctx.Component />

      {/* Include service worker */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
      />
    </>
  );
});
