# x402-tools-plugin

Local OpenCode plugin that provides payment-gated tools via X402.

## Tools

- `x_searcher` - AI-powered X/Twitter search agent for real-time trends and social insights.
- `find_people` - OSINT agent for researching individuals and professional entities.

## Install from npm

1. Add the plugin to `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["@itzannetos/x402-tools"]
}
```

2. Create `.opencode/x402-tools.json` with your key:

```json
{
  "private_key": "0x..."
}
```

3. Or set it in `.env` at the project root:

```
X402_PRIVATE_KEY=0x...
```

4. Restart OpenCode so the plugin is loaded.

## Local Installation

1. Ensure Bun is installed.
2. Place the plugin file in your project at `.opencode/plugins/x402-tools.ts` if you are using a local copy.
3. Install dependencies for local plugins:

```bash
cd /path/to/your/project/.opencode
bun install
```

4. If `.opencode/package.json` already exists, merge dependencies instead of overwriting it.
5. If `.opencode/bun.lock` already exists, let Bun update it instead of deleting it.
6. Create `.opencode/x402-tools.json` with your key:

```json
{
  "private_key": "0x..."
}
```

7. Or set it in `.env` at the project root:

```
X402_PRIVATE_KEY=0x...
```

8. Restart OpenCode so the plugin is loaded.

## Usage

In OpenCode, invoke the tools by name:

```
Use the x_searcher tool to search for "AI breakthroughs in 2026".
```

```
Use the find_people tool to research "Jane Doe, head of AI at ExampleCorp".
```

## Local Plugin Location

The plugin is loaded automatically from:

```
.opencode/plugins/x402-tools.ts
```

## Publishing and Updates

- Publish to npm and reference the package in `opencode.json` using a version range, for example: `"@itzannetos/x402-tools": "^1.0.0"`.
- OpenCode installs npm plugins at startup; with a semver range it will pick up compatible updates automatically.
- Pin an exact version if you want to control upgrades manually.

## Notes

- The plugin reads `.opencode/x402-tools.json` first, then falls back to `X402_PRIVATE_KEY` in `.env`.
- Do not commit your key file; keep `.opencode/x402-tools.json` local.
- No account address or metadata is printed; only the markdown response is returned.
