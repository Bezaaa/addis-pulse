FROM node:20-slim

# 1. Install system dependencies
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# 2. Copy package files
COPY package*.json ./

# 3. Copy Prisma schema first
COPY prisma ./prisma/

# 4. Install ALL dependencies
# This will trigger the 'postinstall' script and generate the client
RUN npm install

# 5. Copy the rest of the code
COPY . .

# 6. EXPLICIT GENERATION (The "Double-Check" for TypeScript)
RUN npx prisma generate

# 7. Provide build-time environment variables
ENV DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
ENV NEXT_TELEMETRY_DISABLED=1

# 8. Build
RUN npm run build

# 9. Start
CMD npx prisma db push && npm start