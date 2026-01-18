# Pre-Deployment Verification Script
# Run this script to verify everything works before deploying

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "BGMI Scoreboard - Pre-Deployment Check" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$errors = 0

# Check if we're in the right directory
Write-Host "Checking project structure..." -ForegroundColor Yellow
if (-not (Test-Path "backend") -or -not (Test-Path "frontend")) {
    Write-Host "❌ Error: backend or frontend directory not found" -ForegroundColor Red
    Write-Host "   Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Project structure looks good`n" -ForegroundColor Green

# Check backend package.json
Write-Host "Checking backend configuration..." -ForegroundColor Yellow
if (Test-Path "backend/package.json") {
    $backendPkg = Get-Content "backend/package.json" | ConvertFrom-Json
    if ($backendPkg.engines) {
        Write-Host "✅ Backend has engines field" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Warning: Backend missing engines field" -ForegroundColor Yellow
        $errors++
    }
} else {
    Write-Host "❌ Error: backend/package.json not found" -ForegroundColor Red
    $errors++
}

# Check frontend package.json
Write-Host "Checking frontend configuration..." -ForegroundColor Yellow
if (Test-Path "frontend/package.json") {
    $frontendPkg = Get-Content "frontend/package.json" | ConvertFrom-Json
    if ($frontendPkg.engines) {
        Write-Host "✅ Frontend has engines field" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Warning: Frontend missing engines field" -ForegroundColor Yellow
        $errors++
    }
} else {
    Write-Host "❌ Error: frontend/package.json not found" -ForegroundColor Red
    $errors++
}

# Check for render.yaml
Write-Host "`nChecking deployment configuration..." -ForegroundColor Yellow
if (Test-Path "render.yaml") {
    Write-Host "✅ render.yaml found" -ForegroundColor Green
} else {
    Write-Host "❌ Error: render.yaml not found" -ForegroundColor Red
    $errors++
}

# Check for .env.example
Write-Host "Checking environment configuration..." -ForegroundColor Yellow
if (Test-Path "frontend/.env.example") {
    Write-Host "✅ frontend/.env.example found" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: frontend/.env.example not found" -ForegroundColor Yellow
}

# Check if .env is in gitignore
Write-Host "Checking .gitignore..." -ForegroundColor Yellow
if (Test-Path "frontend/.gitignore") {
    $gitignore = Get-Content "frontend/.gitignore" -Raw
    if ($gitignore -match "\.env") {
        Write-Host "✅ .env is properly ignored" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Warning: .env might not be in .gitignore" -ForegroundColor Yellow
    }
}

# Check Git status
Write-Host "`nChecking Git status..." -ForegroundColor Yellow
try {
    $gitStatus = git status --porcelain 2>&1
    if ($LASTEXITCODE -eq 0) {
        if ($gitStatus) {
            Write-Host "⚠️  Warning: You have uncommitted changes" -ForegroundColor Yellow
            Write-Host "   Run 'git status' to see changes" -ForegroundColor Yellow
        } else {
            Write-Host "✅ All changes committed" -ForegroundColor Green
        }
    } else {
        Write-Host "⚠️  Warning: Not a git repository" -ForegroundColor Yellow
        Write-Host "   Run 'git init' to initialize" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Warning: Git not found or not initialized" -ForegroundColor Yellow
}

# Test backend build
Write-Host "`nTesting backend..." -ForegroundColor Yellow
Write-Host "Checking if backend dependencies are installed..." -ForegroundColor Gray
if (Test-Path "backend/node_modules") {
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: Backend dependencies not installed" -ForegroundColor Yellow
    Write-Host "   Run 'cd backend && npm install'" -ForegroundColor Yellow
    $errors++
}

# Test frontend build
Write-Host "`nTesting frontend..." -ForegroundColor Yellow
Write-Host "Checking if frontend dependencies are installed..." -ForegroundColor Gray
if (Test-Path "frontend/node_modules") {
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: Frontend dependencies not installed" -ForegroundColor Yellow
    Write-Host "   Run 'cd frontend && npm install'" -ForegroundColor Yellow
    $errors++
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

if ($errors -eq 0) {
    Write-Host "🎉 All checks passed! Ready for deployment!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "1. Push to GitHub: git push origin main" -ForegroundColor White
    Write-Host "2. Go to Render Dashboard" -ForegroundColor White
    Write-Host "3. Create new Blueprint" -ForegroundColor White
    Write-Host "4. Connect your repository" -ForegroundColor White
    Write-Host "`nSee QUICKSTART.md for detailed instructions`n" -ForegroundColor Gray
} else {
    Write-Host "⚠️  Found $errors issue(s)" -ForegroundColor Yellow
    Write-Host "Please fix the issues above before deploying`n" -ForegroundColor Yellow
}

Write-Host "For detailed deployment guide, see:" -ForegroundColor Cyan
Write-Host "- QUICKSTART.md (Quick 3-step guide)" -ForegroundColor White
Write-Host "- DEPLOYMENT.md (Detailed instructions)" -ForegroundColor White
Write-Host "- DEPLOYMENT_CHECKLIST.md (Step-by-step checklist)`n" -ForegroundColor White
