# Script to push MCP-related files to nexflow-smf-public repo
# This creates a clean commit with only MCP/OpenAPI/docs files

Write-Host "🚀 Preparing MCP files for public repo..." -ForegroundColor Cyan

# List of files/directories to include in public repo
$mcpFiles = @(
    "server.json",
    ".github/workflows/mcp-registry-publish.yml",
    "scripts/validate-mcp-server.ts",
    "mcp/",
    "openapi/",
    "docs-snippets/",
    "examples/agents/",
    "src/types/smf-api.ts",
    "src/types/webhooks.ts",
    "package.json"  # Will need to filter scripts
)

Write-Host "✅ Files identified for public repo" -ForegroundColor Green
Write-Host ""
Write-Host "To push to public repo, run:" -ForegroundColor Yellow
Write-Host "  1. git checkout -b public-mcp-release" -ForegroundColor White
Write-Host "  2. git checkout public/main -- ." -ForegroundColor White
Write-Host "  3. git checkout main -- server.json mcp/ openapi/ docs-snippets/ examples/agents/ scripts/validate-mcp-server.ts .github/workflows/mcp-registry-publish.yml" -ForegroundColor White
Write-Host "  4. git add ." -ForegroundColor White
Write-Host "  5. git commit -m 'feat(mcp): add SMF MCP server v1.0.0'" -ForegroundColor White
Write-Host "  6. git tag v1.0.0" -ForegroundColor White
Write-Host "  7. git push public public-mcp-release" -ForegroundColor White
Write-Host "  8. git push public v1.0.0" -ForegroundColor White
