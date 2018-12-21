function ArrayList(){
    var array=[3,5,1,6,4,7,2];
    this.insert=function(item){
        array.push(item);
    }
    this.toString=function(){
        return array.join();
    }
    var swap=function(left,right){
        var temp=array[left];
        array[left]=array[right];
        array[right]=temp;
    }
    this.bubbleSort=function(){
        var length=array.length;
        for(var i=0;i<length;i++){
            for(var j=0;j<length-1-i;j++){
                if(array[j]>array[j+1]){
                    swap(j,j+1);
                }
            }
        }
    }
    this.selectionSort=function(){
        var length=array.length;
        var indexMin=undefined;
        for(var i=0;i<length;i++){
            indexMin=i;
            for(var j=i+1;j<length;j++){
                if(array[indexMin]>array[j]){
                    indexMin=j;
                }
            }
            if(i!==indexMin){
                swap(i,indexMin);
            }
        }
    }
    this.insertionSort=function(){
        var length=array.length,j,temp;
        for(var i=1;i<length;i++){
            j=i;
            temp=array[i];
            while(j>0&&array[j-1]>temp){
                array[j]=array[j-1];
                j--;
            }
            array[j]=temp;
        }
    }
    this.mergeSort=function(){
        array=mergeSortRec(array);
    }
    var mergeSortRec=function(array){
        var length=array.length;
        if(length===1)
        {
            return array;
        }
        var mid=Math.floor(array.length/2),
        left=array.slice(0,mid),
        right=array.slice(mid,length);
        return merge(mergeSortRec(left),mergeSortRec(right));

    }
    var merge=function(left,right){
        var result=[],il=0,ir=0;
        while(il<left.length&&ir<right.length){
            if(left[il]<right[ir]){
                result.push(left[il++]);
            }else{
                result.push(right[ir++]);
            }
        }
        while(il<left.length){
            result.push(left[il++]);
        }
        while(ir<right.length){
            result.push(right[ir++]);
        }
        return result;
    }
    this.quickSort=function(){
        quick(array,0,array.length-1);
    }
    var quick=function(array,left,right){
        var mid;
        if(left<right){
            mid=partition(array,left,right);
            quick(array,left,mid-1);
            quick(array,mid+1,right);
        }
    }
    var getMid=function(array,left,right){
        var index=Math.floor((left+right)/2);
        if(array[left]<=array[right]){
            if(array[index]<array[left]){
                return left;
            }else if(array[index]>array[right]){
                return right;
            }else{
                return index;
            }
        }else{
            if(array[index]<array[right]){
                return right;
            }else if(array[index]>array[left]){
                return left;
            }else{
                return index;
            }
        }
    }
    var partition=function(array,left,right){
        var mid= getMid(array,left,right); //三数取中
        swapQuickStort(array,mid,left);
        var i=left,j=right,pivot=array[left];
        while(i<j){
            while(i<j && array[j]>=pivot){
                j--;
            }
            while(i<j && array[i]<=pivot){
                i++
            }
            if(i<j){
                swapQuickStort(array,i,j);
            }
        }
        swapQuickStort(array,i,left);
        return i;
    }
    var swapQuickStort=function(array,left,right){
        var temp=array[left];
        array[left]=array[right];
        array[right]=temp;
    }
}

function createNonSortedArray(size){
    var array=new ArrayList();
    // var i=size;
    // while(i>0){
    //     array.insert(i);
    //     i--;
    // }
    return array;
}

var array=createNonSortedArray(5);
console.log(array.toString());
array.quickSort();
console.log(array.toString());