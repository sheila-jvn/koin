import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@vercel/remix";

// Fonts
import "@fontsource-variable/plus-jakarta-sans/wght.css";

// Mantine
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import { resolver, theme } from "./theme/theme";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript forceColorScheme="dark" />
      </head>
      <body>
        <MantineProvider
          theme={theme}
          cssVariablesResolver={resolver}
          forceColorScheme="dark"
        >
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  );
}
