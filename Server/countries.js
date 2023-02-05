const con = require('./connectdb.js');
const axios = require('axios');
const getDataUsingAsyncAwaitGetCall = async () => {
	try {
	    const response = await axios.get('https://restcountries.com/v2/all');
        for(var i = 0; i < response.data.length; i++){
            let cName = response.data[i].name;
            let cCode = response.data[i].alpha3Code;
            let callingCode = response.data[i].callingCodes;
            // console.log(cName, cCode, callingCode);
            let sql = 'UPDATE country SET calling_code = (?) WHERE country_id = (?)'
            con.connection.query(sql, [callingCode, i+1], function(error,rows,fields){
                if(error){
                    console.log(error);
                }else{
                    console.log(rows);
                };
            });
        }
	} catch (error) {
	  // handle error
	  alert(error.message);
	}
  };

  exports.getDataUsingAsyncAwaitGetCall = getDataUsingAsyncAwaitGetCall;