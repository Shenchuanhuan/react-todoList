###react-todoList
-------------------

>最近在学习react，所以做了一个todoMVC小deomo用于熟悉react 。样式参照了vue的todoMVC为原型。

#####主要生产环境
	html5 / css3 / javascript / es6 / react / webpack /babel

#####文件目录
	|-build           //编译出口地址
		|-src
			-style.css
			-todoList.js
		|-index.html
	|-node_modules    //项目依赖模块
	|-src             //项目入口地址
		|-comm
			 -Footer.js
			 -Header.js
			 -Main.js
		|-css
			-base.css
			-index.css
		|-todoList.js	
	|-index.html
	|-package.json
	|-webpack.config.js
	|-README.md

#####使用方法
	- 仅使用todoList 
		- 下载build文件夹，在浏览器运行index.html即可。
    - 开发
	    - `git clone https://github.com/Shenchuanhuan/react-todoList.git` 
		- 编辑入口文件即可，可在根目录用命令行运行`npm run run`以实时编译。

#####React特点
-	可组件化开发
-	易于维护
-	可复用
-	仅对数据进行操作，内置的virtual dom通过diff算法对差异部分进行渲染
-	可视作MVC的V层