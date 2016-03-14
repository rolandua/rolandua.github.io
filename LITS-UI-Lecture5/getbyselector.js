var E = new Array();

function checknode(tag,n){
	if (typeof(n.tagName)=="undefined")
		return;
	switch(tag.charAt(0)) {
		case '.':
				var tags = tag.slice(1).split(".");
				
				for (i = 0; i < tags.length; i++)
					if(!n.classList.contains(tags[i]))
						return false;
				return true;
		case '#':
			return (n.id==tag.slice(1));
		default:
			if (tag.indexOf(".")>=0){
				var tags = tag.split(".");

				if (tags[0]!=n.tagName.toLowerCase())
					return false;
				for (i = 1; i < tags.length; i++)
					if(!n.classList.contains(tags[i]))
						return false;
				return true;
			}
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