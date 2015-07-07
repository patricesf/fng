module.exports = {
    entry: "./src/app.jsx",
    output: {
        path: __dirname,
        filename: "fng.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
             {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /\.jsx$/,
                loader: 'babel?loose=all'
            },
             {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /\.js/,
                loader: 'babel?loose=all'
            },

            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
        ]
    }
    ,
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React',
        'jquery': 'jQuery'
    },
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.jsx', '.js']
  }
};