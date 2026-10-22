import test from 'node:test';
import assert from 'node:assert/strict';
import { photosForStem } from '../src/photoGrouping.js';

test('groups many slides under one topic and keeps the cover first', () => {
  const entries = [
    { stem: 'club-leadership-10' },
    { stem: 'club-leadership-workshop' },
    { stem: 'club-leadership-02' },
    { stem: 'club-leadership' },
    { stem: 'icpc-regional' },
  ];
  assert.deepEqual(photosForStem(entries, 'club-leadership').map((entry) => entry.stem), [
    'club-leadership',
    'club-leadership-02',
    'club-leadership-10',
    'club-leadership-workshop',
  ]);
});

test('does not group a similarly named but unrelated topic', () => {
  const entries = [{ stem: 'club-leadership' }, { stem: 'club-leaderships' }, { stem: 'club-leadership_03' }];
  assert.deepEqual(photosForStem(entries, 'club-leadership').map((entry) => entry.stem), [
    'club-leadership', 'club-leadership_03',
  ]);
});

test('leaves an empty topic ready for its first photo', () => {
  assert.deepEqual(photosForStem([], 'teaching-foundation'), []);
});

test('supports numbered images inside a topic subfolder', () => {
  const entries = [
    { path: 'photos/club-leadership/10.jpg', group: 'club-leadership', stem: '10' },
    { path: 'photos/icpc-regional/01.jpg', group: 'icpc-regional', stem: '01' },
    { path: 'photos/club-leadership/02.jpg', group: 'club-leadership', stem: '02' },
    { path: 'photos/club-leadership.JPG', group: null, stem: 'club-leadership' },
  ];
  assert.deepEqual(photosForStem(entries, 'club-leadership').map((entry) => entry.path), [
    'photos/club-leadership.JPG',
    'photos/club-leadership/02.jpg',
    'photos/club-leadership/10.jpg',
  ]);
});
