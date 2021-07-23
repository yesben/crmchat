let path = require('path');  
let vars = path.resolve(__dirname, 'static/globalLess/index.less')  
console.log(vars);
module.exports = {  
    css: {  
        loaderOptions: {  
            less: {  
                globalVars: {  
                    "hack": `true; @import "${vars}"`  
                }  
            }  
        }  
    }  
}