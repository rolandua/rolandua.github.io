var tree = {
	left:{
		left:1,
		right:{
			left:5,
			right:6
		}
	}
	right:{
		left:7,
		right:{
			left:{
				left:8,
				right:9
			},
			right:10
		}
	}
}

function calctree(tree){
	return evalutePart(tree.left) + evalutePart(tree.right);

	function evalutePart(part){
		if (type of part == "object"){
			return calctree(part);
		} else{
			return part;
		}
	} 
}