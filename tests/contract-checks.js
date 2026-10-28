/* Node-only contract invariants; no third-party dependencies. */
"use strict";
const assert = require("node:assert/strict");
const contract = require("../webui/runtime-contract.js");
const connection = require("../webui/connection.js");

const empty = contract.emptySnapshot();
assert.equal(contract.validateSnapshot(empty).valid, true, "empty snapshot must validate");
assert.equal(empty.connection.state, "disconnected");
assert.ok(contract.CAPABILITIES.every((name) => empty.capabilities[name] === false));

const malformed = contract.validateSnapshot({ schemaVersion: 999 });
assert.equal(malformed.valid, false, "unsupported schema must fail");
assert.ok(malformed.errors.length > 0);

const normalized = contract.normalizeSnapshot({ schemaVersion: 999 });
assert.equal(normalized.valid, false);
assert.equal(normalized.snapshot.connection.state, "disconnected", "invalid data must fail closed");

(async () => {
  const provider = connection.createDisconnectedProvider(contract);
  assert.equal(provider.mode, "simulation");
  const snapshot = await provider.getSnapshot();
  assert.equal(snapshot.connection.state, "disconnected");
  const connectResult = await provider.connect();
  assert.equal(connectResult.ok, false, "no adapter must not claim connection success");
  const actionResult = await provider.execute();
  assert.equal(actionResult.ok, false, "runtime operations must remain unavailable");
  console.log("MATRIX-ZYGISK v0.4 contract checks passed.");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
