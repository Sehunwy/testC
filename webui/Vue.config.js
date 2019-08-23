module.exports = {
    lintOnSave: true, //是否禁用eslint
    productionSourceMap: false,
    assetsDir: 'static',
    // assetsSubDirectory: 'static'
    pages: {
        index: {
            // page 的入口
            entry: 'src/MobileApp/appMain.ts',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '光华CRM',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            //  chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        admin: {
            // page 的入口
            entry: 'src/main.ts',
            // 模板来源
            template: 'public/admin.html',
            // 在 dist/index.html 的输出
            filename: 'admin.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '光华CRM后台管理系统',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            //  chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },
    devServer: {
        index: 'index.html', //默认启动serve 打开index页面
        open: true,
        host: getIPAdress(),
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => {}
    }
}

function getIPAdress() {
    // var interfaces = require('os').networkInterfaces();
    // for (var devName in interfaces) {
    //     var iface = interfaces[devName];
    //     for (var i = 0; i < iface.length; i++) {
    //         var alias = iface[i];
    //         if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
    //             console.log(alias.address)
    //             return alias.address;
    //         }
    //     }
    // }

    // return "192.168.9.221";
    return "192.168.2.73";
    // return "192.168.11.129";
    // return "192.168.7.245";
    // return "192.168.2.56";
}