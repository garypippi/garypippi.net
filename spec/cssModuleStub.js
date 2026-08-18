// CSS Modules は jest では解決できないので、クラス名をキーそのままで返す。
// __esModule に truthy を返すと esModuleInterop の default 解決が壊れるため、
// ここだけは false を返す
module.exports = new Proxy(
    {},
    {
        get: (_target, key) => {
            if (key === '__esModule') {
                return false
            }
            return typeof key === 'string' ? key : undefined
        },
    },
)
