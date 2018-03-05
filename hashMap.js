

/*eslint-disable*/
class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}//end _Node class



class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this.slots=[];
    this.capacity = initialCapacity;
    this.MAX_LOAD_RATIO = 0.9;
    this.SIZE_RATIO = 3;
  }


  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }


  //create a node to store data
  _createNode(value) {
  
    return new _Node(value, null);
  }

  _findSlot(key) {
    //create a hash based on key
    const hashedKey = HashMap._hashString(key);
    console.log('Hash received = ', hashedKey)
    //create an index based on the capacity of our hash table
    const index = hashedKey % this.capacity;
    //return the index (location)
    console.log('_findSlot returns index = ', index)
    return index;
  }

  _resize(size){
    //save current slots to temp slots
    //create new size slots
    //loop through temp slots and add to new slots
    const tempSlot  = this.slots;
    this.capacity = size;
    // reset to 0 so we can compare how m any items we have in
    // capacity based on new size.
    this.length = 0;
    // zero out the slots
    this.slots = [];
    // add a for loop to pass everything from temp slots to 
    // new slots
    for(let i = 0; i < tempSlot.length; i++){
      if(tempSlot !== undefined){
        this.add(tempSlot[i].key, tempSlot[i].value);
      }
    }
  }



  add(key, value){
    // compute load ratio
    const computedLoadRatio = (this.length + 1) / this.capacity;
    // check to see if we need to resize
    // if the computed ratio is larger then we call _resize()
    if(computedLoadRatio > this.MAX_LOAD_RATIO){
      this._resize(this.capacity * this.SIZE_RATIO);
    }
    //find a slot by getting an index
    const index = this._findSlot(key);
    //create a new node to store data
    const node = new _Node(value, null);
    // lookup current node if any nodes exist
    let current = node;
    if (this.slots[index] === undefined){
      this.slots[index] = node;
      //increase length
      this.length++;      
    } else {
    //add node to beginning of list @ location
      current = this.slots[index];
      this.slots[index] = node;
      node.next = current;
    }
  }

  remove(key, value) {
    //get hash of key
    const hashedKey = HashMap._hashString(key);
    const index = this._findSlot(key);

    //go to the slot, then find the value
    let current = this.slots[index];
    let prev = this.slots[index];

    //does slots[index] ==== value?
    if (this.slots[index].value === value) {
      this.slots[index] = current.next;
      return;
    }
    //traverse the list to locate the value
    while ((current.next !== null) && (current.value !== value)) {
      prev = current;
      current = current.next;
      }
      if (current === null) {
        console.log('item not found');
      }
      //remove node from list
      prev.next = current.next;

  }

  get(key){
    const index = this._findSlot(key);
    return this.slots[index];
  }

  getByKV(key, value){
    const index = this._findSlot(key);
    let current = this.slots[index];
    if(current.value === value){
      return current;
    }

    while((current.next !== null) /*&& (current.value !== value)*/){
      if(current.value === value){
        return current;
      }
      current = current.next;
    }

    if(current.next === null && current.value !== value){
      return null;
    }
    return current;
  }
  
}//end HashMap class

function display(hashMap){
  for( let i = 0; i < hashMap.capacity; i++) {
    if(hashMap.slots[i] !== undefined)
      console.log( 'Key = ', hashMap.slots[i].key, 'Value = ', hashMap.slots[i].value);
  }
}
  


function main() {
//create new HashMap
//exercise operations

let lor = new HashMap();
lor.add("Hobbit", "Bilbo");
lor.add("Hobbit", "Frodo");
lor.add("Wizard", "Gandolf");
lor.add("Human", "Aragon");
lor.add("Elf", "Legolas");
lor.add("Maiar", "The Necromancer");
lor.add("Maiar", "Sauron");
lor.add("RingBearer", "Gollum");
lor.add("LadyOfLight", "Galadriel");
lor.add("HalfElven", "Arwen");
lor.add("Ent", "Treebeard");
console.log(JSON.stringify(lor, null, ' '))
console.log('-----------------------')
display(lor);
console.log('-----------------------')
// lor.remove("Hobbit", "Frodo")
// console.log(JSON.stringify(lor, null, ' '))
// console.log('-----------------------')
lor.remove("Human", "Aragon")
console.log(JSON.stringify(lor, null, ' '))

console.log(lor.get('maiar'));
console.log('-----------------------')
console.log(lor.getByKV('Hobbit', 'Sam'));
console.log(lor.getByKV('Hobbit', 'Frodo'));
console.log(lor.getByKV('Hobbit', 'Bilbo'));
}

main();