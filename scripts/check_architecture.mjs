import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "../src");
const allowed = {
  domain: new Set(["domain"]),
  application: new Set(["domain", "application"]),
  infrastructure: new Set(["domain", "infrastructure"]),
  presentation: new Set(["domain", "application", "presentation"]),
};
const violations = [];

function inspect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      inspect(filename);
      continue;
    }
    if (!/\.tsx?$/.test(entry.name) || /\.test\.ts$/.test(entry.name)) continue;
    const relative = path.relative(root, filename);
    const layer = relative.split(path.sep)[0];
    const source = ts.createSourceFile(
      filename,
      fs.readFileSync(filename, "utf8"),
      ts.ScriptTarget.Latest,
    );
    for (const statement of source.statements) {
      if (
        !ts.isImportDeclaration(statement) ||
        !ts.isStringLiteral(statement.moduleSpecifier)
      )
        continue;
      const dependency = statement.moduleSpecifier.text;
      if (!dependency.startsWith(".")) {
        if (layer === "domain")
          violations.push(relative + ": external domain dependency " + dependency);
        if (layer === "application" && dependency !== "react")
          violations.push(relative + ": application dependency " + dependency);
        continue;
      }
      const target = path.resolve(path.dirname(filename), dependency);
      const targetLayer = path.relative(root, target).split(path.sep)[0];
      if (allowed[layer] && !allowed[layer].has(targetLayer))
        violations.push(relative + ": " + layer + " -> " + targetLayer);
    }
  }
}

inspect(root);
if (violations.length) {
  process.stderr.write(violations.join("\n") + "\n");
  process.exitCode = 1;
} else {
  process.stdout.write("Architecture boundaries passed.\n");
}
