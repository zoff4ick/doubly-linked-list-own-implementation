// const node = (data) => {
//   let prev = null;
//   const element = (data) => {
//     const next = node(data);
//     next.prev = element;
//     return next;
//   };
//   element.data = data;
//   element.prev = () => prev;
//
//   return element;
// };

const createList = () => {
  let head = null;
  let tail = null;
  let size = 0;

  const getHead = () => (head === null ? head : head.data);
  const getTail = () => (tail === null ? tail : tail.data);

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

  // todo rework
  const push = (value) => {
    const node = {data: value};

    if (!head && !tail) {
      head = node;
      tail = node;

      node.prev = null;
      node.next = null;
    } else {
      const currentTailElement = tail;
      node.prev = currentTailElement;
      node.next = null;
      currentTailElement.next = node;
      tail = node;
    }
    size++;
  };

  // todo rework
  const unshift = (value) => {
    const node = {data: value};

    if (!head && !tail) {
      head = node;
      tail = node;

      node.prev = null;
      node.next = null;
    } else {
      const currentHead = head;
      currentHead.prev = node;
      node.next = currentHead;
      node.prev = null;
    }

    size++;
  };

  // todo rework
  const pull = () => {
    const currentTailElement = tail;

    if (!currentTailElement) {
      return null;
    }

    const prevElement = currentTailElement.prev;

    if (!prevElement) {
      tail = null;
      head = null;
    } else {
      prevElement.next = null;
    }

    tail = prevElement;
    const {data} = currentTailElement;

    currentTailElement.prev = null;
    currentTailElement.data = null;

    size--;

    return data;
  };

  // todo rework
  const insert = (index, data) => {
    // deprecated implementation beginning

    // let properIndexToInsertAt = index < size ? index : (size - 1 > 0 ? size - 1 : 0) // todo handle case with index out of range differently (add some common logic for all functions where its needed)
    // let current = head;
    // let target = null;
    // let i = 0;

    // const newNode = {data};

    // todo handle case with empty list differently (we need the common implementation for all insert-like functions (such as insert, push (append), unshift (prepend)
    // if (head === null && tail === null && properIndexToInsertAt === 0) {
    //   return push(data);
    // }

    // while (i < properIndexToInsertAt) {
    //   if (!current) {
    //     throw new Error('Wrong index was used! Index cannot be greater than current list size');
    //   }
    //
    //   current = current.next;
    //   i++;
    // }

    // deprecated implementation end

    if (index === 0) {
      // todo call .unshift()
    }

    if (index === size - 1) {
      // todo call .push()
    }

    const newNode = {data};
    const currentNodeOnIndex = getNode(index);
    newNode.prev = currentNodeOnIndex.prev;
    newNode.next = currentNodeOnIndex;

    if (currentNodeOnIndex.prev) {
      currentNodeOnIndex.prev.next = newNode;
    } else {
      head = newNode;
    }

    currentNodeOnIndex.prev = newNode;
    size++;
  }

  const getSize = () => size;

  // todo rework
  const listData = {
    getHead,
    getTail,
    push,
    pull,
    insert,
    getSize,
    unshift
  };

  // todo check does it need to be reworked
  listData.returnReverseIterator = () => ({
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

  // todo rework
  listData.delete = (index, count) => {
    let current = head;
    let target = null;
    let i = 0;

    let countToDelete = count > size - index ? size - index : count;

    if (head === null && tail === null && index === 0) {
      return;
    }

    // todo add size property to list, be sure that index won't be greater than list's size
    while (i < index) {
      if (!current) {
        throw new Error('Wrong index was used! Index cannot be greater than current list size');
      }

      current = current.next;
      i++;
    }

    let nodeToDelete = current;
    // const {prev} = currentNodeOnIndex;
    // const prevNodeOfCurrent = currentNodeOnIndex.prev;
    const {prev: startOfTheGap} = nodeToDelete;

    for (let i = 0; i < countToDelete; i++) {
      if (!nodeToDelete) return;
      const {next} = nodeToDelete;
      nodeToDelete.prev = null;
      nodeToDelete.next = null;
      nodeToDelete.data = null;
      nodeToDelete = next;
      size--;

      if (i === countToDelete - 1) {
        const endOfTheGap = nodeToDelete;
        if (endOfTheGap) {
          endOfTheGap.prev = startOfTheGap;
        } else if (startOfTheGap) {
          tail = startOfTheGap;
        }
        if (startOfTheGap) {
          startOfTheGap.next = endOfTheGap;
          if (!startOfTheGap.next) {
            head = startOfTheGap;
          }
        } else {
          head = endOfTheGap;
        }
      }
    }

    // currentNodeOnIndex.prev = newNode;
    //
    // if (prev) {
    //   prev.next = newNode;
    // } else if (head === currentNodeOnIndex) {
    //   head = newNode;
    // }
    //
    // newNode.prev = prev;
    // newNode.next = currentNodeOnIndex;
  }

  // todo check does it need to be reworked
  listData[Symbol.iterator] = () => {
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

  listData.getNode = getNode;


  return listData;
};

module.exports = {createList};