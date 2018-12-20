function Graph(){
    var vertices=[];
    var adjList=new Dictionary();
    this.addVertex=function(v){
        vertices.push(v);
        adjList.set(v,[]);
    }
    this.addEdge=function(v,w){
        adjList.get(v).push(w);
    }
    this.toString=function(){
        var s='';
        for(var i=0;i<vertices.length;i++){
            s+=vertices[i]+ '->';
            var tempArr=adjList.get(vertices[i]);
            tempArr.forEach(x=>{
                s+=x+'';
            })
            s+='\n'
        }
        return s;
    }
    var initializeColor=function(){
        var color=[];
        vertices.forEach(x=>{
            color[x]='white';
        })
        return color;
    }
    this.bfs=function(v,callback){
        var color=initializeColor();
        var queue=new Queue();
        var d=[];
        var pred=[];
        queue.enqueue(v);
        vertices.forEach(it=>{
            d[it]=0;
            pred[it]=null;
        })
        while(!queue.isEmpty()){
            var u=queue.dequeue();
            var neighbors=adjList.get(u);
            color[u]='gray';
            neighbors.forEach(nb=>{
                if(color[nb]==='white'){
                    color[nb]='gray';
                    d[nb]=d[u]+1;
                    pred[nb]=u;
                    queue.enqueue(nb);
                }
            });
            color[u]='black';
            if(callback){
                callback(u);
            }
        }
        return {
            distances:d,
            predecessors:pred,
        }

    }
}

function Dictionary(){
    var items={};
    this.has=function(key){
        return key in items;
    }
    this.set=function(key,value){
        items[key]=value;
    }
    this.remove=function(key){
        if(this.has(key)){
            delete items[key];
            return true;
        }
        return false;
    }
    this.get=function(key){
        return this.has(key)?items[key]:undefined;
    }
    this.values=function(){
        var values=[];
        for(var k in items){
            if(items.hasOwnProperty(k)){
                values.push(items[k]);
            }
        }
        return values;
    }
}

function Queue(){
    var items=[];
    this.enqueue=function(element){
        items.push(element);
    }
    this.dequeue=function(){
        return items.shift();
    }
    this.front=function(){
        return items[0];
    }
    this.isEmpty=function(){
        return items.length===0;
    }
    this.clear=function(){
        items=[];
    }
    this.size=function(){
        return items.length;
    }
    this.print=function(){
        console.log(items.toString());
    }
}
function Stack(){
    var items=[];
    this.push=function(element){
        items.push(element);
    }
    this.pop=function(){
        return items.pop();
    }
    this.peek=function(){
        return items[items.length-1];
    }
    this.isEmpty=function(){
        return items.length===0;
    }
    this.size=function(){
        return items.length;
    }
    this.clear=function(){
        items=[];
    }
}

var graph=new Graph();
var myVertices=['A','B','C','D','E','F','G','H','I'];
myVertices.forEach(it=>{
    graph.addVertex(it);
});
graph.addEdge('A','B');
graph.addEdge('A','C');
graph.addEdge('A','D');
graph.addEdge('C','D');
graph.addEdge('C','G');
graph.addEdge('C','A');
graph.addEdge('D','G');
graph.addEdge('D','H');
graph.addEdge('B','E');
graph.addEdge('B','F');
graph.addEdge('B','C');
graph.addEdge('E','I');
console.log(graph.toString());
var shortPath= graph.bfs(myVertices[0]);
console.log(shortPath);
var fromVertex=myVertices[0];
for(var i=1;i<myVertices.length;i++){
    var toVertex=myVertices[i];
    var path=new Stack();
    for(var v=toVertex;v!==fromVertex;v=shortPath.predecessors[v]){
        path.push(v);
    }
    path.push(fromVertex);
    var s=path.pop();
    while(!path.isEmpty()){
        s+='-'+path.pop();
    }
    console.log(s);
}