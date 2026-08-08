"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Thin wrapper over next-themes so the rest of the app imports a local module,
 * not the dependency directly. It toggles the `.dark` class on <html>, which is
 * exactly what the design tokens in globals.css already key off, so the existing
 * light and dark surfaces work with no change. Preference is persisted by
 * next-themes and applied before paint through its inline script, so there is no
 * flash of the wrong theme on load.
 */

function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export { ThemeProvider };
