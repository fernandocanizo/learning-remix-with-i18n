import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useChangeLanguage } from "remix-i18next";
import { useTranslation } from "react-i18next";

import i18next from "~/services/i18next.server.js";

import {
  useLoaderData,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";


export async function loader({ request }: LoaderFunctionArgs) {
  let locale = await i18next.getLocale(request);
  return json({ locale });
}

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common",
};

export default function Root() {
  // Get the locale from the loader
  let { locale } = useLoaderData<typeof loader>();

  let { i18n, t } = useTranslation();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Test localization</h1>
        <ul>
          <li>
            <strong>chooseLanguage:</strong><span>&nbsp;{t('login.chooseLanguage')}</span>
          </li>
          <li>
            <strong>nameOrEmail:</strong><span>&nbsp;{t('login.nameOrEmail')}</span>
          </li>
          <li>
            <strong>password:</strong><span>&nbsp;{t('login.password')}</span>
          </li>
          <li>
            <strong>login:</strong><span>&nbsp;{t('login.login')}</span>
          </li>
          <li>
            <strong>some.deep.translation:</strong><span>&nbsp;{t('some.deep.translation')}</span>
          </li>
        </ul>

        <hr />
        <p>What's below comes from index route</p>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
