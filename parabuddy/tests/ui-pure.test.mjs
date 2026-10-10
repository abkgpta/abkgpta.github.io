import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluate } from '../src/ui/expr.js';
import { fmtNum } from '../src/ui/controls.js';

test('expressions evaluate safely', () => {
  assert.equal(evaluate('1.5*2'), 3);
  assert.equal(evaluate('(120-4)/4'), 29);
  assert.equal(evaluate('-2+5'), 3);
  assert.equal(evaluate('2,5'), 2.5);
  assert.ok(Number.isNaN(evaluate('alert(1)')));
  assert.ok(Number.isNaN(evaluate('2+')));
});

test('number formatting keeps whole-number zeros', () => {
  assert.equal(fmtNum(30, 1), '30');
  assert.equal(fmtNum(100, 1), '100');
  assert.equal(fmtNum(4.2, 0.05), '4.2');
  assert.equal(fmtNum(2, 0.05), '2');
  assert.equal(fmtNum(0.03, 0.01), '0.03');
});
