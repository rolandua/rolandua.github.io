var E = new Array();

function checknode(tag,n){
	if (typeof(n.tagName)=="undefined")
		return;
	switch(tag.charAt(0)) {
		case '.':
			return (n.className==tag.slice(1));
		case '#':
			return (n.id==tag.slice(1));
		default:
			if (tag.indexOf(".")>=0)
				return ((n.tagName.toLowerCase()==tag.split(".")[0]) && (n.className==tag.split(".")[1]));
			else if (tag.indexOf("#")>=0)
				return ((n.tagName.toLowerCase()==tag.split("#")[0]) && (n.id==tag.split("#")[1]));
			else
				return (n.tagName.toLowerCase()==tag);
	}
	return false;
}
function findelement(tags,nodes) {
	var i;
	var elements = new Array();
	nodes = (typeof(nodes)=="undefined"?document.childNodes:nodes.childNodes);
	for (i = 0; i < nodes.length; i++){
		if (checknode(tags[0],nodes[i]))
			if(tags.length>1)
				findelement(tags.slice(1),nodes[i]);
			else{
				E.push(nodes[i]);
				//console.log(nodes[i].tagName);
			}
		else
			findelement(tags,nodes[i]);
	}
}
function getBySelector(selectors){
	E = [];
	selectors = selectors.split(" ");
	findelement(selectors);
	return (E.length>=1 ? E : false);
}