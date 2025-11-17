import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const CHANGELOG_PATH = path.join(process.cwd(), "CHANGELOG.md");

function getLatestRelease() {
  try {
    const output = execSync("git describe --tags --abbrev=0 2>/dev/null || echo ''", {
      encoding: "utf-8",
    }).trim();
    return output || null;
  } catch {
    return null;
  }
}

function getCommitsSince(tag) {
  try {
    const range = tag ? `${tag}..HEAD` : "HEAD";
    const output = execSync(`git log ${range} --pretty=format:"%s"`, {
      encoding: "utf-8",
    }).trim();
    return output ? output.split("\n") : [];
  } catch {
    return [];
  }
}

function generateChangelog(commits) {
  const date = new Date().toISOString().split("T")[0];
  
  const sections = {
    "✨": [],
    "🐛": [],
    "⚡": [],
    "📝": [],
    "🎨": [],
    "🔧": [],
    "🚀": [],
    "": [],
  };

  commits.forEach(commit => {
    const [prefix, ...rest] = commit.split(":");
    const emoji = prefix.trim();
    const message = rest.join(":").trim();

    if (sections[emoji]) {
      sections[emoji].push(message);
    } else {
      sections[""].push(commit);
    }
  });

  const changelog = [];

  // Features
  if (sections["✨"].length > 0) {
    changelog.push("### ✨ Features");
    sections["✨"].forEach(msg => changelog.push(`- ${msg}`));
    changelog.push("");
  }

  // Bug fixes
  if (sections["🐛"].length > 0) {
    changelog.push("### 🐛 Bug Fixes");
    sections["🐛"].forEach(msg => changelog.push(`- ${msg}`));
    changelog.push("");
  }

  // Performance
  if (sections["⚡"].length > 0) {
    changelog.push("### ⚡ Performance");
    sections["⚡"].forEach(msg => changelog.push(`- ${msg}`));
    changelog.push("");
  }

  // Other changes
  const other = [...sections[""], ...sections["📝"], ...sections["🎨"], ...sections["🔧"], ...sections["🚀"]];
  if (other.length > 0) {
    changelog.push("### 📦 Other Changes");
    other.forEach(msg => changelog.push(`- ${msg}`));
    changelog.push("");
  }

  const header = `## 🚀 Release ${date}\n\n`;

  return header + changelog.join("\n");
}

function insertChangelog(newContent) {
  const existing = fs.existsSync(CHANGELOG_PATH)
    ? fs.readFileSync(CHANGELOG_PATH, "utf-8")
    : "# Changelog\n\n";

  const updated = existing.replace(/^# Changelog\n\n/, `# Changelog\n\n${newContent}\n`);

  fs.writeFileSync(CHANGELOG_PATH, updated);
  console.log("✅ CHANGELOG.md updated");
}

function createReleaseTag(date) {
  try {
    const tag = `release-${date}`;
    execSync(`git tag -a ${tag} -m "Release ${date}"`);
    console.log(`✅ Created tag: ${tag}`);
    return tag;
  } catch (error) {
    console.warn("⚠️ Could not create tag:", error.message);
    return null;
  }
}

async function main() {
  console.log("📝 Generating changelog...\n");

  try {
    const latestTag = getLatestRelease();
    console.log(`Latest release: ${latestTag || "none"}`);

    const commits = getCommitsSince(latestTag);
    console.log(`Commits since last release: ${commits.length}`);

    if (commits.length === 0) {
      console.log("⚠️ No new commits since last release");
      return;
    }

    const changelog = generateChangelog(commits);
    insertChangelog(changelog);

    const date = new Date().toISOString().split("T")[0];
    const tag = createReleaseTag(date);

    console.log("\n✅ Changelog generated successfully!");
    console.log(`Tag created: ${tag || "none"}`);
  } catch (error) {
    console.error("❌ Changelog generation failed:", error);
    process.exit(1);
  }
}

main();










