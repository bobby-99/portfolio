import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

/* ───── Data ───── */
interface EndpointData {
  path: string;
  data: unknown;
}

const ENDPOINTS: Record<string, EndpointData> = {
  '/about': {
    path: '/api/about',
    data: {
      name: 'Soumyaranjan Dandapat',
      role: 'Backend Engineer',
      focus: ['Java 17', 'Spring Boot 3', 'REST APIs', 'PostgreSQL', 'JWT Auth'],
      education: {
        degree: 'B.Tech CSE (AI & ML)',
        institution: 'Siddharth Institute of Engineering and Technology',
        graduationYear: 2026,
        cgpa: 8.1,
      },
      status: 'Open to junior backend roles',
    },
  },
  '/projects': {
    path: '/api/projects',
    data: [
      {
        name: 'EV-Connect',
        category: 'Backend // Geospatial',
        stack: ['Java 17', 'Spring Boot 3', 'PostgreSQL', 'React 19', 'OSRM'],
        outcome: 'Routes drivers to optimal charging stations using Spring Boot and OSRM distance matrix.',
        liveDemo: 'https://ev-volt-link.vercel.app',
        repo: 'https://github.com/bobby-99/EV-Connect',
      },
      {
        name: 'Wiser',
        category: 'Backend // Auth & Ledger',
        stack: ['Java', 'Spring Boot 3', 'Spring Security', 'PostgreSQL', 'JWT'],
        outcome: 'Secures financial transactions via Spring Security JWT with JPQL category aggregations.',
        repo: 'https://github.com/bobby-99/financial_management_system',
      },
      {
        name: 'VM Interaction via Hand Gestures',
        category: 'Computer Vision // Cloud Control',
        stack: ['Python', 'FastAPI', 'MediaPipe', 'OpenCV', 'AWS EC2/Boto3'],
        outcome: 'Executes programmatic AWS EC2 lifecycle actions from MediaPipe gestures via async FastAPI.',
        repo: 'https://github.com/bobby-99/Gesture_Control',
      },
    ],
  },
  '/skills': {
    path: '/api/skills',
    data: {
      backend: ['Core Java', 'Spring Boot 3', 'Hibernate/JPA', 'REST APIs', 'PostgreSQL', 'SQL'],
      frontend: ['React', 'Tailwind CSS'],
      toolsAndCloud: ['Docker', 'AWS', 'Maven', 'Git'],
    },
  },
  '/contact': {
    path: '/api/contact',
    data: {
      email: 'soumyaranjan.bobby@gmail.com',
      phone: '+91 6302753005',
      github: 'https://github.com/bobby-99',
      linkedin: 'https://www.linkedin.com/in/soumyaranjan-bobby/',
      resume: 'https://drive.google.com/file/d/1ct11LkcfZNVKCYdC24xRfGa8VRi3jPxg/view',
    },
  },
};

/* ───── Compact JSON formatter ───── */
// Formats short string arrays onto a single line; objects and object arrays stay expanded
function isShortStringArray(arr: unknown[]): boolean {
  return arr.length > 0 && arr.every((v) => typeof v === 'string');
}

function compactStringify(data: unknown, indent = 0): string {
  const pad = '  '.repeat(indent);
  const padInner = '  '.repeat(indent + 1);

  if (data === null) return 'null';
  if (typeof data === 'boolean') return String(data);
  if (typeof data === 'number') return String(data);
  if (typeof data === 'string') return JSON.stringify(data);

  if (Array.isArray(data)) {
    if (data.length === 0) return '[]';
    // Short string arrays on one line (e.g. "backend": ["Core Java", ...])
    if (isShortStringArray(data)) {
      const inner = data.map((v) => JSON.stringify(v)).join(', ');
      return `[${inner}]`;
    }
    const items = data.map((v) => `${padInner}${compactStringify(v, indent + 1)}`);
    return `[\n${items.join(',\n')}\n${pad}]`;
  }

  if (typeof data === 'object') {
    const entries = Object.entries(data as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    const items = entries.map(
      ([k, v]) => `${padInner}${JSON.stringify(k)}: ${compactStringify(v, indent + 1)}`
    );
    return `{\n${items.join(',\n')}\n${pad}}`;
  }

  return String(data);
}

/* ───── Hand-written tokenizer for syntax coloring ───── */
interface Token {
  type: 'key' | 'string' | 'number' | 'boolean' | 'null' | 'punctuation';
  value: string;
}

function tokenize(jsonLine: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < jsonLine.length) {
    const ch = jsonLine[i];

    // Whitespace (indentation, spaces)
    if (/\s/.test(ch)) {
      let ws = '';
      while (i < jsonLine.length && /\s/.test(jsonLine[i])) {
        ws += jsonLine[i];
        i++;
      }
      tokens.push({ type: 'punctuation', value: ws });
      continue;
    }

    // String
    if (ch === '"') {
      let str = '"';
      i++;
      while (i < jsonLine.length && jsonLine[i] !== '"') {
        if (jsonLine[i] === '\\') {
          str += jsonLine[i] + (jsonLine[i + 1] || '');
          i += 2;
        } else {
          str += jsonLine[i];
          i++;
        }
      }
      str += '"';
      i++;

      // Check if this is a key (next non-whitespace char is ':')
      let j = i;
      while (j < jsonLine.length && /\s/.test(jsonLine[j])) j++;
      if (jsonLine[j] === ':') {
        tokens.push({ type: 'key', value: str });
      } else {
        tokens.push({ type: 'string', value: str });
      }
      continue;
    }

    // Number
    if (/[-0-9]/.test(ch)) {
      let num = '';
      while (i < jsonLine.length && /[0-9.eE\-+]/.test(jsonLine[i])) {
        num += jsonLine[i];
        i++;
      }
      tokens.push({ type: 'number', value: num });
      continue;
    }

    // Booleans / null
    if (jsonLine.slice(i, i + 4) === 'true') {
      tokens.push({ type: 'boolean', value: 'true' });
      i += 4;
      continue;
    }
    if (jsonLine.slice(i, i + 5) === 'false') {
      tokens.push({ type: 'boolean', value: 'false' });
      i += 5;
      continue;
    }
    if (jsonLine.slice(i, i + 4) === 'null') {
      tokens.push({ type: 'null', value: 'null' });
      i += 4;
      continue;
    }

    // Punctuation: { } [ ] , :
    tokens.push({ type: 'punctuation', value: ch });
    i++;
  }

  return tokens;
}

