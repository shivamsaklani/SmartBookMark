"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/store/store";
import { ThemeProvider } from "@/components/theme-provider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </ThemeProvider>
    </Provider>
  );
}