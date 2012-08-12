

//Take in a dataset, split it up by column, return an array of split datasets
Miso.Dataset.prototype.splitDataSet = function(columnName){
	var returnArr = []; //Array of split datasets
	var valueArr = []; //A list of distinct values from columnName

	//Find a distinct list of values
	this.each(
	    function(row) {
	        if (!valueArr.contains(row[columnName])) {
	        	valueArr.push(row[columnName]);

	        	var whereSet = this.where({
                        rows: function(row) {
                            return row[columnName]  == valueArr[valueArr.length - 1];
                        }
                    });

				returnArr.push(whereSet);
	        }
    });

	return returnArr;
}

Array.prototype.contains = function(toFind) {
    for (var i = 0; i < this.length; i += 1) {
        if (this[i] == toFind) {
            return true;
        }
    }
    return false;
};