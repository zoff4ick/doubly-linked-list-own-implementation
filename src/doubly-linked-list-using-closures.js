const createNode = (data, prev = null, next = null) => ({data, prev, next});

const createList = () => {
  let head = null;
  let tail = null;
  let size = 0;

  // index of actual element
  const isElementIndex = (index) => typeof index === 'number' && index >= 0 && index < size;
  // index of position where element could be set
  const isPositionIndex = (index) => typeof index === 'number' && index >= 0 && index <= size;

  const checkElementIndexDecorator = (f) => {
    return (index, ...args) => {
      if (!isElementIndex(index)) {
        throw new Error('Index is out of range...');
      }

      return f(index, ...args);
    }
  }

  const checkPositionIndexDecorator = (f) => {
    return (index, ...args) => {
      if (!isPositionIndex(index)) {
        throw new Error('Index is out of range...');
      }

      return f(index, ...args);
    }
  };

  const getIterator = () => ({
          [Symbol.iterator]: () => {
      let current = head;

      return {
        next: () => {
          if (current === null) {
            return {done: true};
          } else {
            const {data} = current;
            current = current.next;
            return {done: false, value: data}
          }
        }
      }
    }
  });

  const getNode = (index) => {
    if (size === 0) return null;

    if (index === 0) {
      return head;
    } else if (index === size - 1) {
      return tail;
    }

    if (index < size / 2) {
      let current = head;
      let i = 0;

      while (i < index) {
        current = current.next;
        i++;
      }

      return current;
    } else {
      let current = tail;
      let i = 0;

      while (i < index) {
        current = current.tail;
        i++;
      }

      return current;
    }
  }

  const indexOf = (data) => {
    if (size === 0) return -1;

      let current = head;
      let i = 0;

      while (i <= size - 1) {
        if (current.data === data) {
          return i;
        }

        current = current.next;
        i++;
      }

      return -1;
  }

  const unlink = (node) => {
    const {data, prev, next} = node;
    node.data = null;
    node.next = null;
    node.prev = null;

    if (!prev) {
      head = next;
    } else {
      prev.next = next;
    }

    if (!next) {
      tail = prev;
    } else {
      next.prev = prev;
    }

    size--;
    return data;
  }

  const _insertFirstNode = (data) => {
    if (!(size === 0 && head === null && tail === null)) {
      throw new Error('_insertFirstNode was called on non-empty list');
    }

    const firstNode = createNode(data);
    head = firstNode;
    tail = firstNode;
    size++;
  }

  const push = (value) => {
    if (size === 0) return _insertFirstNode(value);
    const currentTail = tail;
    const newTail = createNode(value, currentTail);
    currentTail.next = newTail;

    tail = newTail;
    size++;
  };

  const pop = () => {
    const node = tail;
    if (node === null) {
      return null;
    }

    const {data, prev} = node;
    node.data = null;
    node.next = null;
    node.prev = null;

    tail = prev;

    if (tail === null) {
      head = null;
    } else {
      tail.next = null;
    }

    size--;
    return data;
  };

  const unshift = (value) => {
    if (size === 0) return _insertFirstNode(value);
    const currentHead = head;
    const newHead = createNode(value, null, currentHead);
    currentHead.prev = newHead;

    head = newHead;
    size++;
  };

  const shift = () => {
    const node = head;

    if (node === null) {
      return null;
    }

    const {data, next} = node;
    node.data = null;
    node.next = null;
    node.prev = null;

    head = next;

    if (next === null) {
      tail = null;
    } else {
      next.prev = null;
    }

    size--;
    return data;
  }

  const insert = (index, data) => {
    if (index === 0) {
      return unshift(data);
    }

    if (index === size) {
      return push(data);
    }

    const currentNodeOnIndex = getNode(index);
    const newNode = createNode(data, currentNodeOnIndex.prev, currentNodeOnIndex);

    currentNodeOnIndex.prev.next = newNode;
    currentNodeOnIndex.prev = newNode;
    size++;
  }

  const getSize = () => size;

  const clone = () => {
    const list = createList();

    if (size === 0) {
      return list;
    }

    for (const item of getIterator()) {
      list.push(item);
    }

    return list;
  }

  const find = (f) => {
    if (typeof f !== 'function') {
      throw new Error("Invalid data was provided as argument; Expected a function")
    }

    for (const data of getIterator()) {
      if (f(data)) {
        return data;
      }
    }
  }

  const filter = (f) => {
    if (typeof f !== 'function') {
      throw new Error("Invalid data was provided as argument; Expected a function")
    }

    const list = createList();

    for (const data of getIterator()) {
      if (f(data)) {
        list.push(data);
      }
    }

    return list;
  }

  const includes = (data) => {
    for (const nodeData of getIterator()) {
      if (nodeData === data) {
        return true;
      }
    }

    return false;
  }

  const map = (f) => {
    if (typeof f !== 'function') {
      throw new Error("Invalid data was provided as argument; Expected a function")
    }

    const list = createList();
    for (const nodeData of getIterator()) {
      list.push(f(nodeData));
    }

    return list;
  }

  // doesn't do deepCompare for nodes with reference types
  const compare = (comparable) => {
    if (comparable.getSize() !== size) {
      return false;
    }

    const iterator = getIterator()[Symbol.iterator]();
    let i = 0;
    let currentElement = iterator.next();

    for (const value of comparable) {
      if (value !== currentElement.value) {
        return false;
      }

      currentElement = iterator.next();
      i++;
    }

    return true;
  }

  const returnReverseIterator = () => ({
    [Symbol.iterator]: () => {
      let current = tail;

      return {
        next: () => {
          if (current === null) {
            return {done: true};
          } else {
            const {data} = current;
            current = current.prev;
            return {done: false, value: data}
          }
        }
      }
    }
  })

  const deleteNodes = (index, count = 1) => {
    // to prevent cases with out of range for later indexes
    let countToDelete = count > size - index ? size - index : count;

    if (head === null && tail === null && index === 0) {
      return;
    }

    if (count === 1 && index === 0) {
      return shift();
    }

    if (count === 1 && index === size - 1) {
      return pop();
    }

    let nodeToDelete = getNode(index);

    for (let i = 0; i < countToDelete; i++) {
      if (!nodeToDelete) return;
      const {next} = nodeToDelete;
      unlink(nodeToDelete);
      nodeToDelete = next;
    }
  }


  return {
    push,
    pop,
    unshift,
    shift,
    insert: checkPositionIndexDecorator(insert),
    deleteNodes: checkElementIndexDecorator(deleteNodes),
    indexOf,
    includes,
    getSize,
    compare,
    find,
    filter,
    map,
    clone,
    returnReverseIterator,
    [Symbol.iterator]: getIterator()[Symbol.iterator]
  };
};

module.exports = {createList};