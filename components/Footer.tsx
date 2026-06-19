import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h4>CostAffective-MCP</h4>
          <p className="text-light mt-2">
            Local-first, deterministic repository intelligence and AST-based semantic code retrieval server, designed to optimize context sizes and token expenses for modern AI coding agents.
          </p>
        </div>
        <div className="footer-links">
          <div className="link-group">
            <h5>Product</h5>
            <Link href="/vision">Vision</Link>
            <Link href="/architecture">Architecture</Link>
            <Link href="/tools">MCP Tools</Link>
            <Link href="/mcp">MCP Specs</Link>
          </div>
          <div className="link-group">
            <h5>Guides</h5>
            <Link href="/docs/install">Installation</Link>
            <Link href="/docs/claude-code">Claude Code</Link>
            <Link href="/docs/cursor">Cursor Setup</Link>
            <Link href="/faq">FAQ</Link>
          </div>
          <div className="link-group">
            <h5>Developer</h5>
            <a href="https://github.com/okyashgajjar" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/okyashgajjar" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://x.com/okyashgajjar" target="_blank" rel="noopener noreferrer">X / Twitter</a>
            <a href="https://huggingface.co/okyashgajjar" target="_blank" rel="noopener noreferrer">HuggingFace</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div>
          © {new Date().getFullYear()} CostAffective-MCP. Open Source under the MIT License.
        </div>
        <div className="tagline">
          Save tokens. Buy Coffee.
        </div>
      </div>
    </footer>
  );
}
