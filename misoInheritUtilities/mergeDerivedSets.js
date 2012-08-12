

Miso.Dataset.prototype.doesExistGBVal = function(grpByCol, grpByVal) {
    var returnVal = false;
    this.each(

    function(row) {
        if (row[grpByCol] == grpByVal) {
            returnVal = true;
        }
    });
    return returnVal;
};

Array.prototype.mergeDerivedSets = function() {
    var returnedSet = new Miso.Dataset();

    //add groupBy column
    var groupByCol = this[0]._columns[2];
    var groupByStr = groupByCol.name;
    returnedSet.addColumn(groupByCol);

    //go through the datasets passed in
    for (var i = 0; i < this.length; i++) {
        //add the column with the aggregation 
        var newAggCol = this[i]._columns[3];
        var newAggColName = newAggCol.name;
        returnedSet.addColumn(newAggCol);

        //for each row in the dataset
        this[i].each(

        function(row) {
            if (returnedSet.length === 0) {
                returnedSet.add(row);
            }
            else {
                var existsGroupByValue = returnedSet.doesExistGBVal(groupByStr, row[groupByStr]);
                if (!existsGroupByValue) {
                    returnedSet.add(row);
                }
                else {
                    var updateArr = {};
                    updateArr[newAggColName] = row[newAggColName];
                    returnedSet.update(

                    function(rowUp) {
                        return rowUp[newAggColName] == row[newAggColName];
                    }, updateArr);
                }
            }
        });
    }
    return returnedSet;
}