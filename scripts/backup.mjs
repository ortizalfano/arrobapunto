import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import JSZip from "jszip";

const BACKUP_DIR = path.join(process.cwd(), "backups");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const DATA_DIR = path.join(process.cwd(), "data");

function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

function getFormattedDate() {
  const now = new Date();
  return now.toISOString().split("T")[0]; // YYYY-MM-DD
}

async function backupDatabase() {
  console.log("🗄️ Backing up database...");
  
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.warn("⚠️ DATABASE_URL not set, skipping DB backup");
    return null;
  }

  const date = getFormattedDate();
  const dbBackupPath = path.join(BACKUP_DIR, `db-${date}.sql`);

  try {
    // Parse DATABASE_URL to extract connection details
    const url = new URL(dbUrl);
    const host = url.hostname;
    const db = url.pathname.slice(1); // Remove leading /
    const user = url.username;
    const port = url.port || "5432";

    // Use pg_dump if available
    const pgDumpCmd = `PGPASSWORD="${url.password}" pg_dump -h ${host} -p ${port} -U ${user} -d ${db} -f ${dbBackupPath}`;
    
    execSync(pgDumpCmd, { encoding: "utf-8" });
    console.log(`✅ Database backup saved: ${dbBackupPath}`);
    return dbBackupPath;
  } catch (error) {
    console.error("❌ Database backup failed:", error.message);
    return null;
  }
}

async function backupAssets() {
  console.log("📦 Backing up assets...");

  const date = getFormattedDate();
  const assetsZip = path.join(BACKUP_DIR, `assets-${date}.zip`);

  try {
    const zip = new JSZip();

    // Add public directory if it exists
    if (fs.existsSync(PUBLIC_DIR)) {
      function addDirectoryToZip(dirPath, zipPath) {
        const files = fs.readdirSync(dirPath);
        
        files.forEach(file => {
          const filePath = path.join(dirPath, file);
          const stat = fs.statSync(filePath);
          
          if (stat.isDirectory()) {
            addDirectoryToZip(filePath, zipPath);
          } else {
            const content = fs.readFileSync(filePath);
            zip.file(`${zipPath}/${file}`, content);
          }
        });
      }

      addDirectoryToZip(PUBLIC_DIR, "public");
      console.log("✅ Added public directory to zip");
    }

    // Add data directory if it exists
    if (fs.existsSync(DATA_DIR)) {
      const dataFiles = fs.readdirSync(DATA_DIR);
      dataFiles.forEach(file => {
        const filePath = path.join(DATA_DIR, file);
        const content = fs.readFileSync(filePath);
        zip.file(`data/${file}`, content);
      });
      console.log("✅ Added data directory to zip");
    }

    if (Object.keys(zip.files).length > 0) {
      const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
      fs.writeFileSync(assetsZip, zipBuffer);
      console.log(`✅ Assets backup saved: ${assetsZip}`);
    } else {
      console.log("⚠️ No assets to backup");
    }

    return assetsZip;
  } catch (error) {
    console.error("❌ Assets backup failed:", error.message);
    return null;
  }
}

function cleanupOldBackups() {
  console.log("🧹 Cleaning up old backups...");

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  try {
    const files = fs.readdirSync(BACKUP_DIR);
    
    files.forEach(file => {
      const filePath = path.join(BACKUP_DIR, file);
      const stats = fs.statSync(filePath);
      
      if (stats.mtime < sevenDaysAgo) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted old backup: ${file}`);
      }
    });

    console.log("✅ Cleanup complete");
  } catch (error) {
    console.error("❌ Cleanup failed:", error.message);
  }
}

async function main() {
  console.log("🚀 Starting backup process...\n");

  ensureBackupDir();

  try {
    const dbBackup = await backupDatabase();
    const assetsBackup = await backupAssets();
    
    cleanupOldBackups();

    console.log("\n✅ Backup process complete!");
    
    if (dbBackup || assetsBackup) {
      console.log("📦 Backups created:");
      if (dbBackup) console.log(`  - ${dbBackup}`);
      if (assetsBackup) console.log(`  - ${assetsBackup}`);
    }
  } catch (error) {
    console.error("❌ Backup process failed:", error);
    process.exit(1);
  }
}

main();







