import * as fs from "fs";
import * as path from "path";

// Create tests directory structure
const dirs = [
  "tests",
  "tests/unit",
  "tests/integration",
  "tests/__mocks__",
];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created: ${dir}`);
  }
});

// Create test utilities
const testUtils = `import { render } from "@testing-library/react";
import { ThemeProvider } from "next-themes";

export function renderWithTheme(ui: React.ReactElement) {
  return render(
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {ui}
    </ThemeProvider>
  );
}
`;

fs.writeFileSync("tests/test-utils.ts", testUtils);
console.log("Created: tests/test-utils.ts");

console.log("\n✅ Test setup complete!");















