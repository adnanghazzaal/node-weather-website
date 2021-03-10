const request = require('postman-request');

const foreCast = (latitude,longitude,callback)=> {
    const url = `http://api.weatherstack.com/current?access_key=1247f1b0348455c20a35a28a91e553bb&query=${latitude},${longitude}`;
    request(({url,json:true}),(error,{body}) => {
        if(error){
            callback('Connection not extablished',undefined)
        }else if(body.error){
            callback('Data not avaliable',undefined)
        }else{
            callback(undefined,`Weather in ${body.location.name} is ${body.current.temperature} celcius`)
        }
    })
}

// foreCast(31.508,74.259,(er ror,data)=> {
//     console.log(error);
//     console.log(data)
// })

module.exports = foreCast;