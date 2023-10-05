const doublyLinkedList = require('./doubly-linked-list-on-closures');


const list = doublyLinkedList.createList();
list.push('inserted0')
list.push('inserted')
list.push('inserted1')
// list.insert(0, 'inserted');
// list.insert(1, 'inserted1');
// list.insert(1, 'inserted2');
// list.insert(1, 'inserted3');

console.log('list.getNode(1)', list.getNode(1));
console.log('list', ...list);
// console.log('list.pull()', list.pull());
// console.log('list.pull() 2', list.pull());
// console.log('list.pull() 3', list.pull());
// list.insert(0, 'inserted again');
// list.insert(0, 'inserted again2');
// list.insert(0, 'inserted again3');
// console.log('list after pulling and inserting', ...list);
// list.delete(0, 2);
// list.unshift('inserted again 0');
// console.log('list after deleting', ...list);
// console.log('list after deleting', list, list.getSize());

// const list2 = createList();
//
// list.push('first' );
// list.push('second');
// list.push('third');
//
// list2.push('fourth' );
// list2.push('fifth');
// list2.push('sixth');
//
// console.log('list', ...list);
// console.log('list from the tail', ...list.returnReverseIterator());
// console.log('list2', ...list2);
//
// const list3 = createList();
//
// list3.push('only');
//
// console.log('list3.pull()', list3.pull());
// console.log('list3', list3.getHead());