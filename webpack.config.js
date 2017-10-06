const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin"); 

module.exports = {
	devtool: 'source-map',
  	entry: {
  		index:  __dirname + "/apps/js/index.js",
      vendor: ['jquery']
  	},//已多次提及的唯一入口文件
  	output: {
    	path: __dirname + "/builds//",//打包后的文件存放的地方
    	filename: "js/[name].js"//打包后输出文件的文件名
  	},
  	devServer: {
  		port: 80,
  		contentBase: "./builds/view/",
		  inline: true,
  	},
  	module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "es2015", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                    //     options: {
                    //         modules: true,
                    //         localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    // // getLocalIdent: (context, localIdentName, localName, options) => {
                    // //             return localName
                    // //         }
                    //     }
                    }],
                })
            }
        ]
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    plugins: [
    	new extractTextPlugin('css/[name].css'),
    	new HtmlWebpackPlugin({
    	 	filename: __dirname + "/builds/view/index.html",
            template: __dirname + "/apps/view/index.html",//new 一个这个插件的实例，并传入相关的参数,
            chunks: ["manifest","vendor","index"],
            hash: true
        }),
      new webpack.optimize.CommonsChunkPlugin({
           names: ['vendor']
      }),
      new webpack.ProvidePlugin({
          $: "jquery"
      })
    ]
}
