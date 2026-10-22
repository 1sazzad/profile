import test from 'node:test';
import assert from 'node:assert/strict';
import { pageFromHash, pageHref, pages } from '../src/routes.js';

test('the home page is the default view', () => {
  assert.equal(pageFromHash(''), 'home');
  assert.equal(pageFromHash('#/'), 'home');
  assert.equal(pageFromHash('#/unknown'), 'home');
});

test('each menu item navigates to its own view', () => {
  for (const page of pages) assert.equal(pageFromHash(pageHref(page.id)), page.id);
});

test('older section bookmarks remain meaningful', () => {
  assert.equal(pageFromHash('#research'), 'research');
  assert.equal(pageFromHash('#gallery'), 'gallery');
  assert.equal(pageFromHash('#/about/'), 'about');
});
