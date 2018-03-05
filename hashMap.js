'use strict';


class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}//end _Node class



class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this.slots[
      { 
        key : String 
      }];
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
    //loop through the slots to find the key location
    //return the index (location)

    return index;
  }

  _resize(size){
    //save current slots to temp slots
    //create new size slots
    //loop through temp slots and add to new slots
  }



  add(key, value){
    //find a slot by getting an index
    //create a new node to store data
    //add node to beginning of list @ location

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


}

main();