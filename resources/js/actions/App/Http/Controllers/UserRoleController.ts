import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UserRoleController::index
 * @see app/Http/Controllers/UserRoleController.php:13
 * @route '/user-roles'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/user-roles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserRoleController::index
 * @see app/Http/Controllers/UserRoleController.php:13
 * @route '/user-roles'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserRoleController::index
 * @see app/Http/Controllers/UserRoleController.php:13
 * @route '/user-roles'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserRoleController::index
 * @see app/Http/Controllers/UserRoleController.php:13
 * @route '/user-roles'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserRoleController::index
 * @see app/Http/Controllers/UserRoleController.php:13
 * @route '/user-roles'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserRoleController::index
 * @see app/Http/Controllers/UserRoleController.php:13
 * @route '/user-roles'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserRoleController::index
 * @see app/Http/Controllers/UserRoleController.php:13
 * @route '/user-roles'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\UserRoleController::store
 * @see app/Http/Controllers/UserRoleController.php:20
 * @route '/user-roles'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/user-roles',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserRoleController::store
 * @see app/Http/Controllers/UserRoleController.php:20
 * @route '/user-roles'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserRoleController::store
 * @see app/Http/Controllers/UserRoleController.php:20
 * @route '/user-roles'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UserRoleController::store
 * @see app/Http/Controllers/UserRoleController.php:20
 * @route '/user-roles'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UserRoleController::store
 * @see app/Http/Controllers/UserRoleController.php:20
 * @route '/user-roles'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const UserRoleController = { index, store }

export default UserRoleController