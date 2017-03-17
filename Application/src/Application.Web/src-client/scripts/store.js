export const STORE = {
	_data: {
    currentNavRoute: ''
	},

	getStoreData: function(){
		return this._data
	},

  setStore: function(storeProp, propLoad){
  this._data[storeProp] = propLoad
  this._callBack()
  },

  onStoreChange: function(cb){
  this._callBack = cb
  }
}