const COLOR_MAP: Record<Token['type'], string> = {
  key: '#C9C5BC',
  string: '#F5F1EA',
  number: '#FF7A1A',
  boolean: '#FF7A1A',
  null: '#FF7A1A',
  punctuation: '#5F5B55',
};

/* ───── Render tokens with clickable links for URLs & emails ───── */
function isUrl(s: string): boolean {
  return /^"https?:\/\//.test(s);
}

function isEmail(s: string): boolean {
  return /^"[^"]+@[^"]+\.[^"]+"$/.test(s) && !s.includes('://');
}

function renderTokens(tokens: Token[]): React.ReactNode[] {
  return tokens.map((tok, i) => {
    const color = COLOR_MAP[tok.type];

    if (tok.type === 'string') {
      const raw = tok.value.slice(1, -1);
      if (isUrl(tok.value)) {
        return (
          <span key={i}>
            <span style={{ color: COLOR_MAP.punctuation }}>"</span>
            <a
              href={raw}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF7A1A] hover:underline"
              style={{ overflowWrap: 'anywhere' }}
            >
              {raw}
            </a>
            <span style={{ color: COLOR_MAP.punctuation }}>"</span>
          </span>
        );
      }
      if (isEmail(tok.value)) {
        return (
          <span key={i}>
            <span style={{ color: COLOR_MAP.punctuation }}>"</span>
            <a
              href={`mailto:${raw}`}
              className="text-[#FF7A1A] hover:underline"
              style={{ overflowWrap: 'anywhere' }}
            >
              {raw}
            </a>
            <span style={{ color: COLOR_MAP.punctuation }}>"</span>
          </span>
        );
      }
    }

    return (
      <span key={i} style={{ color }}>
        {tok.value}
      </span>
    );
  });
}

