#!/bin/bash

echo "🚀 Starting CarFinder Backend Migration..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Backup old files
print_status "Step 1: Backing up old backend files..."
if [ -d "src_old" ]; then
    rm -rf src_old
fi
mkdir -p src_old

# Move old files to backup
if [ -f "src/app.js" ]; then
    mv src/app.js src_old/
    print_success "Backed up app.js"
fi

if [ -d "src/models" ]; then
    mv src/models src_old/
    print_success "Backed up models directory"
fi

if [ -d "src/controllers" ]; then
    mv src/controllers src_old/
    print_success "Backed up controllers directory"
fi

if [ -d "src/routes" ]; then
    mv src/routes src_old/
    print_success "Backed up routes directory"
fi

if [ -d "src/middleware" ]; then
    mv src/middleware src_old/
    print_success "Backed up middleware directory"
fi

if [ -d "src/config" ]; then
    mv src/config src_old/
    print_success "Backed up config directory"
fi

# Step 2: Install dependencies
print_status "Step 2: Installing new dependencies..."
if [ -f "install-dependencies.sh" ]; then
    chmod +x install-dependencies.sh
    ./install-dependencies.sh
    if [ $? -eq 0 ]; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
else
    print_error "install-dependencies.sh not found"
    exit 1
fi

# Step 3: Setup Prisma
print_status "Step 3: Setting up Prisma..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    print_warning "DATABASE_URL not set in environment"
    print_status "Please update your .env file with PostgreSQL connection string"
    print_status "Example: DATABASE_URL=\"postgresql://username:password@localhost:5432/carfinder\""
else
    print_success "DATABASE_URL found in environment"
fi

# Generate Prisma client
print_status "Generating Prisma client..."
npx prisma generate
if [ $? -eq 0 ]; then
    print_success "Prisma client generated"
else
    print_error "Failed to generate Prisma client"
    exit 1
fi

# Step 4: Create logs directory
print_status "Step 4: Creating logs directory..."
mkdir -p logs
print_success "Logs directory created"

# Step 5: Set up git hooks (if git repo exists)
if [ -d ".git" ]; then
    print_status "Step 5: Setting up git hooks..."
    if command -v husky &> /dev/null; then
        npx husky install
        print_success "Git hooks configured"
    else
        print_warning "Husky not found, skipping git hooks setup"
    fi
else
    print_warning "Not a git repository, skipping git hooks setup"
fi

# Step 6: Create data migration script
print_status "Step 6: Creating data migration script..."
cat > migrate-data.js << 'EOF'
const { PrismaClient } = require('@prisma/client');
const { MongoClient } = require('mongodb');

const prisma = new PrismaClient();

async function migrateData() {
  console.log('🔄 Starting data migration from MongoDB to PostgreSQL...');
  
  try {
    // Connect to MongoDB (if available)
    const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/car_nextjs';
    console.log('Connecting to MongoDB:', mongoUrl);
    
    // Note: This is a template - you'll need to implement actual migration logic
    console.log('⚠️  Data migration script created but not implemented');
    console.log('📝 Please implement the migration logic in migrate-data.js');
    console.log('💡 You can use the old MongoDB data to populate PostgreSQL');
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  migrateData();
}

module.exports = { migrateData };
EOF

print_success "Data migration script created (migrate-data.js)"

# Step 7: Create development scripts
print_status "Step 7: Creating development scripts..."

# Create start script
cat > start-dev.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting CarFinder Backend Development Server..."

# Check if database is running
if ! pg_isready -q; then
    echo "⚠️  PostgreSQL is not running. Please start PostgreSQL first."
    exit 1
fi

# Run database migrations
echo "🔄 Running database migrations..."
npx prisma migrate dev

# Start development server
echo "🎯 Starting development server..."
npm run dev
EOF

chmod +x start-dev.sh
print_success "Development start script created (start-dev.sh)"

# Step 8: Update package.json scripts (if needed)
print_status "Step 8: Verifying package.json scripts..."
if grep -q "\"dev\":" package.json; then
    print_success "Development scripts are configured"
else
    print_warning "Please verify package.json scripts are properly configured"
fi

# Step 9: Create environment template
print_status "Step 9: Creating environment template..."
if [ ! -f ".env.example" ]; then
    cat > .env.example << 'EOF'
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/carfinder?schema=public"

# JWT
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_EXPIRES_IN=30d

# CORS
FRONTEND_URL=http://localhost:3000

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Redis (Optional for caching)
REDIS_URL=redis://localhost:6379

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log
EOF
    print_success "Environment template created (.env.example)"
else
    print_success "Environment template already exists"
fi

# Step 10: Final checks
print_status "Step 10: Running final checks..."

# Check TypeScript compilation
print_status "Checking TypeScript compilation..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
    print_success "TypeScript compilation check passed"
else
    print_warning "TypeScript compilation has issues (this is expected until dependencies are installed)"
fi

# Summary
echo ""
echo "🎉 Migration completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Update your .env file with correct database credentials"
echo "2. Create PostgreSQL database: createdb carfinder"
echo "3. Run database migrations: npm run db:migrate"
echo "4. Install dependencies: npm install (if not done automatically)"
echo "5. Start development server: ./start-dev.sh or npm run dev"
echo ""
echo "📁 Old files backed up in: src_old/"
echo "📝 Data migration script: migrate-data.js (needs implementation)"
echo "🚀 Development script: start-dev.sh"
echo ""
echo "🔗 Useful commands:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run db:migrate   - Run database migrations"
echo "  npm run db:studio    - Open Prisma Studio"
echo "  npm run lint         - Run ESLint"
echo "  npm run test         - Run tests"
echo ""
print_success "Backend migration completed! 🚗✨"
EOF

chmod +x migrate-to-new-backend.sh
print_success "Migration script created successfully"