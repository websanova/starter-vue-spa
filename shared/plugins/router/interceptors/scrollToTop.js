function _top(transition, key) {
    let routes = transition.matched.filter(function (route) {
        return route.meta[key]
    })

    if (routes.length) {
        return routes[routes.length - 1].meta[key]
    }
}

export function afterEach (to, from) {
    let frTab = _top(from, 'top')
    let toTab = _top(to, 'top')

    if (
        (from && !(frTab || toTab) && from.path !== to.path) ||
        ((frTab || toTab) && frTab !== toTab)
    ) {
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }
}