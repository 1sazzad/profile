import test from 'node:test';
import assert from 'node:assert/strict';
import { buildDescriptionLookup, descriptionForImage } from '../src/photoDescriptions.js';

test('matches a numbered photo with its adjacent text caption', () => {
  const lookup = buildDescriptionLookup({
    './assets/photos/club/1.txt': ' Addressing attendees at an IST event.\n',
    './assets/photos/icpc/2.TXT': '  ICPC contest day.  ',
    './assets/photos/club/3.txt': '   ',
  });
  assert.equal(descriptionForImage('./assets/photos/club/1.JPG', lookup), 'Addressing attendees at an IST event.');
  assert.equal(descriptionForImage('./assets/photos/icpc/2.JPG', lookup), 'ICPC contest day.');
  assert.equal(descriptionForImage('./assets/photos/club/3.jpg', lookup), null);
  assert.equal(descriptionForImage('./assets/photos/club/4.jpeg', lookup), null);
});

test('keeps multiline text compact for the small gallery caption', () => {
  const lookup = buildDescriptionLookup({
    './assets/photos/underwater/1.txt': 'Marine fieldwork\n and dataset collection',
  });
  assert.equal(descriptionForImage('./assets/photos/underwater/1.jpg', lookup), 'Marine fieldwork and dataset collection');
});
