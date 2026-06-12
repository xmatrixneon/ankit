'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CouponCodeProps {
  code: string | null;
}

export function CouponCode({ code }: CouponCodeProps) {
  const [copied, setCopied] = useState(false);

  if (!code) {
    return (
      <div className="rounded-lg bg-slate-50 px-4 py-3 text-center">
        <p className="text-sm font-medium text-slate-700">
          No code required — click "Get This Deal" to activate
        </p>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6">
      <div className="flex items-center justify-between gap-4">
        <code className="text-2xl font-mono font-semibold tracking-wider text-slate-900">
          {code}
        </code>
        <Button
          onClick={handleCopy}
          variant={copied ? 'default' : 'outline'}
          className={cn(
            'min-w-[100px]',
            copied && 'bg-emerald-600 hover:bg-emerald-700'
          )}
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
