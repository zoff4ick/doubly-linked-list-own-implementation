// todo rework tests

const { expect } = require('chai');

const { createList } = require('./doubly-linked-list-using-closures');

describe('Doubly Linked List on closures', () => {
  it('should insert nodes correctly', () => {
    const list = createList();

    list.push('first');
    list.push('second');
    list.push('third');

    const result = [];
    for (const item of list) {
      result.push(item);
    }

    expect(result).to.deep.equal(['first', 'second', 'third']);
  });

  it('should reset tail and head correctly on list devastation', () => {
    const list = createList();

    list.push('first');
    list.push('second');

    list.pull();
    list.pull();

    expect(list.getHead()).to.equal(null);
    expect(list.getTail()).to.equal(null);
  });

  it('should remove tail correctly', () => {
    const list = createList();

    list.push('first');
    list.push('second');
    list.push('third');

    expect(list.pull()).to.equal('third');

    const result = [];
    for (const item of list) {
      result.push(item);
    }

    expect(result).to.deep.equal(['first', 'second']);
  });

  it('should handle empty list gracefully', () => {
    const list = createList();

    expect(list.pull()).to.equal(null);
  });

  it('should handle single node list', () => {
    const list = createList();

    list.push('only');

    expect(list.pull()).to.equal('only');
    expect([...list]).to.deep.equal([]);
  });
});
