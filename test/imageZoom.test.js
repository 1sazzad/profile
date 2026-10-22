import test from 'node:test';
import assert from 'node:assert/strict';
import { clampPan, clampZoom } from '../src/imageZoom.js';

test('zoom stays between 100% and 400%', () => {
  assert.equal(clampZoom(0.5), 1);
  assert.equal(clampZoom(2.5), 2.5);
  assert.equal(clampZoom(10), 4);
});

test('pan stops at the edges of an enlarged image', () => {
  assert.deepEqual(clampPan(500, -500, 2, 600, 400, 600, 400), { x: 300, y: -200 });
  assert.deepEqual(clampPan(45, 40, 1, 600, 400, 600, 400), { x: 0, y: 0 });
  assert.deepEqual(clampPan(45, 40, 1.5, 200, 100, 600, 400), { x: 0, y: 0 });
});
