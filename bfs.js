var shortest_path = [];
function bfs(){
    var q = new Queue();
    var parent= [];
    var visited =[];
    var obstacle_color = cells[99][99].style.backgroundColor ;
    for(let i=0; i<100; ++i){
        visited[i] = [];
        parent[i]=[];
        for(let j =0; j<100; ++j){
            visited[i][j] = false;
        }
    }
    q.pushf(starting_cell);
    if(q.isEmpty) console.log("empty");
    var p =0;
    visited[starting_cell[0]][starting_cell[1]] =true;
    while(!q.isEmpty() && !visited[destination_cell[0]][destination_cell[1]]){
     
        var curr = q.front();
        // console.log(curr);
        var i=curr[0];
        var j = curr[1];
        // console.log(i+" "+j);
        q.popb();
        
        if(i>0){
            if(!(visited[i-1][j]) && !(cells[i-1][j].style.backgroundColor==obstacle_color)){
                // console.log("bgcolor = "+cells[i-1][j].style.backgroundColor);
                q.pushf([i-1,j]);
                visited[i-1][j] = true;
                parent[i-1][j] = [i,j];
                
            }
            
        }
        if(j>0){
            if(!(visited[i][j-1]) && !(cells[i][j-1].style.backgroundColor==obstacle_color))
              { 
                //console.log("bgcolor = "+cells[i][j-1].style.backgroundColor);
                q.pushf([i,j-1]);
                visited[i][j-1] = true;
                parent[i][j-1] = [i,j];
                 
    
              }
        }
        if(i<99){
            if(!(visited[i+1][j]) && !(cells[i+1][j].style.backgroundColor==obstacle_color)){
                // console.log("bgcolor = "+cells[i+1][j].style.backgroundColor);
                q.pushf([i+1,j]);
                visited[i+1][j] =true;
                parent[i+1][j] = [i,j];
                  
    
            }
    
        }
        if(j<99){
            if(!(visited[i][j+1]) && !(cells[i][j+1].style.backgroundColor==obstacle_color)){
                // console.log("bgcolor = "+cells[i][j+1].style.backgroundColor);
                q.pushf([i,j+1]);
                visited[i][j+1] =true;
                parent[i][j+1] = [i,j];
                     
    
            }
        }
        ++p;
    
    }
    for(var i = destination_cell; !(i[0]==starting_cell[0] && i[1]==starting_cell[1]) ; i=parent[i[0]][i[1]]){
        //console.log("i0= "+i[0]+", i1= "+i[1]);
        shortest_path.unshift([i[0],i[1]]);
    }
    var path_length = shortest_path.length;
    console.log("shortest_path ki length = " + shortest_path.length+ " "+shortest_path[path_length-1][0]+", "+shortest_path[path_length-1][1]);
    for(var i=0; i<shortest_path.length-1; ++i){
       
          animate(shortest_path[i][0],shortest_path[i][1], i);
     
    }
        
}
function animate(r, c, i){
    setTimeout(() => {
       cells[r][c].style.backgroundColor = "#26ff12";
      }, 50 * i);
}
