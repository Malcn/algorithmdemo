function Graph(){
    var vertices=[];
    var adjList=new Dictionary();
    this.addVertex=function(v){
        vertices.push(v);
        adjList.set(v,[]);
    }
    this.addEdge=function(v,w){
        adjList.get(v).push(w);
        adjList.get(w).push(v);
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
    var time=0;
    this.dfs=function(){
        var color=initializeColor();
        var d=[],f=[],p=[];
        time=0;

        vertices.forEach(x=>{
          f[x]=0;
          d[x]=0;
          p[x]=null;
        })

        vertices.forEach(it=>{
            if(color[it]==='white'){
                dfsVisit(it,color,d,f,p);
            }

        })

        return {
            discovery:d,
            finished:f,
            predecessors:p,
        }
      

    }
    var dfsVisit=function(u,color,d,f,p){
        console.log('discovered'+u);
        color[u]='gray';
        d[u]=++time;
        var neighbors=adjList.get(u);
        neighbors.forEach(w=>{
            if(color[w]==='white'){
                p[w]=u;
                dfsVisit(w,color,d,f,p)
            }
        })
        color[u]='black';
        f[u]=++time;
        console.log('explored'+u);
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
graph.addEdge('D','G');
graph.addEdge('D','H');
graph.addEdge('B','E');
graph.addEdge('B','F');
graph.addEdge('E','I');
console.log(graph.toString());
var shortPath= graph.dfs();
console.log(shortPath);