/* ───── Main Component ───── */
export default function ApiConsole() {
  const [activeEndpoint, setActiveEndpoint] = useState<string>('/about');
  const [visibleLines, setVisibleLines] = useState<number>(Infinity);
  const [isStreaming, setIsStreaming] = useState(false);
  const [copied, setCopied] = useState(false);
  const streamTimerRef = useRef<number | null>(null);
  const initialLoadRef = useRef(true);
  const endpointKeysRef = useRef(Object.keys(ENDPOINTS));

  const fullJson = useMemo(
    () => compactStringify(ENDPOINTS[activeEndpoint].data),
    [activeEndpoint]
  );
  const lines = useMemo(() => fullJson.split('\n'), [fullJson]);

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Line-by-line reveal (~30ms per line, finished under 700ms)
  useEffect(() => {
    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }

    if (prefersReducedMotion) {
      setVisibleLines(Infinity);
      setIsStreaming(false);
      return;
    }

    const delay = initialLoadRef.current ? 800 : 0;
    initialLoadRef.current = false;

    setVisibleLines(0);
    setIsStreaming(true);

    const totalLines = lines.length;
    const interval = Math.min(30, 680 / totalLines);

    const timeout = window.setTimeout(() => {
      let current = 0;
      streamTimerRef.current = window.setInterval(() => {
        current++;
        if (current >= totalLines) {
          setVisibleLines(Infinity);
          setIsStreaming(false);
          if (streamTimerRef.current) clearInterval(streamTimerRef.current);
        } else {
          setVisibleLines(current);
        }
      }, interval);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    };
  }, [activeEndpoint, lines, prefersReducedMotion]);

  const handleCopyJson = useCallback(() => {
    navigator.clipboard.writeText(fullJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [fullJson]);

  // Arrow key navigation for endpoint chips
  const handleChipKeyDown = useCallback(
    (e: React.KeyboardEvent, idx: number) => {
      const keys = endpointKeysRef.current;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = keys[(idx + 1) % keys.length];
        setActiveEndpoint(next);
        const el = document.querySelector(`[data-endpoint="${next}"]`) as HTMLElement;
        el?.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = keys[(idx - 1 + keys.length) % keys.length];
        setActiveEndpoint(prev);
        const el = document.querySelector(`[data-endpoint="${prev}"]`) as HTMLElement;
        el?.focus();
      }
    },
    []
  );

  // Render visible lines with hanging indent and line gutter
  const renderedLines = useMemo(() => {
    const visible = lines.slice(0, visibleLines === Infinity ? lines.length : visibleLines);
    return visible.map((line, i) => {
      const tokens = tokenize(line);
      return (
        <div key={i} className="flex items-start">
          {/* Line number gutter: 12px, dim, user-select none */}
          <span
            className="select-none text-right shrink-0 text-[#5F5B55] pr-3 text-[12px] pt-[1px]"
            style={{ width: '2.4em' }}
            aria-hidden="true"
          >
            {i + 1}
          </span>
          {/* Content with hanging indent for wrapped lines */}
          <span
            className="pl-4 -indent-4 flex-1 min-w-0"
            style={{ overflowWrap: 'anywhere', whiteSpace: 'pre-wrap' }}
          >
            {renderTokens(tokens)}
            {/* Blinking caret on the last visible line while streaming */}
            {isStreaming && i === visible.length - 1 && <span className="api-caret" />}
          </span>
        </div>
      );
    });
  }, [lines, visibleLines, isStreaming]);

  return (
    <div className="terminal-panel rounded-xl overflow-hidden w-full font-mono text-xs border border-mono-800 bg-[#0d0d11]">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-mono-900/80 border-b border-mono-800/80">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-mono-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-mono-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-mono-700" />
          <span className="text-[11px] text-mono-400 ml-2 flex items-center gap-1.5 font-mono">
            <Terminal className="w-3 h-3 text-accent" />
            api-console
          </span>
        </div>

        {/* Copy JSON: larger target that shows "Copied" for 1.5s */}
        <button
          onClick={handleCopyJson}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-mono-300 hover:text-white transition-colors hover:bg-mono-800/80 min-h-[32px] focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          aria-label={copied ? 'Copied' : 'Copy JSON Response'}
          title="Copy JSON Response"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-accent" />
              <span className="text-[11px] text-accent font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">Copy JSON</span>
            </>
          )}
        </button>
      </div>

      {/* HTTP Request Line + 200 OK Status */}
      <div className="px-4 py-3 bg-[#111116] border-b border-mono-800/70 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-accent/15 text-accent border border-accent/30">
            GET
          </span>
          <span className="text-mono-200 font-mono text-xs tracking-tight">
            {ENDPOINTS[activeEndpoint].path}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            200 OK
          </span>
          <span className="text-mono-400 text-[10px]">application/json</span>
        </div>
      </div>

      {/* Interactive Endpoint Chips (min-height 36px, role=tablist, arrow key navigation) */}
      <div
        className="px-4 py-2.5 bg-mono-950/70 border-b border-mono-800/60 flex flex-wrap gap-2 items-center"
        role="tablist"
        aria-label="API Endpoints"
      >
        <span className="text-mono-400 text-[11px] select-none mr-1">Endpoints:</span>
        {endpointKeysRef.current.map((ep, idx) => {
          const isSelected = activeEndpoint === ep;
          return (
            <button
              key={ep}
              role="tab"
              data-endpoint={ep}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveEndpoint(ep)}
              onKeyDown={(e) => handleChipKeyDown(e, idx)}
              className={`px-3 py-1.5 rounded text-[11px] font-mono min-h-[36px] transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                isSelected
                  ? 'bg-accent/20 text-accent border border-accent/40 font-semibold shadow-xs'
                  : 'bg-mono-900/60 text-mono-300 hover:text-mono-100 hover:bg-mono-800/60 border border-mono-800'
              }`}
            >
              {ep}
            </button>
          );
        })}
      </div>

      {/* JSON Body: JetBrains Mono, 14px desktop / 13px mobile, line-height 1.75, padding 20px 24px (px-6 py-5) */}
      {/* Fixed height sized to tallest response on desktop (no scrollbar); max-height with inner scroll & bottom fade on mobile */}
      <div
        className="px-6 py-5 bg-[#09090c] text-[13px] lg:text-[14px] leading-[1.75] font-mono relative
          max-md:max-h-[340px] max-md:overflow-y-auto terminal-scroll
          md:max-lg:max-h-[500px] md:max-lg:overflow-y-auto
          lg:h-[880px] lg:overflow-y-hidden"
        style={{
          fontFamily: "'JetBrains Mono', Menlo, Consolas, monospace",
        }}
      >
        {/* Mobile bottom fade */}
        <div className="md:hidden sticky bottom-0 left-0 right-0 h-8 -mb-5 bg-gradient-to-t from-[#09090c] to-transparent pointer-events-none z-10" />

        <code className="block">
          {renderedLines}
        </code>
      </div>
    </div>
  );
}
