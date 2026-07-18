import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LogOffController::__invoke
 * @see app/Http/Controllers/LogOffController.php:10
 * @route '/log-off'
 */
const LogOffController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: LogOffController.url(options),
    method: 'post',
})

LogOffController.definition = {
    methods: ["post"],
    url: '/log-off',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\LogOffController::__invoke
 * @see app/Http/Controllers/LogOffController.php:10
 * @route '/log-off'
 */
LogOffController.url = (options?: RouteQueryOptions) => {
    return LogOffController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LogOffController::__invoke
 * @see app/Http/Controllers/LogOffController.php:10
 * @route '/log-off'
 */
LogOffController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: LogOffController.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\LogOffController::__invoke
 * @see app/Http/Controllers/LogOffController.php:10
 * @route '/log-off'
 */
    const LogOffControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: LogOffController.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\LogOffController::__invoke
 * @see app/Http/Controllers/LogOffController.php:10
 * @route '/log-off'
 */
        LogOffControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: LogOffController.url(options),
            method: 'post',
        })
    
    LogOffController.form = LogOffControllerForm
export default LogOffController