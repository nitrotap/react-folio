'use client';

import Link from 'next/link';
import { Theme } from '@astryxdesign/core/theme';
import { LinkProvider } from '@astryxdesign/core/Link';
import { ToastViewport } from '@astryxdesign/core/Toast';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Theme theme={neutralTheme}>
      <LinkProvider component={Link}>
        {children}
        {/* Mounted once at the root; useToast() positions, stacks, and
            auto-dismisses through it. */}
        <ToastViewport />
      </LinkProvider>
    </Theme>
  );
}
