var Dict=function(){var t=arguments;this.valueIndex={},this.aliasIndex={},this.textIndex={},this.index={};for(var e=0;e<arguments.length;e++){var i=t[e];null==i.value&&(i.value=e),this.index[i.value]=e,this.addElement(i)}};Dict.prototype.addElement=function(t){if(this.hasOwnProperty(t.value))throw new Error("Already defined an element with value"+t.value+" in this dict type");if(this.hasOwnProperty(t.alias))throw new Error('Already defined an element with alias "'+t.alias+'" in this dict type');this[t.value]=t.alias,this[t.alias]=t.value,this.valueIndex[t.value]=t,this.aliasIndex[t.alias]=t,this.textIndex[t.text]=t},Dict.prototype.fromValue=function(t){return this.valueIndex[t]},Dict.prototype.fromAlias=function(t){return this.aliasIndex[t]},Dict.prototype.fromText=function(t){return this.textIndex[t]},Dict.prototype.getTextFromValue=function(t){return this.fromValue(t).text},Dict.prototype.getTextFromAlias=function(t){return this.fromAlias(t).text},Dict.prototype.getValueFromAlias=function(t){return this.fromAlias(t).value},Dict.prototype.getValueFromText=function(t){return this.fromText(t).value},Dict.prototype.getAliasFromValue=function(t){return this.fromValue(t).alias},Dict.prototype.getAliasFromText=function(t){return this.fromText(t).alias},Dict.prototype.toArray=function(){var t=arguments,e=this,i=[];if(arguments.length>0)for(var r=0;r<arguments.length;r++){var a=t[r];"string"==typeof a?i.push(this.fromAlias(a)):i.push(a)}else{for(var n in this.valueIndex)this.valueIndex[n]&&i.push(this.valueIndex[n]);i.sort(function(t,i){return e.index[t.value]>e.index[i.value]?1:-1})}return i},Dict.prototype.toSelectionObject=function(){return this.toArray().reduce(function(t,e){return t[e.value]=e.text,t},{})},Dict.prototype.toCheckboxArray=function(t){var e=[];return t&&(e=[{text:"全部",value:-1}]),(e=e.concat(this.toArray())).map(function(t){return{label:t.text,value:t.value,key:t.alias}})};export default Dict;
