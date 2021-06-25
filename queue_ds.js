class Queue
{
    // Array is used to implement a Queue
    constructor()
    {
        this.items = [];
    }
     
    pushf(element){

        this.items.push(element);
    }  
    popb()
    {
    
       return this.items.shift();
    }
    front(){
       return this.items[0];
    }  
    isEmpty(){
         return this.items.length == 0;
    }         
    size(){
         return this.items.length;
    }
     
}
 
 
 

 

 

