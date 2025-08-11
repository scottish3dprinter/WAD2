const test = require('node:test');
const assert = require('node:assert');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const User = require('../models/userModel');

test('create and retrieve a user', async () => {
  const dbPath = path.join(__dirname, 'test-users.db');
  try { fs.unlinkSync(dbPath); } catch (_) {} // this deletes the test DB if it exists

  const userModel = new User(dbPath);
  const username = "testuser";

  await userModel.create(username, 'password', 1);

  const user = await userModel.lookup(username);
  assert.ok(user, 'User should be found');
  assert.strictEqual(user.user, username);
});

test('lookup returns null for user that does not exist', async () => {
  const userModel = new User();
  const user = await userModel.lookup('does_not_exist');
  assert.strictEqual(user, null);
});

test('list returns created users', async () => {
  const userModel = new User();
  const name1 = "userA";
  const name2 = "userB";

  await userModel.create(name1, 'pass', 1);
  await userModel.create(name2, 'pass', 1);

  const users = await userModel.list();

  let found1 = false;
  let found2 = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].user === name1) {
      found1 = true;
    }
    if (users[i].user === name2) {
      found2 = true;
    }
  }

  assert.ok(found1, 'First user should be in the list');
  assert.ok(found2, 'Second user should be in the list');
});

test('delete removes a user', async () => {
  const userModel = new User();
  const username = "deleteMe";

  await userModel.create(username, 'pass', 1);

  const removedCount = await userModel.delete(username);
  assert.strictEqual(removedCount, 1);

  const user = await userModel.lookup(username);
  assert.strictEqual(user, null);
});

test('create hashes the password', async () => {
  const userModel = new User();
  const username = "hashTest";
  const plainPassword = "mypassword";

  await userModel.create(username, plainPassword, 1);

  const user = await userModel.lookup(username);

  assert.notStrictEqual(user.password, plainPassword, 'Password should not be stored in plain text');

  const match = await bcrypt.compare(plainPassword, user.password);
  assert.ok(match, 'Stored password hash should match the plain password');
});

