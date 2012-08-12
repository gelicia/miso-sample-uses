//This works for datasets too <3
Miso.DataView.prototype.printDVAsList = function() {
	var outStr;

	if (this.length > 0) {
		outStr = "<ul>";
		var colNames = this.columnNames();
		this.each(
	    	function (row){
	    		outStr = outStr + "<li>";
	    		for (var i = 0; i < colNames.length; i++) {
	    			outStr = outStr + " <b>" + colNames[i] + "</b> - " + row[colNames[i]];
	    		};
	    		outStr = outStr + "</li>";
	    	}
	    );
		outStr = outStr + "</ul>";
	}
	return outStr;
};
