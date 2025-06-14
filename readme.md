# 🛠️ Project Setup

This project requires a few tools to be installed on your system before running it.

---

## 📦 Prerequisites

### ✅ PostgreSQL

PostgreSQL is used as the primary database for this project.

#### 💻 macOS

If you have Homebrew installed:

```bash
brew install postgresql
brew services start postgresql
```

#### 💻 Ubuntu / Debian

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

Check status:

```bash
sudo systemctl status postgresql
```

#### 💻 Windows

1. Download from the official website:  
   https://www.postgresql.org/download/windows/

2. Install using the setup wizard.

3. Open **SQL Shell (psql)** after installation to configure.

---

### 🛠️ PostgreSQL Setup

After installation, create a user and a database.

Open psql:

```bash
psql postgres
```

Inside the psql shell, run:

```sql
CREATE USER postgres WITH PASSWORD 'mypassword';
CREATE DATABASE mydatabase OWNER postgres;
\q
```

Update your `.env` file with:

---

## 🌐 Node.js and npm

Make sure Node.js (v24) and npm are installed.

Check with:

```bash
node -v
npm -v
```

Download from: https://nodejs.org/

---

## 🎭 Playwright (for Testing)

Install required browsers:

```bash
npx playwright install
```

---

## 🚀 Run the Project

Install dependencies:

```bash
npm install
```

Start the project:

```bash
npm start
```

Run tests (if available):

```bash
npx playwright test-e2e
npx playwright test-e2e-ui
```
