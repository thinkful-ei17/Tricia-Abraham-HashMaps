

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


  _hashString(string) {
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
    const hashedKey = this._hashString(key);
    //create an index based on the capacity of our hash table
    const index = hashedKey % this.capacity;
    //return the index (location)
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
    //loop through slot to find location of key
    //traverse the list to locate the value
    //remove node from list


  }

}//end HashMap class


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
}

main();