'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Github } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Overview' },
    { href: '/benchmarks', label: 'Benchmarks' },
    { href: '/architecture', label: 'Architecture' },
    { href: '/tools', label: 'Tools' },
    { href: '/docs/install', label: 'Docs' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
    { href: '/mcp', label: 'MCP' }
  ];

  return (
    <>
      {/* Mobile-only Top Brand Bar */}
      <div className="mobile-header">
        <Link href="/" className="brand">
          <span className="brand-logo">
            <Terminal size={18} className="mr-1 stroke-[2.5]" />
          </span>
          CostAffective
        </Link>
        <a 
          href="https://github.com/okyashgajjar/costaffective-mcp" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mobile-github-btn"
          aria-label="GitHub Repository"
        >
          <Github size={18} />
        </a>
      </div>

      {/* Main Header / Bottom Dock on Mobile */}
      <header className="nav-bar">
        <div className="nav-container">
          <Link href="/" className="brand">
            <span className="brand-logo">
              <Terminal size={20} className="mr-1 stroke-[2.5]" />
            </span>
            CostAffective-MCP
          </Link>
          
          <nav className="nav-links">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              const finalActive = link.href === '/' ? pathname === '/' : isActive;
              
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={finalActive ? "active-link text-primary font-semibold" : ""}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="flex items-center gap-2">
            <a href="https://github.com/okyashgajjar/costaffective-mcp" target="_blank" rel="noopener noreferrer" className="btn btn-github py-1.5 px-3.5 text-xs">
              GitHub <span className="star-badge">★</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

