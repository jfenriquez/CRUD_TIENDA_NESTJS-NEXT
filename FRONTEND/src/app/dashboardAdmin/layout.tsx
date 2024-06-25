import type { Metadata, Viewport } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Drawer from "@/components/Drawer";
import { memo, useMemo } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Drawer>{children}</Drawer>
    </section>
  );
}
export default Layout;
