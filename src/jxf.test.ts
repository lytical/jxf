/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import { expect } from 'chai';
import { describe } from 'mocha';

import jxf from './index.js';

import {
  jxf_case,
  jxf_for_each,
  jxf_if,
  jxf_switch,
  jxf_value_of,
  jxf_variable,
  jxf_with,
} from './transformers/index.js';

describe('a jsxform instance', () => {
  it('can transform plain text', async () => {
    const rs = jxf({}, ['Hello, World!']);
    expect(rs).exist.and.is.an('array').that.includes('Hello, World!');
  });

  it('can transform an object property using jxf_value(), into a formatted string', async () => {
    const rs = jxf({ name: 'Barry' }, ['Hello, ', jxf_value_of('.name'), '!']);
    expect(rs).exist.and.is.an('array');
    expect(rs.join('')).equals('Hello, Barry!');
  });

  it('can transform an object property using jxf_value() and jxf_variable(), into a formatted string', async () => {
    const rs = jxf({ first_name: 'Barry', last_name: 'Hayles' }, [
      jxf_variable('lname', '.last_name'),
      'Hello, ',
      jxf_value_of('.first_name'),
      ' ',
      jxf_value_of('$lname'),
      '!',
    ]);
    expect(rs).exist.and.is.an('array');
    expect(rs.join('')).equals('Hello, Barry Hayles!');
  });

  it('can transform objects using jxf_for_each()', () => {
    const rs = jxf({ name: ['Barry', 'Hayles'] }, [
      'Names:',
      jxf_for_each('.name', [jxf_value_of('.')]),
    ]);
    expect(rs).exist.and.is.an('array');
    expect(rs.join(' ')).equals('Names: Barry Hayles');
  });

  it('can transform objects using jxf_with()', () => {
    const rs = jxf({ first_name: 'Barry', last_name: 'Hayles' }, [
      'Full Name:',
      jxf_with('.', [jxf_value_of('.first_name'), jxf_value_of('.last_name')]),
    ]);
    expect(rs).exist.and.is.an('array');
    expect(rs.join(' ')).equals('Full Name: Barry Hayles');
  });

  it('can transform objects using jxf_switch() and jfx_case()', () => {
    const rs = jxf(
      [
        { first_name: 'Barry', last_name: 'Hayles', age: 42 },
        { first_name: 'Roger', last_name: 'Rabbit', age: 25 },
      ],
      [
        'Ages:',
        jxf_for_each('.', [
          jxf_value_of('.first_name'),
          jxf_value_of('.last_name'),
          jxf_switch('.age', [
            jxf_case('.{. <= 30}', ['Is Young']),
            jxf_case('.{. > 30}', ['Is Old']),
          ]),
          jxf_if('.{$$last === false}', ['and']),
        ]),
      ],
    );
    expect(rs).exist.and.is.an('array');
    expect(rs.join(' ')).equals(
      'Ages: Barry Hayles Is Old and Roger Rabbit Is Young',
    );
  });

  it('can transform objects using jxf_for_each and jxf_if()', () => {
    const rs = jxf(
      [
        { first_name: 'Barry', last_name: 'Hayles', age: 42 },
        { first_name: 'Roger', last_name: 'Rabbit', age: 25 },
      ],
      [
        'Full Name:',
        jxf_for_each('.', [
          jxf_if('.{.age < 30}', [
            jxf_value_of('.first_name'),
            jxf_value_of('.last_name'),
          ]),
        ]),
      ],
    );
    expect(rs).exist.and.is.an('array');
    expect(rs.join(' ')).equals('Full Name: Roger Rabbit');
  });
});
