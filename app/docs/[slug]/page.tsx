import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, BookOpen, Terminal, Code, Settings, AlertTriangle } from 'lucide-react';

export function generateStaticParams() {
  return [
    { slug: 'install' },
    { slug: 'opencode' },
    { slug: 'codex' },
    { slug: 'claude-code' },
    { slug: 'cursor' },
    { slug: 'antigravity' },
    { slug: 'troubleshooting' }
  ];
}

interface DocDetail {
  slug: string;
  title: string;
  category: string;
  description: string;
  contentHtml: string;
}

const DOCS: Record<string, DocDetail> = {
  'install': {
    slug: 'install',
    title: 'Installation Guide & CLI Commands',
    category: 'Getting Started',
    description: 'Detailed installation methods for Windows, macOS, and Linux variants, along with CLI commands and diagnostics.',
    contentHtml: `
      <h3>Introduction</h3>
      <p>CostAffective-MCP runs as a local native Go binary. It maps your codebase's AST symbols, function call-graphs, and references into a local SQLite database. It interfaces with your IDE or CLI coding agent using standard Input/Output (stdio) streams.</p>

      <h3>1. Linux Installation (Variants)</h3>
      
      <h4>Variant A: Automated Installer Script (amd64 & arm64)</h4>
      <p>The recommended way to install on modern Linux distributions. It automatically checks for Go and C compiler dependencies, builds from source, and registers with your AI clients:</p>
      <pre><code>curl -fsSL https://raw.githubusercontent.com/okyashgajjar/costaffective-mcp/main/install.sh | bash</code></pre>
      
      <h4>Variant B: Debian / Ubuntu Manual Build</h4>
      <p>Install system build dependencies and compile the binary manually:</p>
      <pre><code># Install Go compiler and gcc (required for CGO Tree-sitter bindings)
sudo apt update && sudo apt install -y golang-go gcc git

# Build and verify
git clone https://github.com/okyashgajjar/costaffective-mcp.git
cd costaffective-mcp
CGO_ENABLED=1 go build -o ~/.local/bin/costaffective ./cmd/costaffective
chmod +x ~/.local/bin/costaffective
costaffective --version</code></pre>

      <h4>Variant C: Alpine Linux Build</h4>
      <p>Alpine requires specific compilation environment setups to accommodate musl libc and native build tooling:</p>
      <pre><code># Install build dependencies
apk add --no-cache go build-base git

# Clone and compile
git clone https://github.com/okyashgajjar/costaffective-mcp.git
cd costaffective-mcp
CGO_ENABLED=1 go build -o ~/.local/bin/costaffective ./cmd/costaffective</code></pre>

      <h4>Variant D: RHEL / Fedora / CentOS Build</h4>
      <p>For Red Hat family distributions, configure using <code>dnf</code>:</p>
      <pre><code>sudo dnf install -y golang gcc git
git clone https://github.com/okyashgajjar/costaffective-mcp.git
cd costaffective-mcp
CGO_ENABLED=1 go build -o ~/.local/bin/costaffective ./cmd/costaffective</code></pre>

      <h3>2. macOS Installation (Variants)</h3>
      
      <h4>Variant A: Automated Shell Script (Intel & Apple Silicon)</h4>
      <p>Run the automated script inside your macOS Terminal to set up paths and config targets:</p>
      <pre><code>curl -fsSL https://raw.githubusercontent.com/okyashgajjar/costaffective-mcp/main/install.sh | bash</code></pre>
      
      <h4>Variant B: Apple Silicon (M1 / M2 / M3 / M4 arm64) Manual Build</h4>
      <p>Ensure you have Xcode Command Line Tools installed (<code>xcode-select --install</code>). Build natively targeting ARM64 architecture:</p>
      <pre><code># Build targeting local ARM64 arch
git clone https://github.com/okyashgajjar/costaffective-mcp.git
cd costaffective-mcp
CGO_ENABLED=1 GOOS=darwin GOARCH=arm64 go build -o ~/.local/bin/costaffective ./cmd/costaffective
chmod +x ~/.local/bin/costaffective</code></pre>

      <h4>Variant C: macOS Intel (amd64) Manual Build</h4>
      <p>Compile natively targeting Intel x86_64 architecture:</p>
      <pre><code>git clone https://github.com/okyashgajjar/costaffective-mcp.git
cd costaffective-mcp
CGO_ENABLED=1 GOOS=darwin GOARCH=amd64 go build -o ~/.local/bin/costaffective ./cmd/costaffective
chmod +x ~/.local/bin/costaffective</code></pre>

      <h3>3. Windows Installation (Variants)</h3>
      
      <h4>Variant A: Windows Subsystem for Linux (WSL) - Recommended</h4>
      <p>For the best performance and CGO compiling environment, install Ubuntu under WSL and run the quick installer script:</p>
      <pre><code># In PowerShell (run as Administrator to set up WSL):
wsl --install

# Once inside WSL (Ubuntu), run the shell installer:
curl -fsSL https://raw.githubusercontent.com/okyashgajjar/costaffective-mcp/main/install.sh | bash</code></pre>

      <h4>Variant B: Native PowerShell Build (Requires Go + gcc)</h4>
      <p>To run natively on Windows without WSL, you must have Go 1.25+ and a gcc compiler (such as MinGW-w64) installed and configured in your environment PATH:</p>
      <pre><code># In PowerShell:
git clone https://github.com/okyashgajjar/costaffective-mcp.git
cd costaffective-mcp
$env:CGO_ENABLED=1
go build -o costaffective.exe ./cmd/costaffective/
Move-Item costaffective.exe C:\\Users\\$env:USERNAME\\.local\\bin\\</code></pre>

      <h3>4. CLI Utility Commands</h3>
      <p>Once the binary is built, use these utility flags to manage and repair client configurations:</p>
      <pre><code># Run interactive auto-installer (detects and configures clients)
costaffective install

# Configure all detected clients automatically without prompts
costaffective install --all

# Configure a specific editor target
costaffective install --target cursor
costaffective install --target claude

# Rebuild the binary from source before configuring clients
costaffective install --build

# Install without the session-awareness skill
costaffective install --no-skill

# Run idempotent repair mode (fixes broken paths/configs)
costaffective install --repair</code></pre>

      <h3>5. Session-Awareness Skill</h3>
      <p>Installation also adds the costaffective-session skill, which teaches your editor to keep sessions lean (stash large output, recall only what is needed, remember durable facts). Every MCP client receives this guidance automatically through the server. You can also manage the native skill file directly:</p>
      <pre><code># Write the Claude Code skill (also runs during install)
costaffective skill install

# Write it into the current project only
costaffective skill install --local

# Remove it
costaffective skill uninstall

# Print the guidance for manual placement in any tool
costaffective skill print</code></pre>

      <h3>6. Diagnostics with Doctor Command</h3>
      <p>Verify that the installation is intact and all IDE configurations are running with correct absolute binary paths:</p>
      <pre><code>costaffective doctor</code></pre>
      
      <h4>Diagnostics Output Structure:</h4>
      <pre><code>CostAffective Doctor

PASS Binary Found
       ~/.local/bin/costaffective
PASS Binary Permissions
PASS Binary Version
       costaffective version 1.0.0
PASS Binary in PATH
       /home/user/.local/bin/costaffective
PASS Cursor Config
       ~/.cursor/mcp.json
PASS OpenCode Config
       ~/.config/opencode/opencode.jsonc
PASS Antigravity / Gemini Config
       ~/.gemini/antigravity/mcp_config.json
PASS MCP Startup
       Server responds to JSON-RPC initialize
PASS Repository
       /home/user/project
PASS Index Directory
       /home/user/project/.mycli-fts

Results: 10 PASS, 0 WARN, 0 FAIL
Status: READY</code></pre>

      <div class="my-6 p-4 border-l-4 border-amber-500 bg-amber-500/5 text-xs text-light rounded-r">
        <strong>Important Schema Design:</strong> CostAffective strictly uses absolute paths for server executables in client configurations. This avoids reliance on user shell PATH variables which often fail to load correctly inside editor subprocesses.
      </div>
    `
  },
  'opencode': {
    slug: 'opencode',
    title: 'OpenCode Integration',
    category: 'Integrations',
    description: 'Setup guide for integrating CostAffective into the OpenCode assistant platform.',
    contentHtml: `
      <h3>OpenCode Configuration</h3>
      <p>OpenCode loads MCP servers using local JSON schemas. Locate your workspace configurations and add CostAffective to the active server mappings.</p>
      
      <h3>Configuration Block</h3>
      <p>Locate or create your configuration file at: <code>~/.config/opencode/opencode.jsonc</code>.</p>
      <p>Add the following settings block to register the absolute binary path:</p>
      <pre><code>{
  "mcpServers": {
    "costaffective": {
      "command": "/home/user/.local/bin/costaffective",
      "args": ["serve"],
      "enabled": true
    }
  }
}</code></pre>
      
      <h3>Launch & Verify</h3>
      <p>Restart the OpenCode workspace. Check the logs window to confirm that the server stdio channel has resolved connection pointers successfully.</p>
    `
  },
  'codex': {
    slug: 'codex',
    title: 'Codex CLI Integration',
    category: 'Integrations',
    description: 'Integrate the local indexer with Codex developer models.',
    contentHtml: `
      <h3>Codex CLI Configuration</h3>
      <p>Codex reads local context mappings to populate agent prompt memories. Adding CostAffective ensures Codex is provided with token-compressed AST files instead of raw directory listings.</p>
      
      <h3>Profile Mapping</h3>
      <p>Add the server to your Codex client configurations at <code>~/.codex/config.toml</code>:</p>
      <pre><code>[mcp.servers.costaffective]
command = "/home/user/.local/bin/costaffective"
args = ["serve"]</code></pre>
    `
  },
  'claude-code': {
    slug: 'claude-code',
    title: 'Claude Code Setup',
    category: 'Integrations',
    description: 'Add CostAffective to Claude Code CLI configurations for prompt token reductions.',
    contentHtml: `
      <h3>Claude Code CLI Setup</h3>
      <p>Claude Code uses the global user configuration profile located at <code>~/.claude.json</code> to launch MCP subprocesses during tasks.</p>
      
      <h3>Step-by-Step Integration</h3>
      <ol>
        <li>Locate the config file at <code>~/.claude.json</code>. If it does not exist, create an empty JSON file.</li>
        <li>Inject the CostAffective server block inside the <code>mcpServers</code> dictionary using absolute binary paths:</li>
      </ol>
      <pre><code>{
  "mcpServers": {
    "costaffective": {
      "command": "/home/user/.local/bin/costaffective",
      "args": ["serve"]
    }
  }
}</code></pre>
      
      <h3>Verify Tools Discovery</h3>
      <p>Run Claude Code in your terminal. You can check that the CostAffective tools are registered successfully by running:</p>
      <pre><code># Inside Claude Code shell
/tools</code></pre>
    `
  },
  'cursor': {
    slug: 'cursor',
    title: 'Cursor IDE Integration',
    category: 'Integrations',
    description: 'Inject CostAffective MCP tools into Cursor settings.',
    contentHtml: `
      <h3>Cursor IDE Configuration</h3>
      <p>Cursor supports external MCP servers natively through its Settings tab. This allows Cursor\'s Composer agent to query SQLite codebase tables dynamically.</p>
      
      <h3>Add New Tool Helper</h3>
      <ol>
        <li>Open Cursor, navigate to <strong>Settings > Features > MCP</strong>.</li>
        <li>Click <strong>+ Add New MCP Server</strong>.</li>
        <li>Configure the popup parameters:
          <ul>
            <li><strong>Name:</strong> <code>costaffective</code></li>
            <li><strong>Type:</strong> <code>stdio</code></li>
            <li><strong>Command:</strong> <code>/home/user/.local/bin/costaffective serve</code></li>
          </ul>
        </li>
        <li>Click Save. Confirm the status light turns green.</li>
      </ol>
    `
  },
  'antigravity': {
    slug: 'antigravity',
    title: 'Antigravity / Gemini Integration',
    category: 'Integrations',
    description: 'Register the server in the Antigravity developer environment.',
    contentHtml: `
      <h3>Antigravity Setup</h3>
      <p>Antigravity and other Gemini-based agents configure local tool endpoints via an active configuration structure.</p>
      
      <h3>Configuration Details</h3>
      <p>Configure the server by editing your tool configuration file at: <code>~/.gemini/config/mcp_config.json</code>.</p>
      <pre><code>{
  "mcpServers": {
    "costaffective": {
      "command": "/home/user/.local/bin/costaffective",
      "args": ["serve"]
    }
  }
}</code></pre>
      
      <h3>Testing Live Tools</h3>
      <p>Initiate a session using the agent interface to confirm tool definitions are synchronized.</p>
    `
  },
  'troubleshooting': {
    slug: 'troubleshooting',
    title: 'Common Failures & Remediation Actions',
    category: 'Maintenance',
    description: 'Diagnose compilation blocks, folder permission boundaries, stale configurations, and runtime timeouts.',
    contentHtml: `
      <h3>Installation Failure Matrices</h3>
      <p>Review the exact errors encountered during setup, along with detailed remedies to fix them:</p>

      <table className="w-full border-collapse border border-[#E5E5E0] text-xs font-sans my-6">
        <thead>
          <tr className="bg-[#FAF9F6]">
            <th className="border border-[#E5E5E0] p-2 text-left font-serif font-bold">Error / Issue</th>
            <th className="border border-[#E5E5E0] p-2 text-left font-serif font-bold">Detection Logs</th>
            <th className="border border-[#E5E5E0] p-2 text-left font-serif font-bold">Remedy / Action Plan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-[#E5E5E0] p-2 font-semibold">Go not installed</td>
            <td className="border border-[#E5E5E0] p-2 font-mono">"build failed: exec: 'go': executable file not found in $PATH"</td>
            <td className="border border-[#E5E5E0] p-2">CostAffective installer compiles code from source. Run <code>sudo apt install golang-go</code> or download Go from golang.org.</td>
          </tr>
          <tr className="bg-[#FAF9F6]/20">
            <td className="border border-[#E5E5E0] p-2 font-semibold">Binary folder missing</td>
            <td className="border border-[#E5E5E0] p-2 font-mono">"CostAffective was not installed to ~/.local/bin/costaffective"</td>
            <td className="border border-[#E5E5E0] p-2">Your system is missing the local binary bin folder. Run: <code>mkdir -p ~/.local/bin</code> and verify writing permissions.</td>
          </tr>
          <tr>
            <td className="border border-[#E5E5E0] p-2 font-semibold">Binary not executable</td>
            <td className="border border-[#E5E5E0] p-2 font-mono">"exists but is not executable"</td>
            <td className="border border-[#E5E5E0] p-2">Executable bit is missing. Fix via <code>chmod +x ~/.local/bin/costaffective</code> or run <code>costaffective install --repair</code>.</td>
          </tr>
          <tr className="bg-[#FAF9F6]/20">
            <td className="border border-[#E5E5E0] p-2 font-semibold">Binary corrupted</td>
            <td className="border border-[#E5E5E0] p-2 font-mono">"did not respond to --version"</td>
            <td className="border border-[#E5E5E0] p-2">Binary did not execute cleanly. Run <code>costaffective install --repair</code> to trigger a clean rebuild.</td>
          </tr>
          <tr>
            <td className="border border-[#E5E5E0] p-2 font-semibold">Relative binary path</td>
            <td className="border border-[#E5E5E0] p-2 font-mono">"uses a relative binary path"</td>
            <td className="border border-[#E5E5E0] p-2">Subprocesses launched by editors require absolute paths. Run <code>costaffective install --repair</code> to write absolute paths into configs.</td>
          </tr>
          <tr className="bg-[#FAF9F6]/20">
            <td className="border border-[#E5E5E0] p-2 font-semibold">Invalid JSON config</td>
            <td className="border border-[#E5E5E0] p-2 font-mono">"Invalid JSON in ~/.cursor/mcp.json"</td>
            <td className="border border-[#E5E5E0] p-2">Cursor config is corrupted. Re-run <code>costaffective install --repair</code> to rebuild the config structure.</td>
          </tr>
          <tr>
            <td className="border border-[#E5E5E0] p-2 font-semibold">MCP Handshake Failure</td>
            <td className="border border-[#E5E5E0] p-2 font-mono">"Server did not respond to initialize"</td>
            <td className="border border-[#E5E5E0] p-2">Verify binary launch works outside the IDE by running <code>costaffective serve</code>. If it crashes, inspect dynamic library attachments.</td>
          </tr>
          <tr className="bg-[#FAF9F6]/20">
            <td className="border border-[#E5E5E0] p-2 font-semibold">Index Directory Locked</td>
            <td className="border border-[#E5E5E0] p-2 font-mono">"Index directory is not writable"</td>
            <td className="border border-[#E5E5E0] p-2">Your user account does not have write access to the project folder. Run <code>sudo chown -R $USER:$USER .</code> on the workspace directory.</td>
          </tr>
        </tbody>
      </table>

      <h3>Runtime Maintenance</h3>
      
      <h4>Database Sync Locks</h4>
      <p>WAL journaling prevents read/write locks. If the SQLite engine gets locked due to an unexpected IDE exit, delete database locks:</p>
      <pre><code>rm -f .mycli-fts/*.db-journal</code></pre>
      
      <h4>inotify Watch Limits on Linux</h4>
      <p>If you index large repositories and hit system file watcher limits, increase max watches:</p>
      <pre><code>echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p</code></pre>
    `
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const doc = DOCS[slug];
  if (!doc) return { title: 'Doc Not Found' };
  
  return {
    title: `${doc.title} | Developer Documentation`,
    description: doc.description,
  };
}

export default async function DocDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = DOCS[slug];
  if (!doc) {
    notFound();
  }

  const sidebarItems = [
    { title: 'Getting Started', items: [{ slug: 'install', label: 'Installation & Commands' }] },
    { title: 'IDE Integrations', items: [
      { slug: 'cursor', label: 'Cursor IDE' },
      { slug: 'claude-code', label: 'Claude Code' },
      { slug: 'opencode', label: 'OpenCode' },
      { slug: 'codex', label: 'Codex' },
      { slug: 'antigravity', label: 'Antigravity / Gemini' }
    ] },
    { title: 'Support', items: [{ slug: 'troubleshooting', label: 'Troubleshooting' }] }
  ];

  const docSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': doc.title,
    'description': doc.description,
    'articleSection': doc.category,
    'author': {
      '@type': 'Organization',
      'name': 'CostAffective Dev Rel Team'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(docSchema) }}
      />

      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Unified Documentation Sidebar */}
        <aside className="md:col-span-1 border-r border-[#E5E5E0] pr-6 h-full space-y-6">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-charcoal mb-4">
            <BookOpen size={18} className="text-primary" />
            <span>Developer Docs</span>
          </div>
          {sidebarItems.map((group) => (
            <div key={group.title}>
              <h4 className="text-[10px] uppercase font-bold text-grey mb-2 tracking-wider">{group.title}</h4>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <Link 
                      href={`/docs/${item.slug}`}
                      className={`block text-xs py-1.5 px-2.5 rounded transition ${slug === item.slug ? 'bg-primary-glow text-primary font-semibold' : 'text-light hover:text-charcoal hover:bg-neutral-50'}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Documentation Content Area */}
        <article className="md:col-span-3 prose max-w-full text-charcoal">
          <span className="text-[10px] uppercase font-bold text-grey">{doc.category}</span>
          <h1 className="font-serif font-bold text-3xl text-charcoal mt-1 mb-4">{doc.title}</h1>
          <p className="text-light text-sm italic mb-8 border-b pb-4">{doc.description}</p>
          
          <div 
            className="docs-content text-sm text-light space-y-6 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
          />
        </article>
      </section>
    </>
  );
}
